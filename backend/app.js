const express=require('express')
const {open}=require('sqlite')
const sqlite3=require('sqlite3')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const app=express()
app.use(express.json())

const dbpath=path.join(__dirname,'expenses.db')
let db=null
const initialize= async()=>{
    try{
        db= await open({filename:dbpath,driver:sqlite3.Database})
        app.listen(3000,()=>{
            console.log("server running at 3000")
        })
    }
    catch(e){
        console.log(`Database Error ${e.message}`)
    }
}
initialize()


const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "USER_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.userId = payload.userId,
        request.email=payload.email;
        next();
      }
    });
  }
};


app.post('/register/',async (request,response)=>{
    const {email,password}=request.body
    const selectUserQuery=`select * from users where email=?;`
    const userData= await db.get(selectUserQuery,email)
    if(userData===undefined){
        const hashPassword = await bcrypt.hash(password,12)
        const query=`insert into users(email,password) values(?,?);`
        const values=[email,hashPassword]
        await db.run(query,values)
        response.send('User Registered Successfully')
    }
    else{
        response.status(400)
        response.send('User Already Exists')
    }
})


app.post('/login/',async (request,response)=>{
    const {email,password}=request.body
    const selectUserQuery=`select * from users where email=?;`
    const userData=await db.get(selectUserQuery,email)
    if(userData===undefined){
        response.status(400)
        response.send('Invalid User')
    }else{
        const isPasswordMatched=await bcrypt.compare(password,userData.password)
        if(isPasswordMatched===true){
            const payload={
                userId:userData.id,
                email:userData.email
            }
            const jwtToken= jwt.sign(payload,"USER_SECRET_TOKEN")
            response.send(jwtToken)
        }
        else{
            response.status(400)
            response.send('Invalid Password')
        }
    }

})


app.post('/transaction/',authenticateToken,async (request,response)=>{
    const {userId}=request
    const {title,amount,category,date,notes}=request.body
    const values=[userId,title,amount,category,date,notes]
    const insertQuery=`insert into transactions(userId,title,amount,category,date,notes) 
    values(?,?,?,?,?,?);`
    await db.run(insertQuery,values)
    response.send('Transaction Added Successfully')
})


app.get('/transaction/',authenticateToken,async (request,response)=>{
    const {userId}=request
    const allTransactionsQuery=`select * from transactions where userId=?;`
    const transactions= await db.all(allTransactionsQuery,userId)
    response.send(transactions)
})

app.put('/transaction/:transactionId',authenticateToken,async (request,response)=>{
    const {transactionId}=request.params
    const {title,amount,category,date,notes}=request.body


    const values = [title, amount, category, date, notes,transactionId];
    const updateQuery = `UPDATE transactions SET 
    title= COALESCE(?, title),amount= COALESCE(?, amount),category= COALESCE(?, category),
    date= COALESCE(?, date),notes= COALESCE(?, notes) WHERE id = ?;`
    
    await db.run(updateQuery, values)
    response.send('updated successfully')

})


app.delete('/transaction/:transactionId',authenticateToken,async (request,response)=>{
    const {transactionId}=request.params
    const delteQuery=`delete from transactions where id=?;`
    await db.run(delteQuery,transactionId)
    response.send('User Deleted Successfully')
})

app.get('/transaction/amount',authenticateToken,async (request,response)=>{
    const {userId}=request
    const fetchAmountQuery=`select sum(amount) as totalExpense,category from 
    transactions where userId=? group by category;`
    const amountAndCategory=await db.all(fetchAmountQuery,userId)
    response.send(amountAndCategory)
})

app.delete('/user/:userId',async (request,response)=>{
    const {userId}=request.params
    const delteQuery=`delete from users where id=?;`
    await db.run(delteQuery,userId)
    response.send('Transaction Deleted Successfully')
})


app.get('/data/',authenticateToken,async (request,response)=>{
    const data=await db.all(`select * from users;`)
    response.send(data)
})