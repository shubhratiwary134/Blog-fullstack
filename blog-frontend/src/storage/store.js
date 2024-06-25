import { create } from 'zustand'

 const useStore = create((set)=>({
    isLoggedIn:false,
    setIsLoggedIn:(state)=>set({isLoggedIn:state}),
    blogs:[],
    setBlogs:(blogs)=>set({blogs:blogs}),
    username:'',
    setUserName:(username)=>set({username:username}),
 }))
export default useStore
