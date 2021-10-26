import React from 'react'
import styled from 'styled-components'
import RoomDetail from '../RoomDetail/RoomDetail'
const RoomList = ({rooms}) => {
 
    return (
        <Container>
            {rooms.map((room,index) => (
                <RoomDetail room = {room} key = {index} />
            ))}
        </Container>
    )
}

export default RoomList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
