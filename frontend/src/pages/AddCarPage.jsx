import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../component/context';

const AddCarPage = () => {
  const [componentSize, setComponentSize] = useState('default');
  // const [OemData, setOemdata]= useState([])

  const OemData= useContext(Context)

  

  const navigate= useNavigate()

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
 

  const handleSubmit=async(value)=>{

    const token= (localStorage.getItem("token"))

    const response= await axios.post('http://localhost:5050/api/car/addCarDetails',{...value,token},{
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token')
      }
    })

    if(response.data.success){
      navigate("/")
    }
      window.alert(response.data.message)
  }


  

  return (
    <Form
      className='addCarForm'
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 800,
      }}
      onFinish={handleSubmit}
     
    >
      <h1>Add New Second Hand Car</h1>

      <Form.Item label="Car Model" name={"oem_id"}
         rules={[
          {
            required: true,
            message: 'Select your Car Model',
          },
        ]}
      >
        <Select>
          {
            OemData.map((data)=>{
              return(
              <Select.Option value={data._id} key={data._id}>{data.model}</Select.Option>
              )
            })
          }
        </Select>
      </Form.Item>
      
      <Form.Item label="Title" name="title"
        rules={[
          {
            required: true,
            message: 'Please input your Title',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="km" name="km" 
         rules={[
          {
            required: true,
            message: 'Please input your KiloMeter!',
          },
        ]}
      
      >
        <InputNumber />
      </Form.Item>

      <Form.Item label="Major Scratches" name={"majorScratches"}
         rules={[
          {
            required: true,
            message: 'Please input Major Scratches Or Write N.A',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Original Paint" name={"originalPaint"}
         rules={[
          {
            required: true,
            message: 'Input Original Paint Present or not',
          },
        ]}
      >
        <Select>
          <Select.Option value="yes">Yes</Select.Option>
          <Select.Option value="no">No</Select.Option>
        </Select>
      </Form.Item>
      
    
      <Form.Item label="No. of Accident" name={"noOfAccidentsReported"}
         rules={[
          {
            required: true,
            message: 'Please input Number of Accident',
          },
        ]}
      >
        <InputNumber min={0}/>
      </Form.Item>

      <Form.Item label="No. of Previous Buyer" name={"noOfPreviousBuyers"}
         rules={[
          {
            required: true,
            message: 'Please input Number of Previous Buyer',
          },
        ]}
      >
        <InputNumber min={0}/>
      </Form.Item>

      <Form.Item label="Registration Place" name={"registrationPlace"}
         rules={[
          {
            required: true,
            message: 'Please input Registration Place',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Image Url" name={"image"}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name={"description"}
         rules={[
          {
            required: true,
            message: 'Please write some description about car',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item  >
        <Button  htmlType="submit">Add Car</Button>
      </Form.Item>
    </Form>
  );
};
export default AddCarPage;