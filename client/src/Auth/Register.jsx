import React from 'react';
import { Card, Typography, Form, Input, Button, Alert , Spin} from 'antd';
import { Flex } from 'antd'; // Assuming Flex component is imported from Ant Design
import { Link } from 'react-router-dom';
import regiterimg from '../assets/registerimg.png';
import useSignup from '../hooks/useSignup';
const Register = () => {
  const {loading, error, registerUser} = useSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
        {/* Form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Create an Account
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Join for exclusive access!
          </Typography.Text>
          <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
            <Form.Item
              label='Full Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your full name',
                },
              ]}
            >
              <Input size='large' placeholder='Enter your full name' />
            </Form.Item>
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
                    <Form.Item
                    label='Password'
                    name='passwordConfirm'
                    rules={[
                        {
                            required:true,
                            message:'Please input your Re-password'
                        }
                    ]}>
                    <Input.Password size='large' placeholder='Enter your Password Again'/>
                </Form.Item>
                {error && <Alert description={error} type='error' showIcon closable className='alert'/>}
            <Form.Item>
              <Button type={`${loading ? '' : 'primary'}`}
               htmlType='submit' size='large' className='btn-create'>
                {loading ? <spin/> : 'Create Account'}
              </Button>
            </Form.Item>
            <Form.Item>
                <Link to={'/login'}>
              <Button size='large' className='btn-create'>
                Sign In
              </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        {/* Image */}
        <Flex flex={1}>
            <img src={regiterimg} className='auth-image'/>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
