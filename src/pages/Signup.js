import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
const SIGNUP_URL = process.env.REACT_APP_URL + '/auth/register';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success === true) {
      setErrMsg('');
    }
  }, [success]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let authBody = {
        email: email,
        password: password,
        name: firstName + ' ' + lastName,
        phone: phone,
        password: password
      };
      const response = await axios.post(SIGNUP_URL, authBody);
      console.log(response);
      setSuccess(true);
      navigate('/login');

    } catch (err) {
      setErrMsg(err.response.data);
      console.log(err.response);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        {/* Heading */}
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* First and Last Name Inputs */}
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Happy"
                      onChange={e => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Bruin"
                      onChange={e => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </FormControl>
                </Box>
              </HStack>

              {/* Email Input */}
              <FormControl id="email" isRequired>
                <FormLabel>UCLA Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="bruin@ucla.edu"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>

              {/* Phone Input */}
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  placeholder="123-456-7890"
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                ></Input>
              </FormControl>

              {/* Password Input */}
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Password Input */}
              <FormControl id="password" isRequired>
                <FormLabel>Re-Enter Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Sign Up Submit button */}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>

              {/* Already User Line */}
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link
                    color={'blue.400'}
                    onClick={async => {
                      navigate('/login');
                    }}
                  >
                    Login
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
