import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import { useState } from "react"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import Edit from "./components/edit/Edit"
import UserContext from "./contexts/UserContext"


function App() {
   // After second exerise way with formData without real state management
  // const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);

  const registerHandler = async (email, password)=>{
     // After second exerise way with formData without real state management
    // if(registeredUsers.some(user => user.email === email)){
    //   throw new Error('User with this email already exists');
    // }

    // setRegisteredUsers(state => [...state, {email, password}]);

    //automatically log in the user after registration
    const newUser = {email, password};

    const response = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const result = await response.json();
    console.log(result);

    setUser(
      {email, password},
    );
  }

  const loginHandler = (email, password)=>{
     // After second exerise way with formData without real state management
    // const user = registeredUsers.find(user => user.email === email && user.password === password);

    // if(!user){
    //   throw new Error('Invalid email or password');
    // }

   setUser({
      user
    });
  };

  const logoutHandler = ()=>{
    setUser(null);
  };

  const userContextValue = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler
  };
  
  return (
    <UserContext.Provider value = {userContextValue}>
      <Header user={user} />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/games" element = {<Catalog />} />
        <Route path="/games/:gameId/details" element = {<Details user={user}/>} />
        <Route path="/games/create" element = {<GameCreate />} />
        <Route path="/games/:gameId/edit" element = {<Edit />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login onLogin={loginHandler}/>} />
        <Route path="/logout" element = {<Logout onLogout={logoutHandler}/>} />
      </Routes>
      
      <Footer /> 

    </UserContext.Provider>
  )
}

export default App
