import React from 'react';
import {
  Button,
  Image,
  Flex,
  Box,
  Text,
  Center,
  VStack,
  Code,
  Grid,
  theme,
  Link,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tab,
  Tabs,
  TabList,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import Navbar from '../components/Navbar';
import FavorCard from '../components/FavorCard';
import Faq from '../components/Faq';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
const USER_URL = process.env.REACT_APP_URL + '/users';
const PARCELS_URL = process.env.REACT_APP_URL + '/parcels/byUserId';
const REQUESTS_URL = process.env.REACT_APP_URL + '/parcels/my';
const LOGOUT_URL = process.env.REACT_APP_URL + '/auth/logout';
const TRANSPORTS_URL = process.env.REACT_APP_URL + '/transports//byTransporterId';
const IN_PROGRESS = '0';
const HISTORY = '1';
const DELIVERY = '0';
const REQUESTS = '1';
const PAST_REQUESTS = '2';
const PAST_DELIVERIES = '3';

function UserProfile() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function logOut() {
    try {
      // const response = await axios.get(LOGOUT_URL);
      // const message = await response.data;
      // console.log(message);
      localStorage.removeItem('auth-token');
      navigate('/login');
    } catch (err) {
      console.error(err.response);
    }
  }

  function setData(userData) {
    setName(userData.name);
    setEmail(userData.email);
    setBalance(userData.balance);
    setUserId(userData._id);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [userId, setUserId] = useState('');
  const [parcels, setParcels] = useState([]);
  const [accepted_parcels, setAcceptedParcels] = useState([]);
  const [favors, setFavors] = useState([]);
  const [accepted_favors, setAcceptedFavors] = useState([]);
  const [panel, setPanel] = useState(<> </>);
  let [cards, setCards] = useState([]);
  const [buttonClick, setButtonClick] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(USER_URL, {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      const userData = await response.data;
      setData(userData);
      return userData._id;
    }

    // async function fetchFavors() {
    //   const response = await axios.get(PARCELS_URL, {
    //     headers: { 'auth-token': localStorage.getItem('auth-token') },
    //   });
    //   const parcels = await response.data;
    //   setParcels(parcels);
    // }

    // async function fetchTransports() {
    //   const response = await axios.get(TRANSPORTS_URL, {
    //     headers: { 'auth-token': localStorage.getItem('auth-token') },
    //   });
    //   const parcels_by_transporters = await response.data;
    //   setAcceptedParcels(parcels_by_transporters);
    // }

    fetchData()
      .catch(err => {
        console.error(err.response);
        navigate('/login');
      });
  }, []);
  
  const getParcels = async () => {
    let token = localStorage.getItem('auth-token');
    try {
        const json = await axios.get(REQUESTS_URL, {
          headers: { 'auth-token':  token},
        });
        console.log("A", json.data);
        // console.log(json.data);
        setCards(json.data);
      } catch (err) {
        console.error(err.response);
      }
    };

  useEffect(() => {
    getParcels();
  }, []);

  return (
    <Box>
      <Flex
        mx={'auto'}
        minH={'100vh'}
        justifyContent="center"
        direction={'column'}
        px="2rem"
        pt="2rem"
        pb="3rem"
        maxW={{ lg: '4xl' }}
      >
        <Heading color='blue.900' as="h1" fontSize={{ base: '3xl', lg: '4xl' }} textAlign="center" fontWeight={'1000'} mb="1rem">
          My Profile
        </Heading>
        <HStack justify={'space-between'}>
          <Heading fontSize={{ base: 'xl', lg: '2xl' }}>
            Personal Details
          </Heading>
          <Link color={'blue.500'} onClick={logOut}>
            logout
          </Link>
        </HStack>
        <Box p="1rem" rounded="2xl" shadow="lg" mb="1rem">
          <HStack>
            <Image
              src="https://i.pinimg.com/originals/6b/39/6f/6b396fdc57dc8be3d1b1de01b89ebea2.jpg"
              h="6rem"
              rounded={'lg'}
            />
            <Flex display={'block'} textAlign="center" grow="1">
              <Heading color="gray.900" fontSize={'md'}>
                {name}
              </Heading>
              <Text color={'blue.600'}>{email}</Text>
            </Flex>
          </HStack>
        </Box>

        <Flex
          direction="row"
          justify={'space-between'}
          p="1rem"
          rounded="2xl"
          shadow="lg"
          mb="1rem"
          onClick={onOpen}
        >
          <Text fontWeight={'extrabold'}>${balance}</Text>
          <Text>
            Add Money
            <ChevronRightIcon w={6} h={6} />
          </Text>
        </Flex>
        
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
              onClick={async => {
                navigate('/faq');
              }}
            >
        How to use the app? 
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feature Under Development</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            3rd Party integrations coming soon to add money to ParcelPass
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        <Heading color='blue.900' as="h2" fontSize={{ base: '3xl', lg: '4xl' }} textAlign="center" fontWeight={'1000'} mb="1rem">
          Parcels
        </Heading>
        <Box mb="1rem">
        {console.log(cards)}
        {cards.map(card => (
          <FavorCard
            onClick={async => {
              navigate('/parcel-description', {
                state: {
                  parcelDetails: card,
                },
              });
            }}
            details={card}
          />
        ))}
      </Box>
      </Flex>

      {/* <Box mt="3em"> */}
      <Navbar active={3} />
      {/* </Box> */}
    </Box>
  );
}

export default UserProfile;
