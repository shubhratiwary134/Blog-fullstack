import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate=useNavigate()
    async function LoginUserFunction(e) {
        e.preventDefault()
         const response = await  fetch('http://localhost:4000/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({nameInput,passInput}),  
                credentials:'include',
            })
            if(response.status===200){
               navigate('/')
            }
             else if(response.status===400){
            alert('wrong input')
           }
    }
    const [nameInput,setNameInput]=useState('')
    const [passInput,setPassInput]=useState('')
    return (
        <>
        <div className="w-screen h-screen flex flex-col justify-center  gap-4 items-center " >
            <p className="text-5xl">Login</p>
            <div className="flex flex-col gap-4">
            <input type="text" placeholder="username" className=" border-2 border-black focus:outline-none px-10 py-2"
            value={nameInput}
            onChange={(e)=>setNameInput(e.target.value)}
            ></input>
        <input type="text" placeholder="password" className=" border-2 border-black focus:outline-none px-10 py-2"
          value={passInput}
          onChange={(e)=>setPassInput(e.target.value)}
        ></input>
        <button className="px-10 border-2 border-black" onClick={LoginUserFunction}>submit</button>
            </div>
      
        </div>
        </>
    )
}