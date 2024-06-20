import { useState } from "react"
export default function Register(){
    async function getUsername(e) {
        e.preventDefault()
       await  fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({nameInput,passInput}),
            headers:{'Content-Type':'application/json'},
        })
        
    }
    
    const [nameInput,setNameInput]=useState('')
    const [passInput,setPassInput]=useState('')
    return (
        <>
        <div className="w-screen h-screen flex flex-col justify-center  gap-4 items-center " >
            <p className="text-5xl">register</p>
            <div className="flex flex-col gap-4">
            <input type="text" placeholder="username" className=" border-2 border-black focus:outline-none px-10 py-2"
            value={nameInput}
            onChange={(e)=>setNameInput(e.target.value)}
            ></input>
        <input type="text" placeholder="password" className=" border-2 border-black focus:outline-none px-10 py-2"
          value={passInput}
          onChange={(e)=>setPassInput(e.target.value)}
        ></input>
        <button className="px-10 border-2 border-black" onClick={getUsername}>submit</button>
            </div>
      
        </div>
        </>
    )
}