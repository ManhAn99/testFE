import { useState } from "react";
import RoomList from "./components/RoomList/RoomList";
import NavBar from "./components/Navbar/NavBar";
import styled from "styled-components";
import infoRooms from './data.json'

function App() {
   const [rooms,setRooms] = useState(infoRooms)

   const handleClick = rooms => {
     setRooms(rooms)
   }

   console.log(rooms)
  return (
    <Container>
       <NavBar handleClick = {handleClick} />
 
         <RoomList  rooms = {rooms} />
   
    </Container>
  );
}

export default App;
const Container = styled.div`

`