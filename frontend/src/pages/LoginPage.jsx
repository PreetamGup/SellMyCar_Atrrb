import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const LoginPage = () => {

  const navigate= useNavigate()

async function handleSubmit (e){
    e.preventDefault()

   try {
    const obj={
      email: e.target.email.value,
      password: e.target.password.value
    }  

    
    const response= await axios.post("http://localhost:5050/api/user/login", {...obj})

    if(response.data.success){
      localStorage.setItem("token", response.data.token)
      navigate("/")
    }
    else{
      window.alert(response.data.message)
    }
   } catch (error) {
      console.log(error)
   }


}

  return (
    <div className='formContainer'>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" name='email' placeholder='Email' />
                <input type="password" name='password' placeholder='Password' />
                <button>Login</button>
        
                <p> Register <Link to={"/register"}> here</Link></p>

            </form>
        </div>
    </div>
  )
}

export default LoginPage