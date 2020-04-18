import React, { useEffect, useState } from 'react';
import './style.css';
import { Form, Input, Button, message } from 'antd';
import { FormInstance } from 'antd/lib/form/Form'
import axios from 'axios';
import qs from 'qs'
import { Redirect } from 'react-router-dom';
import { cleanup } from '@testing-library/react';




const LoginForm = () => {

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [isLogin, login] = useState(false);

  const handelSubmit = (values: any) => {
    axios.post('/api/login', qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    ).then((res) => {
      if (res.data?.data) {
        login(true)
      } else {
        message.error('login failed')
      }
    })
    cleanup()
  }

  if (isLogin) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <div className='login-page'>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handelSubmit}
        >

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              login
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }


}


export default LoginForm;

