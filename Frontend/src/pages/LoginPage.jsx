import React,{useState} from 'react'
import {toast} from 'react-hot-toast';
import { LoaderCircle,Eye, EyeOff, } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const{login,isLoggingIn}=useAuthStore();
  const [showPassword,setshowPassword]=useState(true);
  const [FormData,setFormData]=useState({
    email:"",
    password:""
  });
  const validForm=()=>{
    if(!FormData.email.trim())return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(FormData.email))return toast.error("Invalid email");
    if(!FormData.password.trim())return toast.error("Password is required");
    
    return true;
  };
  const handleSubmit=(e)=>{
    e.preventDefault();

    const success = validForm();

    if(success){
      login(FormData)
    }
  }
  return (
    		<div className=' h-screen flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-[50%] p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input 
            type='text'
            value={FormData.email}
            onChange={(e)=>setFormData({...FormData, email: e.target.value})} 
            placeholder='Enter Email' 
            className='w-full input input-bordered h-10' />
					</div>

					<div className='mb-4 relative'>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type={showPassword ?"Password":"text"}
							placeholder='Enter Password'
              value={FormData.password}
              onChange={(e)=>setFormData({...FormData, password: e.target.value})}
							className='w-full input input-bordered h-10'
						/>
            <span
            onClick={() => setshowPassword(!showPassword)}
            className="absolute top-[55%] right-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
          </span>
					</div>
          <div className='flex justify-center mb-2'>
           <Link to="/singup"><h1 className='text-primary self-center hover:text-blue-500'>Don't have an account? SingUp</h1></Link>
          </div>
					
					<div className='flex justify-center items-center'>
						<button 
            className='btn btn-primary w-[40%] btn-sm mt-2'
            type='submit'
            disabled={isLoggingIn}
            >{
              isLoggingIn ? (
                <>
                  <LoaderCircle className='h-5 w-5 animate-spin'/>
                </>
              ):("login")
            }</button>
					</div>
				</form>
			</div>
      </div>

  )
}

export default LoginPage
