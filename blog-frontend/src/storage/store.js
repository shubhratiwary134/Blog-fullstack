import { create } from 'zustand'

 const useStore = create((set)=>({
    isLoggedIn:false,
    setIsLoggedIn:()=>{
        set({isLoggedIn:true})
    }
 }))
export default useStore
