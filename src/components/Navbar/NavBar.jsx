import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

//components

//data
import infoRoom from '../../data.json'
import infoDestrict from '../../quan_huyen.json'
import infoProvince from '../../tinh_tp.json'

const priceRange = [
    {name : '1tr - 2tr', value : [1000000,2000000]},
    {name : '2tr - 3tr', value : [2000000,3000000]},
    {name : '3tr - 5tr', value : [3000000,5000000]},
    {name : '5tr - 7tr', value : [5000000,7000000]},
]

const areaRange = [
    {name : 'Less 20 m2', value : [0,20]},
    {name : '20 m2 - 30 m2 ', value : [20,30]},
    {name : '30 m2 - 50 m2', value : [30,50]},
    {name : '50 m2 - 60 m2', value : [50,60]},
    {name : '60 m2 - 70 m2', value : [60,70]},
    {name : '70 m2 - 80 m2', value : [70,80]},

]

const NavBar = ({handleClick}) => {
    const [province,setProvince] = useState([])
    const [district,setDistrict] = useState([])
    const [city,setCity] = useState({})
    const [subDivision,setSubDivision] = useState(null)
    const [subDistrict,setSubDistrict] = useState([])
    const [price,setPrice] = useState(priceRange[0])
    const [area,setArea] = useState(areaRange[0])

    useEffect(() => {
      const primitiveCity = Object.keys(infoProvince).map(key => [Number(key),infoProvince[key]])[0]
      const primitiveSubDistrict = Object.keys(infoDestrict).map(key => [Number(key),infoDestrict[key]])
         .filter(doc => doc[1].parent_code === primitiveCity[1].code)

      setSubDivision(primitiveSubDistrict[3])
      setProvince(Object.keys(infoProvince).map(key => [Number(key),infoProvince[key]]))
      setDistrict(Object.keys(infoDestrict).map(key => [Number(key),infoDestrict[key]]))
      setCity(primitiveCity)
      setSubDistrict(primitiveSubDistrict)
    },[])

    const handleChangeCity = e => {
        const currentCity = province.find(doc => doc[1].name === e.currentTarget.value)
        setCity(currentCity)
        setSubDistrict(district.filter(doc => doc[1].parent_code === currentCity[1].code))
    }
    
    const handleChangeSubDistrict = (e) => {
        setSubDivision(subDistrict.find(doc => doc[1].name === e.currentTarget.value))
    } 

    const handleChangePrice = (e) => {
        setPrice(priceRange.find(doc => doc.name === e.currentTarget.value ))
    }
     
    const handleChangeArea = e => {
        setArea(areaRange.find(doc => doc.name === e.currentTarget.value ))
    }
    
    const handleSubmit = e => {
        e.preventDefault()

        const filteredRoom = infoRoom
        .filter(room => room.city === city[1].code && room.district === subDivision[1].code )
        .filter(room => price.value[0] < room.price < price.value[1] && area.value[0] < room.area < area.value[1] )    
        handleClick(filteredRoom)   
    }

    return (
     <Container onSubmit = {handleSubmit}>
      <SelectContainer>
            <label>City</label>
            <select onChange = {handleChangeCity} >
                <option disabled selected>City</option>
                {province.map((doc,index) => (
                    <option value = {doc[1].name} key = {index}>{doc[1].name}</option>
                ))}
            </select>
           </SelectContainer>
           <SelectContainer>
               <label>District</label>
               <select onChange = {handleChangeSubDistrict}>
                <option disabled selected>District</option>
                  {subDistrict.map((doc,index) => (
                      <option value = {doc[1].name} key = {index}>{doc[1].name_with_type}</option>
                  ))}
               </select>
           </SelectContainer>
           <SelectContainer>
               <label>Price</label>
               <select  onChange = {handleChangePrice} >
                 <option disabled selected>Price</option>
                   {priceRange.map((doc,index) => (
                      <option value = {doc.name} key = {index}>{doc.name}</option>
                  ))}
               </select>
           </SelectContainer>
           <SelectContainer>
               <label>Area</label>
               <select  onChange = {handleChangeArea} >
                <option disabled selected>Area</option>
                  {areaRange.map((doc,index) => (
                      <option value = {doc.name} key = {index}>{doc.name}</option>
                  ))}
               </select>
           </SelectContainer>
           <button type = 'submit'>Filter</button>
     </Container>
    )
}

export default NavBar
const Container = styled.form`
 height : 140px;
 background-color: #faa14e;
 display : flex;
 align-items: center;
 justify-content: center;
 > button {
     border : none;
     background-color: #f37c0c;
     color : white;
     padding : 10px 30px;
     cursor : pointer;
     margin: 15px 0 0 20px;
 }
`

const SelectContainer = styled.div`
 display : flex;
 flex-direction: column;
 margin-left : 20px;

 > label {
     color : white
 }
 > select {
    border : none;
   padding : 10px 30px;
 }
`