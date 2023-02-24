import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit, getValues,  formState: { errors } } = useForm<FormValues>();
  const [error, setError] = useState("");
  let navigation = useNavigate();

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
  
  if (result.message == "A problem occurred. "){
    setError("wrong identification");
    return ;
  }
  else{
    navigation('/');
  }
}
  
  const onSubmit: SubmitHandler<FormValues> = () =>{
    const  infos = getValues()
    handleClick(infos);

  }

  return (
    <div className="container">
    <NavBar />
    <div className="login">
        <div className='formWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register("email", { required: true })} placeholder='email'/>
          <input type="password" {...register("password", { required: true })} placeholder='password'/>
            {/* {errors?.password?.type === "required" && <p>All fields are required</p>}
            {errors?.password?.type === "minLength" && (
                <p>Password cannot be less than 8 characters</p>
            )} */}
          <button type="submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
    {/* <div className="footer"></div> */}
  </div>
  )
}

export default Login
