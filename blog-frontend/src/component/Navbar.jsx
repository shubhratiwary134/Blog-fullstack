import { useNavigate } from "react-router-dom"
import  useStore  from "../storage/store"
import { useEffect } from "react"
export default function Navbar(){
    const {isLoggedIn,setIsLoggedIn}=useStore()
    useEffect(  ()=>{
      const checkToken= async ()=>{

        const response=await fetch('http://localhost:4000/protected',{
            method:'GET',
            credentials:'include',
        })
        
        if(response.status===200){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }

       }
       checkToken()
    },[])
   
    const navigate = useNavigate()

   async function logout(){
    const response = await fetch('http://localhost:4000/logout',{
        method:'POST',
        credentials:'include'
    })    
    if(response.status===200){
        setIsLoggedIn(false)
    }
    }
    return (
        <div className='flex justify-between p-4'>
            <div className="p-2" >Blogo </div>
            {isLoggedIn ? 
            <div className="flex w-1/2 justify-end gap-2 p-2">
            <div> 
                <button >Create a Post</button>
                 </div>
            <div>
                <button onClick={logout} >Logout</button>
            </div>
            </div>
            :
            <div className="flex w-1/2 justify-end gap-2 p-2">
            <div> 
                <button onClick={()=>{
                    navigate('/login')
                }}>Login</button>
                 </div>
            <div>
                <button onClick={()=>{
                    navigate('/register')
                }}>Register</button>
            </div>
            </div>
            }
        </div>
    )
}