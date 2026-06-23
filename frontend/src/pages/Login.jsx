import { useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";

import Button from "../components/ui/Button";

import Input from "../components/ui/Input";

import { loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Login() {

const navigate = useNavigate();

const { login } = useAuth();

const [loading,setLoading]=
useState(false);

const [form,setForm]=
useState({

email:"",
password:"",

});

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value,

});

};

const handleSubmit=
async(e)=>{

e.preventDefault();

if(!form.email){

return toast.error(
"Email required"
);

}

if(!form.password){

return toast.error(
"Password required"
);

}

try{

setLoading(true);

const res=
await loginUser(form);

login(

res.data.user,

res.data.token

);

toast.success(
"Welcome Back!"
);

navigate("/");

}
catch(error){

toast.error(

error.response?.data?.message ||

"Login Failed"

);

}
finally{

setLoading(false);

}

};

return(

<AuthLayout

title="Welcome Back"

subtitle="Login to continue"

footerText="Don't have an account?"

footerLink="/register"

footerLinkText="Register"

>

<form
onSubmit={handleSubmit}
>

<Input

label="Email"

type="email"

name="email"

value={form.email}

onChange={handleChange}

/>

<Input

label="Password"

type="password"

name="password"

value={form.password}

onChange={handleChange}

/>

<Button

type="submit"

loading={loading}

>

Login

</Button>

</form>

</AuthLayout>

);

}

export default Login;