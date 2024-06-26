import { useEffect, useState } from "react"
import useStore from "../storage/store"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";


const Mypost = () => {
    const[posts,setPosts]=useState([])
    const {username} = useStore()
    useEffect(()=>{
        async function myPosts(username){
            const response = await fetch(`http://localhost:4000/myPosts/${username}`,{
                method:'GET',
                credentials:'include',
            })
            if(response.ok){
                const data = await response.json()
                setPosts(data.posts)         
            }else{
                console.log('error fetching the posts')
            }
        }
        if(username){
            myPosts(username)
        }
        
    },[username,setPosts])
    
  return (
    <div className="w-full  flex flex-col items-center gap-10 ">
        <div className="w-full flex  items-center shadow-xl p-10  ">
        <Link to='/' className="w-10 ">
        <FaArrowLeft size={32}/>
        </Link>
        <div className="w-full flex justify-center">
        <p className="text-4xl  ">My Posts</p>
        </div>
       
        
        </div>
       
        {
            posts.map((post)=>{
                return (
                    <div key={post._id} className="w-1/2 border-2 border-black p-5 flex flex-col gap-5 shadow-2xl mb-10 rounded-2xl">
                        <h1 >{post.title}</h1>
                        <h2>{post.summary}</h2>
                        <h4>{post.content}</h4>
                    </div>
                )
            })
            
        }
        {console.log(posts)}
    
    </div>
  )
}

export default Mypost