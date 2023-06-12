import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileAddOutlined,
    HomeOutlined,
    FormOutlined,
    CarOutlined,
    LogoutOutlined,
 
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
  import { useState } from 'react';
  import '../styles/AppLayout.css'
  import { Link , Outlet, useNavigate} from 'react-router-dom';

  
  const { Header, Sider, Content } = Layout;



  const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate= useNavigate()

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='logo'>
          <CarOutlined className='carlogo'/>
          <h1 >Buy Car</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '/',
                icon: <Link to={'./'}><HomeOutlined /></Link>,
                label: 'Home',
              },
              {
                key: 'Addcar',
                icon: <Link to={'/addcar'}><FileAddOutlined /></Link>,
                label: 'Add Car',
              },
              {
                key: 'edit',
                icon: <Link to={'/edit'}><FormOutlined /></Link>,
                label: 'Edit',
              },

              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                onClick: ()=>{
                  localStorage.removeItem("token")
                  navigate('/login')
                }
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            
            {/* Outlet tag for displaying main containt */}
            <Outlet/>



          </Content>
        </Layout>
      </Layout>
    );
  };
  export default App;