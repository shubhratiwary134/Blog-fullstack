export default function Login(){
    return (
        <>
        <div >
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button className="w-full" onClick={()=>{
            alert('submitted the form')
        }}>submit</button>
        </div>
        </>
    )
}