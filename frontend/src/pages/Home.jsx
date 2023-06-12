import React,{useState, useEffect} from 'react'
import CarCard from '../component/CarCard'
import axios from 'axios'
// import { useContext } from 'react';
// import { Context } from '../component/context';

const Home = () => {
    
  const [allCars, setAllCars] = useState([])
  const [allCarsData, setallCarsData] = useState([])
  const [price, setPrice] = useState(10000000)
  const [Color, setColor] = useState("")
  const [mileage, setMileage] = useState(50)
  // const OemData= useContext(Context)


  const handleSubmit=(e)=>{
    e.preventDefault()
    const filterCars= allCars.filter((car)=> {
      return car.oem.listPriceOfNewVehicle<=price  && car.oem.mileage <=mileage && car.oem.availableColors.filter(item=> item.toLowerCase().includes(Color.toLowerCase())).length!==0
    })

    setallCarsData(filterCars)
  }


  useEffect(() => {
    const getData=async()=>{
     try {
      
      const response= await axios.get('https://sellmycar-atrryb.onrender.com/api/car/allcardetails',{
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      } )
      // console.log(response.data.allCar)
      console.log(response.data.allCar)
      setallCarsData(response.data.allCar)
      setAllCars(response.data.allCar)
     } catch (error) {
      console.log(error)
      window.alert("Some error from backend")
     }
    }

    getData()
   
  }, [])
  

  return (
    <div className='homeContainer'>

        <div className='allCars'>
          <CarCard allCars={allCarsData}/>

          <div className='carFilter'>
            <form onSubmit={handleSubmit}>
            <h1>Filter</h1>
              <label htmlFor="price">Price</label>
              <input type="range" max={10000000} name='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              <p>{price}</p>
              <br />
              <label htmlFor="color">Color</label>
              <input type="text" name='color' value={Color} onChange={(e)=> setColor(e.target.value)}/>
              <br />
              <label htmlFor="mileage">Mileage</label>
              <input type="range" max={50} name='mileage' value={mileage} onChange={(e)=> setMileage(e.target.value)}/>
              <p>{mileage}</p>
              <br />
              <button type='submit'>Filter</button>
            </form>
          </div>
        </div>
        
    </div>
  )
}

export default Home