import { create } from 'zustand'

 const useStore = create((set)=>({
    isLoggedIn:false,
    setIsLoggedIn:(state)=>set({isLoggedIn:state})
 }))
export default useStore
