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
    <div className="w-full  flex flex-col items-center gap-2 mt-12">
        {blogs.map((blog)=>{
            return(
                <div key={blog._id} className="w-1/2 border-2 border-black p-5 flex flex-col gap-5 shadow-2xl">
                    <h1 >{blog.title}</h1>
                    <h2>{blog.summary}</h2>
                    <h4>{blog.content}</h4>
                    <p>posted by {blog.author.username}</p>
                    {isLoggedIn && blog.author.username === username && (
            <button onClick={()=>{handleDelete(blog._id)}}>Delete</button>
          )}
          
        
                </div>
            )
        })}
    </div>
  )
}

export default Main