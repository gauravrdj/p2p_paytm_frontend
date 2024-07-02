import { useState } from "react"
import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import {toast} from 'sonner'
import TypewriterSpinner from "../components/Loader"



export const Signup = () => {
  const navigate=useNavigate();
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [password, setPassword] = useState("");
      const [username, setUsername] = useState("");
      const [loading, setLoading] = useState("");
if(loading){
  return (
    <TypewriterSpinner></TypewriterSpinner>
  )
}
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
           setFirstName(e.target.value);
        }} placeholder="Gaurav" label={"First Name"} /> 
        <InputBox onChange={e => {
           setLastName(e.target.value);
        }} placeholder="Sharma" label={"Last Name"} />
        <InputBox onChange={e => {
           setUsername(e.target.value);
        }} placeholder="Gaurav@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
           setPassword(e.target.value);
        }} placeholder="must contain atlest 8 letters" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            
            try{
              setLoading(true);
          const response= await  axios.post("https://p2p-paytm.onrender.com/api/v1/user/signup", {
               username,
               password,
               firstName,
               lastName,
            });
            //the response will contain a token , which we will store in local storage for the further use
            localStorage.setItem("token", response.data.token);
            //change
            localStorage.setItem("firstName", response.data.firstName);
            localStorage.setItem("username", response.data.username);
            //  alert(response.data.msg);
            setLoading(false);
             toast.success(`${response.data.msg}`)
            Swal.fire({
              title: "SignUp",
              text : `${response.data.msg}`,
              icon : 'success'
            })
             navigate('/dashboard');
          }
          catch(e){
            // alert(e.response.data.msg);
            setLoading(false)
            toast.info(`${e.response.data.msg}`)
            Swal.fire({
              title: "SignUp",
              text : `${e.response.data.msg}`,
              icon : 'error'
            })
            if(e.response.data.msg.includes('exist')){
              navigate('/signin');
            }
            
          }
            //when user log out we can remove token from localStorage using localStorage.removeItem("token");
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}