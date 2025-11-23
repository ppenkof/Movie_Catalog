import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import { useState } from "react"


function App() {
  const [user, setUser] = useState(null);

  const registerHandler = (email)=>{
    setUser({email});
  }
  
  return (
    <>
      <Header user={user}/>

      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/games" element = {<Catalog />} />
        <Route path="/games/:gameId/details" element = {<Details />} />
        <Route path="/games/create" element = {<GameCreate />} />
        <Route path="/register" element = {<Register user={user} onRegister={registerHandler}/>} />
      </Routes>
      
      <Footer /> 

    </>
  )
}

export default App
