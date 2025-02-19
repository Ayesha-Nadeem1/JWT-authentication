import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    try {
      
      if (values.password !== values.passwordConfirm) {
        console.log(values);
        throw new Error('Passwords do not match');
    }    

      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 201) {
        // Assuming message is imported or defined somewhere
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        // Assuming message is imported or defined somewhere
        message.error('Registration failed');
      }
    } catch (error) {
      // Assuming message is imported or defined somewhere
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
