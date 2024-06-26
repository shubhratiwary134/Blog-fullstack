import { useEffect, useState } from "react"
import useStore from "../storage/store"


const Main = () => {
    const {isLoggedIn,username} = useStore()
    const [blogs,setBlogs]=useState([]) 
    useEffect(()=>{
        async function displayBlogs(){
            const response = await  fetch('http://localhost:4000/blogs',{
                method:'GET',
                credentials:'include',
            })
            if(response.status===200){
                const data = await response.json()
                    setBlogs(data)   
            }
        }
        displayBlogs()
    },[setBlogs,blogs])
    async function handleDelete(postId){
        const response = await fetch(`http://localhost:4000/deletePost/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
          })
          if (response.ok) {
            setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== postId))
          }else{
            console.error('failed to delete post')
          }
    }
  return (
    <div className="w-full  flex flex-col items-center gap-10 mt-12 mb-5 ">
        {blogs.map((blog)=>{
            return(
                <div key={blog._id} className="w-1/2 border-b-2 border-black p-5 flex flex-col gap-5 shadow-xl rounded-lg hover:scale-105 hover:shadow-2xl duration-300 bg-white">
                    <h1 className='uppercase'>{blog.title}</h1>
                    <h2>{blog.summary}</h2>
                    <h4>{blog.content}</h4>
                    <p className="text-green-600">POSTED BY -- {blog.author.username}</p>
                    {isLoggedIn && blog.author.username === username && (
            <button onClick={()=>{handleDelete(blog._id)}} className="border-2 bg-red-500 w-1/4 px-5 py-2 rounded-xl hover:text-white duration-400">Delete</button>
          )}
          
        
                </div>
            )
        })}
    </div>
  )
}

export default Main