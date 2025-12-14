import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import Container from './pages/Container/Container';
import Category from './pages/Category/Category';
import CategoryNews from './pages/CategoryNews/CategoryNews';
import AddPost from './pages/AddPost/AddPost';
import "./App.css"
import { BrowserRouter } from 'react-router-dom';
import AppRout from './Components/AppRoute';
import { AuthProvider } from './Components/AuthContext';


function App() {
  return (
<AuthProvider>
 <BrowserRouter>
   <AppRout />
</BrowserRouter>
</AuthProvider>

    // <Router>
    //   <div className="App">
       
    //     <main className="main-content">
    //       <Routes>
    //         <Route path="/" element={<Main />} />
    //         <Route path="/container/:id" element={<Container />} />
    //         <Route path="/category" element={<Category />} />
    //         <Route path="/category/:id" element={<CategoryNews/>} />
    //         <Route path="/AddPost" element={<AddPost/>} />
            
    //       </Routes>
    //     </main>
    
    //   </div>
    // </Router>
  );
}

export default App;