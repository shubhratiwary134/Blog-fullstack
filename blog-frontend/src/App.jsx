
import './App.css'
import Main from './component/Main'
import Navbar from './component/Navbar'
import useStore from './storage/store';
function App() {
  
  const storedUsername = localStorage.getItem('username');
  useStore.setState({ username: storedUsername || '' });

  return (
   

    <div className='container-main bg-[#f8f8f8]'>
      <div className='Navbar'>
        <Navbar></Navbar>
      </div>
      <Main></Main>
    </div>
    
  )
}

export default App
