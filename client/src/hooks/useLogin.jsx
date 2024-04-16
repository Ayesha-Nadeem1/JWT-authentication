import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {    
      setError(null);
      setLoading(true);
      console.log(values);
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        // Assuming message is imported or defined somewhere
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 404) {
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

  return { loading, error, loginUser };
};

export default useLogin;
