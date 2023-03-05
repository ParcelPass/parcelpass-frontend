import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Divider,
  Center,
  Tooltip,
  Textarea,
  RadioGroup,
  Radio,
  Link,
  Image,
  Button,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  HStack,
  useToast,
} from '@chakra-ui/react';

import { SiCoffeescript } from 'react-icons/si';
import { FaHamburger, FaHandsHelping, FaStore } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
const PARCEL_URL = process.env.REACT_APP_URL + '/parcels';
const UPDATE_BALANCE = process.env.REACT_APP_URL + '/users/updateBalance';

export default function Form() {
  const toast = useToast();
  const navigate = useNavigate();

  const [expiry, setExpiry] = React.useState('100');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tip, setTip] = useState('');
  const [content, setContent] = useState('');
  const [urgency, setUrgency] = useState('Low');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success === true) {
      setErrMsg('');
    }
  }, [success]);

  useEffect(() => {
    if (errMsg !== '') {
      setSuccess(false);
    }
  }, [errMsg]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let parcelBody = {
        startLocation: to,
        endLocation: from,
        content: content,
      };
      const response = await axios.post(PARCEL_URL, parcelBody, {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      console.log(response);
      setSuccess(true);
      const updateResponse = await axios.get(UPDATE_BALANCE, {
        params: {
          type: 'subtract',
          balance: 2,
          userId: response.data.userId,
        },
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      toast({
        title: 'Request recorded successfully!',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      navigate('/user-profile');
    } catch (err) {
      let msg =
        err.response.data.message !== undefined
          ? err.response.data.message
          : err.response.data;
      setErrMsg(msg);
      console.error(err.response);
      if (err.response.data === 'Access Denied') navigate('/login');
    }
  };

  return (
    <Flex minH="100vh" mx="auto" maxW="4xl" align={'center'} justify={'center'}>
      <Stack mx={'auto'} w="full" py={'2rem'} px="2rem">
        <Stack align={'center'}>
          <Heading
            color="blue.900"
            as="h1"
            fontSize={'4xl'}
            textAlign="center"
            fontWeight={'1000'}
            mb="1rem"
          >
            Request a Delivery
            <Text display={'inline'} ml="0.5rem" color="blue.600" onClick={() => navigate('/faq')}>
              ⓘ
            </Text>
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id=" To">
              <FormLabel>To</FormLabel>
              <Input
                type="string"
                rounded="2xl"
                placeholder="Parcel Pickup Location"
                onChange={e => setTo(e.target.value)}
                value={to}
              />
            </FormControl>
            <FormControl id="From">
              <FormLabel>From</FormLabel>
              <Input
                type="string"
                rounded="2xl"
                placeholder="Parcel DropOff Location"
                onChange={e => setFrom(e.target.value)}
                value={from}
              />
            </FormControl>

            <FormControl id="Parcel Contents">
              <FormLabel>Parcel Contents</FormLabel>
              <Textarea
                placeholder="Describe the contents of the Parcel"
                minHeight="5.5rem"
                rounded="2xl"
                onChange={e => setContent(e.target.value)}
                value={content}
              />
            </FormControl>

            <FormControl id="Tip">
              <FormLabel>Additional Tip</FormLabel>
              <Input
                type="number"
                rounded="2xl"
                placeholder="$2"
                onChange={e => setTip(e.target.value)}
                value={tip}
              />
              <Text color="gray">
                *This is additional to the basic cost.
              </Text>
            </FormControl>

            <FormControl id="Urgency">
              <FormLabel>Urgency</FormLabel>
              <Box rounded={'2xl'} bg={'transparent'} boxShadow={'lg'} p={8}>
                <RadioGroup value={urgency} onChange={val => setUrgency(val)}>
                  <Stack spacing={4}>
                    <Radio value="High">
                      {' '}
                      High
                    </Radio>
                    <Divider />
                    <Radio value="Medium">
                      {' '}
                      Medium
                    </Radio>
                    <Divider />
                    <Radio value="Low">
                      {' '}
                      Low
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Text color="gray">
                *Price will vary according to urgency.
              </Text>
            </FormControl>

            <FormControl id="Expiry">
              <Text>Your Request will expire in {expiry} minutes.</Text>
              <Input
                type={'number'}
                mt="1rem"
                onChange={e => setExpiry(e.target.value)}
                value={expiry}
                placeholder="100"
                size="sm"
                rounded="2xl"
              />
            </FormControl>
            <Button
              type="sumbit"
              mb="2rem"
              bg={'blue.400'}
              py="1.5rem"
              color={'white'}
              rounded="2xl"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Post Request
            </Button>
            <Text textAlign={'center'} color="red.400">
              {errMsg}
            </Text>
            <Navbar active={2} />
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
