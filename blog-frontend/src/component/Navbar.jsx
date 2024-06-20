import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()
    return (
        <div className='flex justify-between p-4'>
            <div className="p-2" >Blogo </div>
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
        </div>
    )
}