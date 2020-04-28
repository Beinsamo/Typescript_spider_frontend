import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import './style.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';


const Home = () => {

  const [isLogin, login] = useState(true);
  const [isLoaded, loaded] = useState(false)

  useEffect(() => {

    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        login(false);
        loaded(true)
      } else {
        console.log('please log in')
        loaded(true)
      }
    })
  })

  const handleLogout = () => {
    axios.get('api/logout').then((res) => {
      if (res.data?.data) {
        login(false)
      } else {
        message.error('logout failed')
      }
    })
  }

  const handelCrowller = () => {
    axios.get('api/getData').then((res) => {
      if (res.data?.data) {
        message.success('sucess')
      } else {
        message.error('crowller failed')
      }
    })
  }

  const getOption = () => {

  }


  if (isLogin) {
    if (isLoaded) {
      return (
        <div className='home-page'>
          <div className='buttons'>
            <Button type='primary' onClick={handelCrowller} style={{ marginLeft: '40px' }}>Crowller</Button>
            <Button type='primary' >show Crowlled things</Button>
            <Button type='primary' onClick={handleLogout}>Log out</Button>
          </div>

        </div>
      )
    } else {
      return null;
    }
  } else {
    return (
      <Redirect to='/Login'></Redirect>
    )
  }


}

export default Home