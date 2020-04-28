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

  const getOption: () => echarts.EChartOption = () => {
    return {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
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
          <ReactEcharts option={getOption()} />
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