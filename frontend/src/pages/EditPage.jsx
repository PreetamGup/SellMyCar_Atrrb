import React, { useEffect, useState } from 'react'
import {Modal, Form, Input, InputNumber, Select, Button} from 'antd';

import axios from 'axios'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'

const EditPage = () => {

  const [carData, setCarData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToBeEdit, setcarToBeEdit] = useState({})
  

  const handleDelete=async(carId)=>{
    console.log("inDelete")
    try {
      const res= await axios.delete(`http://localhost:5050/api/car/removecar/${carId}`,{
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      })

      if(res.data.response.acknowledged){
        window.alert("Deleted Successfully")
      }else{
        window.alert("Something went wrong")
      }

      getData()

    } catch (error) {
      console.log(error)
      window.alert("Backend error")
    }

    
   
  }


  const handleSubmit =async(value)=>{
 
    try {
      const response= await axios.put('http://localhost:5050/api/car/updatecardetails',{...value,_id:carToBeEdit._id},{
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      })
      
      if(response.data.success){
        window.alert(response.data.message)
      }
      getData()

    } catch (error) {
      console.log(error)
    }
    
    setIsModalOpen(false)
  }

  const getData=async()=>{
      
    const response= await axios.get('http://localhost:5050/api/car/carsbydealers',{
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(response.data.allCarsByDealer)
    setCarData(response.data.allCarsByDealer)
  
  }



  useEffect(()=>{
    getData()

  },[])


  return (
    <div className='editPage'>
      <table border={2}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Total Travel</th>
            <th>Number of Accident</th>
            <th>Number of Buyers</th>
            <th>Registration Place</th>
            <th style={{width:"180px"}}>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            carData.map((car, idx)=>{
              return (
                <tr key={car._id}>
                  <td>{car.title}</td>
                  <td className='editcarimage'><img src={car.image? car.image: 'https://t4.ftcdn.net/jpg/03/32/56/67/360_F_332566713_q0QLBQ0BWkG5ed7DGRiuFIjvZNwEL9k2.jpg'} alt="carImage" /></td>
                  <td>{`${car.km} km`}</td>
                  <td>{car.noOfAccidentsReported}</td>
                  <td>{car.noOfPreviousBuyers}</td>
                  <td>{car.registrationPlace}</td>

                  <td>{car.description}</td>
                  
                  <td><EditOutlined onClick={()=>{setIsModalOpen(true); setcarToBeEdit(car)}} /> <DeleteOutlined onClick={()=>handleDelete(car._id)}/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        isModalOpen && 
          <Modal title="Car Details" open={isModalOpen} onCancel={()=> setIsModalOpen(false)} footer={false}>
             <Form initialValues={carToBeEdit} onFinish={handleSubmit}>
                <Form.Item label="Title" name="title">
                  <Input />
                </Form.Item>

                <Form.Item label="km" name="km" >
                  <InputNumber />
                </Form.Item>

                <Form.Item label="Major Scratches" name={"majorScratches"}>
                  <Input />
                </Form.Item>

                <Form.Item label="Original Paint" name={"originalPaint"}>
                  <Select>
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                  </Select>
                </Form.Item>
                
              
                <Form.Item label="No. of Accident" name={"noOfAccidentsReported"}>
                  <InputNumber min={0}/>
                </Form.Item>

                <Form.Item label="No. of Previous Buyer" name={"noOfPreviousBuyers"}>
                  <InputNumber min={0}/>
                </Form.Item>

                <Form.Item label="Registration Place" name={"registrationPlace"}>
                  <Input />
                </Form.Item>

                <Form.Item label="Image Url" name={"image"}>
                  <Input />
                </Form.Item>

                <Form.Item label="Description" name={"description"}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item  >
                  <Button  htmlType="submit">Submit</Button>
                </Form.Item>
             </Form>
         </Modal>
        
      }
    </div>
  )
}

export default EditPage