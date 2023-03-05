import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
const LOGIN_URL = process.env.REACT_APP_URL + '/auth/login';

export default function Login() {
  const navigate = useNavigate();
  // const isMounted = useRef(false);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  // useEffect(() => {}, [user, pwd]);

  useEffect(() => {
    if (success === true) {
      setErrMsg('');
    }
  }, [success]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(LOGIN_URL);
      let authBody = { email: user, password: pwd };
      const response = await axios.post(LOGIN_URL, authBody);
      const token = response.data;
      localStorage.setItem("auth-token", token);
      setSuccess(true);
      navigate('/demand');

    } catch (err) {
      setUser('');
      setPwd('');
      setErrMsg('Sorry wrong credentials! Please try again!');
      console.log(err.response);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      shrink={'0'}
      align={'center'}
      justify={'center'}
      bg="gray.50"
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="bruin@ucla.edu"
                  onChange={e => setUser(e.target.value)}
                  value={user}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••••"
                  onChange={e => setPwd(e.target.value)}
                  value={pwd}
                />
              </FormControl>

              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>

              {/* Already User Line */}
              <Stack pt={6}>
                <Text align={'center'}>
                  First time user?{' '}
                  <Link
                    color={'blue.400'}
                    onClick={async => {
                      navigate('/signup');
                    }}
                  >
                    Sign-up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
          <Text textAlign={'center'} fontSize='xl' color={'red.500'}>{errMsg}</Text>
        </Box>
      </Stack>
    </Flex>
  );
}
