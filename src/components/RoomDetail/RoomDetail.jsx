import React from 'react'
import styled from 'styled-components'
const RoomDetail = ({room}) => {
    const {title,thumbnail,price,area,content} = room
    return (
        <Container>
            <LeftContainer>
                 <img src= {thumbnail} alt= {title} />
            </LeftContainer>
            <RightContainer>
                <h2>{title}</h2>
                <h3>{price} VND</h3>
                <p>{area} m2</p>
                <i>{content}</i>
            </RightContainer>
        </Container>
    )
}

export default RoomDetail
const Container = styled.div`
  margin : 20px 0;
  display : flex;
  max-width: 900px;
  border : 1px solid #e94210;
  background-color:#f5edeb;
`
const LeftContainer = styled.div`
 >img {
    width : 150px;
  height : 190px;
  object-fit: cover;
 }
`

const RightContainer = styled.div`
   flex : 1;
   padding: 10px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   > h2 {
       color :red
   }
   > h3 {
      color : green;
      
   }
   >p,i {
       color : gray
   }
`