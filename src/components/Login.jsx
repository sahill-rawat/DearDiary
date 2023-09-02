import {
    Button,
    Container,
    Heading,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import MetaData from './Metadata';
  import { useAuth } from '../Auth';
import { toast } from 'react-hot-toast';
  
  const Login = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
  
  
    const loginSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      login(email, password).then(()=>{
        navigate('/diary');
        toast.success('Logged In successfully');
      }).catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    };
  
  
    useEffect(()=>{
      window.scrollTo(0, 0);
    },[]);
  
    return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
        <MetaData title='Login'/>
      <form>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading>LogIn</Heading>
  
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            onChange={(e)=>setPassword(e.target.value)}
          />
  
          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/forgetpassword'}>Forget Password?</Link>
          </Button>
  
          <Button bg='#FBCD44' type={'submit'} onClick={loginSubmit} >
            Log In
          </Button>
  
          <Text textAlign={'right'}>
            New User?{' '}
            <Button variant={'link'} color='#FBCD44'>
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
    );
  };
  
  export default Login;