import { useState } from 'react'
const Createpost = () => {
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('')
  const [content,setContent]=useState('')

  async function handlePosting(){
    const response = await fetch('http://localhost:4000/createPost',{
      method:'POST',
      credentials:'include',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title,summary,content}),  
    })
    if(response.status===201){
      alert('post created')
    }
    else{
      alert('error creating the post')
    }
    setTitle('')
    setContent('')
    setSummary('')
  }
  
  return (
    <>
    <form className="w-screen h-screen flex justify-center ">
        <div className="w-1/2 h-screen gap-5 flex flex-col justify-center ">
        <input className="border-2 border-black p-4" type='title' placeholder=" Title " value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <input type='summary' placeholder=" Summary" className='border-2 border-black p-4' value={summary} onChange={(e)=>setSummary(e.target.value)}></input>
        <textarea type='text' placeholder='Content' className='border-2 border-black p-4' rows={10} value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        {/* <input type='file'></input> */}
        <button className='border-2 border-black p-4 w-1/3' onClick={handlePosting} >Post</button>
        </div>
     
    </form>
    </>
  )
}

export default Createpost