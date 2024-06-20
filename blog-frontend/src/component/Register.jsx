export default function Register(){
    return (
        <>
        <div className="h-screen w-screen  flex flex-col justify-center items-center" >
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button className="w-3/4 border-2 border-black" onClick={()=>{
            alert('submitted the form')
        }}>submit</button>
        </div>
        </>
    )
}