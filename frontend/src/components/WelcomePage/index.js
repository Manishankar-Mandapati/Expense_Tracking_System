import { Component } from "react";
import './index.css'
import img from '../../assets/tanrica-financial-growth-9837687_1280.png';
import { Link } from "react-router-dom";

class Welcome extends Component{
    render(){
        return(
            <div className="welcome-bg-container">
                <img src={img} alt="img" className="welcome_image"/>
                <div className="content-container">
                    <h1 className="hed">Welcome to Expense Tracker App</h1>
                    <p className="para">Take control of your finances with precision. Track expenses, manage budgets, and optimize spending effortlessly.</p>
                    <div className="btn-container">
                        <button type="button" className="btn"><Link to='/register'>Register</Link></button>
                        <button type="button" className="btn"><Link to='/login'>Login</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Welcome