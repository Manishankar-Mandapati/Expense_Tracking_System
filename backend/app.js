const express=require('express')
const {open}=require('sqlite')
const sqlite3=require('sqlite3')
const path=require('path')
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

app.post('/register/',async (request,response)=>{
    const {email,password}=request.body
    const query=`insert into users(email,password) values('${email}','${password}');`
    await db.run(query)
    
    response.send('user crated')

})
app.get('/data/',async (request,response)=>{
    const data=await db.all(`select * from users;`)
    response.send(data)
})