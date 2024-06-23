
const Createpost = () => {
  return (
    <>
    <form className="w-screen h-screen flex justify-center ">
        <div className="h-screen gap-2 flex flex-col ">
        <input className="" type='title' placeholder="enter title "></input>
        <input type='summary' placeholder="enter summary"></input>
        <input type='file'></input>
        <button >Post</button>
        </div>
     
    </form>
    </>
  )
}

export default Createpost