import React from 'react'

const CarCard = ({allCars}) => {
  return (
    <div className='carCard'>
     
      {
        allCars?.map(car=>{
          return (
            <div key={car._id} className='carDetails'>
              <img src={car.image?car.image : "https://t4.ftcdn.net/jpg/03/32/56/67/360_F_332566713_q0QLBQ0BWkG5ed7DGRiuFIjvZNwEL9k2.jpg"} alt="" />
              <p>{car.title}</p>
              <p>₹{car.oem.listPriceOfNewVehicle}</p>
            </div>
          )
        })
        
      }

      
    </div>
  )
}

export default CarCard