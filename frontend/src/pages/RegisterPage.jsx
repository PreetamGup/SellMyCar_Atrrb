import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {

    const navigate= useNavigate()

  async  function handleSubmit (e){
        e.preventDefault()
        
        try {
            const obj={
                name:e.target.name.value,
                email:e.target.email.value,
                password: e.target.password.value
            }
    
            const resposnse= await axios.post("https://sellmycar-atrryb.onrender.com/api/user/register", {...obj})
            
            if(resposnse.data.success){
                window.alert(resposnse.data.message)
                navigate("/login")
            }
            else{
                window.alert(resposnse.data.message)
            }
        } catch (error) {
            console.log(error)
        }

        // console.log(e.target.email.value, e.target.password.value, e.target.name.value)
    }


  return (
    <div className='formContainer'>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h2>Register Form</h2>
                <input type="text" name='name' placeholder='Name' />
                <input type="email" name='email' placeholder='Email' />
                <input type="password" name='password' placeholder='Password'/>
                <button>Register</button>
                
                <p>Already Register! <Link to={"/login"}>Login here</Link></p>

            </form>
        </div>
    </div>
  )
}

export default RegisterPage
