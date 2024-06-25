import { useNavigate } from "react-router-dom"
import  useStore  from "../storage/store"
import { useEffect } from "react"
import { CgProfile } from "react-icons/cg";
export default function Navbar(){
    const {isLoggedIn,setIsLoggedIn}=useStore()
    const {setUserName}=useStore()
    const {username}=useStore()
    useEffect(  ()=>{
      const checkToken= async ()=>{

        const response=await fetch('http://localhost:4000/protected',{
            method:'GET',
            credentials:'include',
        })
        
        if(response.status===200){
            setIsLoggedIn(true)
            const data = await response.json()
            setUserName(data.user.username) // we save the response in the data and use the username, and set it in the global state.
        }else{
            setIsLoggedIn(false)
        }

       }
       checkToken()
    },[setIsLoggedIn,setUserName])
   
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
    function handleCreateRoute(){
        navigate('/create')
    }
    function handleMyPost(){ 
        navigate(`/myPost/${username}`)
        }
    
    return (
        <div className='flex justify-between p-4'>
            <div className="p-2" >Blogo </div>
            {isLoggedIn ? 
            <div className="flex w-1/2 justify-end gap-5 p-2">
                 
            <div> 
                <button onClick={handleCreateRoute}>Create a Post</button>
                 </div>
                 <div>
                    <button onClick={handleMyPost}>My posts</button>
                 </div>
                
            <div>
                <button onClick={logout} >Logout</button>
            </div>
            <div className="flex flex-col ">
                    <div>
                    <CgProfile size={32}/>
                    </div>
               <div>
               <p className="text-black">{username}</p>
         
               </div>
               
                  
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