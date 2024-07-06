import { useState } from 'react'
import { useNavigate } from "react-router-dom"
const Createpost = () => {
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('')
  const [content,setContent]=useState('')
  const navigate=useNavigate()
  

  async function handlePosting(e){
    e.preventDefault() // prevent the default action of form submission, if this does not exists the page will reload on submit and therefore causing the below code to not run
    const response = await fetch('http://localhost:4000/createPost',{
      method:'POST',
      credentials:'include',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title,summary,content}),  
    })
    if(response.status===201){
      setTitle('')
      setSummary('')
      setContent('')
      navigate('/')
    }
    else{
      alert('error creating the post')
    }
   
  }
  
  return (
    <>
    <form className="w-screen h-screen flex justify-center " onSubmit={handlePosting}>
        <div className="w-1/2 h-screen gap-5 flex flex-col justify-center ">
        <input className="border-2 border-black p-4" type='title' placeholder=" Title " value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <input type='summary' placeholder=" Summary" className='border-2 border-black p-4' value={summary} onChange={(e)=>setSummary(e.target.value)}></input>
        <textarea type='text' placeholder='Content' className='border-2 border-black p-4' rows={10} value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        {/* <input type='file'></input> */}
        <button className='border-2 border-black p-4 w-1/3' type='submit' >Post</button>
        </div>
     
    </form>
    </>
  )
}

export default Createpost