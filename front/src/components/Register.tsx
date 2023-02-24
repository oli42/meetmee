import React, { useContext, useState } from 'react'
import { Form } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
};

function Register() {

  const { register, watch, handleSubmit, getValues,  formState: { errors } } = useForm<FormValues>();
  let navigation = useNavigate();
  const [error, setError] = useState("");
    const confirm = watch('password')

  async function handleClick(infos: FormValues){

    let url: string = 'http://localhost:4000/users';
    const response = await fetch(url, { method: "POST",
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  },
    body: JSON.stringify(infos)
    })
    const result = await response.json();
    console.log(result)
    if (result.message == "This user already exists"){
      setError("This user already exists");
      return
    }
    else{
      navigation('/login');
    }
  }


  const onSubmit: SubmitHandler<FormValues> = () =>{
    const  infos = getValues()
    console.log(infos)
    handleClick(infos);

  }
    
  return (
    <div className="container">
    <NavBar />
    <div className="Register">
      <div className='formWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName", { required: true })} placeholder='firstname' />
          <input {...register("lastName", { required: true })} placeholder='lastName'/>
          <input type="email" {...register("email", { required: true })} placeholder='email'/>
          <input type="password" {...register("password", { required: true, minLength: 8 })} placeholder='password'/>
          <input type="password" {...register("cpassword", { required: true, minLength: 8})} placeholder='confirm password'/>
         
            {errors?.password?.type === "required" && <p>All fields are required</p>}
            {errors?.password?.type === "minLength" && (
                <p>Password cannot be less than 8 characters</p>
            )}
            {watch("cpassword") !== watch("password")  && 
            getValues("cpassword") ?
                <p> Password not matching yet</p>
             : null}
          
          
          <button type="submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
    <div className="footer"></div>
  </div>
  )
}

export default Register