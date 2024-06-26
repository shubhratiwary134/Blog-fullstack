import { create } from 'zustand'

 const useStore = create((set)=>({
    isLoggedIn:false,
    setIsLoggedIn:(state)=>set({isLoggedIn:state}),
   //  username:'',
   //  setUserName:(username)=>set({username:username}),
   username: localStorage.getItem('username') || '', 
   setUserName: (username) => {
     set({ username });
     localStorage.setItem('username', username); 
   },
 }))
export default useStore
