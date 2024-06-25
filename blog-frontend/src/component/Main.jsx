import { useEffect } from "react"
import useStore from "../storage/store"


const Main = () => {
    const {blogs,setBlogs} = useStore()
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
    },[setBlogs])
  return (
    <div className="w-full  flex flex-col items-center gap-2 mt-12">
        {blogs.map((blog)=>{
            return(
                <div key={blog._id} className="w-1/2 border-2 border-black p-5 flex flex-col gap-5">
                    <h1 >{blog.title}</h1>
                    <h2>{blog.summary}</h2>
                    <h4>{blog.content}</h4>
                    <p>posted by {blog.author.username}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Main