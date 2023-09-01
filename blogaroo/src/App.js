import './App.css';
import Navbar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import Card from './components/Card';
import BlogDetails from './components/BlogDetails';
import CreateBlog from './components/CreateBlog';
import MiniHome from './components/MiniHome';
import UpdateBlog from './components/UpdateBlog';

function App() {

  const token = localStorage.getItem("token");

  return (
      <Provider store={store}>
      <div>
        <Navbar/>
      </div>
      <Routes>
          <Route  path='/' element={<MiniHome/>}/>
          <Route  path='/home' element={<Home/>}/>
          <Route path='/:id' element={<BlogDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/createblog' element={<CreateBlog/>}/>
          <Route path='/editblog/:id' element={<UpdateBlog/>}/>
      </Routes>
      </Provider>
  )
}

export default App;
