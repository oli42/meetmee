import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit, getValues} = useForm<FormValues>();
  const [error, setError] = useState("");
  let navigation = useNavigate();

  async function handleClick(infos: FormValues){

    let url: string = '/api/login';
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
    navigation('/cookietester');
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
          <button type="submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
