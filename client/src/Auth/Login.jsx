import React from 'react'
import { Card, Typography, Form, Input, Button, Alert , Spin} from 'antd';
import { Flex } from 'antd'; // Assuming Flex component is imported from Ant Design
import { Link } from 'react-router-dom';
import LoginImg from '../assets/loginImg.png';
const Login = () => {
    const handleLogin = async(values) => {
        console.log(values);    
    };
  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
      <Flex flex={1}>
            <img src={LoginImg} className='auth-image'/>
        </Flex>
        {/* Form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Sign In
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            unlock you world.
          </Typography.Text>
          <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
            {/* Add more Form.Item components for other fields if needed */}
            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required:true,
                        message:'Please input your full email'
                    },
                    {
                        type:'email',
                        message:'the input is not valid Email'
                    }
                ]}>
                    <Input size='large' placeholder='Enter your full Email'/>
                </Form.Item>
                <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required:true,
                        message:'Please input your full password'
                    }
                ]}>
                    <Input.Password size='large' placeholder='Enter your full Password'/>
                </Form.Item>
                {/* {error && <Alert description={error} type='error' showIcon closable className='alert'/>} */}
            <Form.Item>
              <Button //type={'${loading ? '' : 'primary'}'}
               htmlType='submit' size='large' className='btn-create'>
                {/* {loading ? <spin/> : 'Create Account'} */}
                Sign In
              </Button>
            </Form.Item>
            <Form.Item>
                <Link to={'/'}>
              <Button size='large' className='btn-create'>
                Create an Account
              </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        {/* Image */}
      </Flex>
    </Card>
  );
}

export default Login