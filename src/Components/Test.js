import React,{useContext} from 'react'
import LocationContext from '../Context/LocationContext'
const Test = () => {
    console.log(useContext(LocationContext))
  return (
    <div></div>
  )
}

export default Test