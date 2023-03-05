import React from 'react';
import {
  chakra,
  Text,
  Box,
  Image,
  Flex,
  Icon,
  VStack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import packageImg from '../assets/parcel.png';
import { RiHandCoinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

var moment = require('moment');
var datejs = require('datejs');

const FavorCard = props => {
  const navigate = useNavigate();
  let content;
  content =
    props.content === 'show' ? (
      <Text mt={2} color={'gray.600'} wordBreak={'break-word'}>
        {props.details.content}
      </Text>
    ) : (
      <></>
    );

  // const getExpiryTime = () => {
  //   const date = props.details.favorRequestTime;
  //   const expiryTimer = props.details.favorRequestTimer;
  //   const nowDateObj = new Date(Date.now());
  //   // console.log(date);
  //   var oldDateObj = moment(date).add(expiryTimer, 'm').toDate();
  //   var seconds = oldDateObj - nowDateObj;
  //   if(seconds <= 0)
  //     seconds = 0;
  //   // console.log(seconds);
  //   var minutes = Math.round(seconds / 60000);
  //   return minutes;
  // };

  // const getDate = () => {
  //   return moment(props.details.favorRequestTime).format('MMMM D, Y');
  // };

  // const expiryTime = getExpiryTime();
  const getStatus = () => {
    if(props.details.assigned)
      return "Assigned";
    else
      return "Not Assigned"
  };

  const getPrice = () => {
    return Math.floor(Math.random() * 8) + 3;
  }

  return (
    <Flex py={'1rem'} alignItems="center" justifyContent="center">
      <Box w="full" px={'1rem'} pt={'1rem'} rounded="2xl" shadow="lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Link
            px={3}
            py={1}
            mx="0.5rem"
            bg="yellow.500"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="lg"
            _hover={{ bg: 'gray.500' }}
          >
            {getStatus()}
          </Link>
          {/* </Box> */}
        </Flex>

        <Box onClick={props.onClick} mt={2}>
          <Flex alignItems="center">
            <Image
              mr={'1rem'}
              w={'6rem'}
              h={'6rem'}
              rounded="full"
              fit="cover"
              // display={{ base: "none", sm: "block" }}
              src={packageImg}
              alt="avatar"
            />
            <Flex display={'block'}>
            <Text 
               wordBreak={'break-word'}
                fontSize="lg"
                color='blue.700'
                fontWeight="700"
                _hover={{
                  color: useColorModeValue('gray.600', 'gray.200'),
                }}
              >
                {"From: " + props.details.startLocation}
              </Text>
              <Text 
               wordBreak={'break-word'}
                fontSize="lg"
                color='blue.700'
                fontWeight="700"
                _hover={{
                  color: useColorModeValue('gray.600', 'gray.200'),
                }}
              >
                {"To: " + props.details.endLocation}
              </Text>
              <Text fontSize="1rem">
                {' $'}
                {getPrice()}{' '}
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Flex alignItems="center" mt={4}></Flex>
      </Box>
    </Flex>
  );
};

export default FavorCard;
