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
const FAVORS_URL = process.env.REACT_APP_URL + '/favors/byFavoreeId';
const LOGOUT_URL = process.env.REACT_APP_URL + '/auth/logout';
const FAVORS_ACCEPTED_URL = process.env.REACT_APP_URL + '/trades/byFavorerId';
const IN_PROGRESS = '0';
const HISTORY = '1';
const FAVORS_ACCEPTED_BY_ME = '0';
const FAVORS_REQUESTED_BY_ME = '1';
const FAVORS_COMPLETED_BY_ME = '2';
const FAVORS_COMPLETED_FOR_ME = '3';

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
    setCoins(userData.favorCoins);
    setPhone(userData.phone);
    setUserId(userData._id);
  }

  const [tabVal, setTabVal] = useState('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coins, setCoins] = useState('');
  const [userId, setUserId] = useState('');
  const [favors, setFavors] = useState([]);
  const [accepted_favors, setAcceptedFavors] = useState([]);
  const [panel, setPanel] = useState(<> </>);
  const [cards, setCards] = useState(<> </>);
  const [buttonClick, setButtonClick] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(USER_URL, {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      const userData = await response.data;
      setData(userData);
      setTabVal(IN_PROGRESS);
      assignPanel();
      return userData._id;
    }

    async function fetchFavors(userId) {
      const response = await axios.get(FAVORS_URL, {
        params: { favoreeId: userId },
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      const favors = await response.data;
      setFavors(favors);
    }

    async function fetchAcceptedFavors(userId) {
      const response = await axios.get(FAVORS_ACCEPTED_URL, {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      const accepted_favors = await response.data;
      setAcceptedFavors(accepted_favors);
    }

    fetchData()
      .then(userId => {
        fetchFavors(userId).catch(err => console.error(err.response));
        fetchAcceptedFavors(userId).catch(err => console.error(err.response));
      })
      .catch(err => {
        console.error(err.response);
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    assignCards(FAVORS_REQUESTED_BY_ME);
  }, [favors]);

  useEffect(() => {
    assignPanel();
    if (tabVal === '0') {
      assignCards(FAVORS_REQUESTED_BY_ME);
    }
    if (tabVal === '1') {
      assignCards(FAVORS_COMPLETED_BY_ME);
    }
  }, [tabVal]);

  useEffect(() => {
    assignCards(buttonClick);
  }, [buttonClick]);

  function assignPanel() {
    if (tabVal === IN_PROGRESS) {
      setPanel(
        <AccordionPanel pt={'0.5rem'}>
          <Flex wrap={'wrap'} justifyContent="center">
            <Button
              mx="1rem"
              mt="0.5rem"
              onClick={() => {
                setButtonClick(FAVORS_REQUESTED_BY_ME);
              }}
            >
              Favors Requested by Me
            </Button>
            <Button
              mx="1rem"
              mt="0.5rem"
              onClick={() => {
                setButtonClick(FAVORS_ACCEPTED_BY_ME);
              }}
            >
              Favors Accepted by Me
            </Button>
          </Flex>
        </AccordionPanel>
      );
    } else {
      setPanel(
        <AccordionPanel pt={'0.5rem'}>
          <Flex wrap={'wrap'} justifyContent="center">
            <Button
              mx="1rem"
              mt="0.5rem"
              onClick={() => {
                setButtonClick(FAVORS_COMPLETED_BY_ME);
              }}
            >
              Favors Completed by Me
            </Button>
            <Button
              mx="1rem"
              mt="0.5rem"
              onClick={() => {
                setButtonClick(FAVORS_COMPLETED_FOR_ME);
              }}
            >
              Favors Completed for Me
            </Button>
          </Flex>
        </AccordionPanel>
      );
    }
  }

  function assignCards(type) {
    console.log('Favors in Assign Cards', favors);
    if (type === FAVORS_ACCEPTED_BY_ME) {
      setCards(
        <>
          <Text fontSize="1.2rem" fontWeight="black" mt="1rem">
            Favors Accepted by Me
          </Text>
          {accepted_favors
            .filter(f => f.status === 'Accepted')
            .map(favor => (
              <FavorCard
                onClick={async => {
                  navigate('/favor-status', {
                    state: {
                      favorDetails: favor,
                      isFavoree: false,
                    },
                  });
                }}
                details={favor}
              />
            ))}
        </>
      );
    } else if (type === FAVORS_REQUESTED_BY_ME) {
      setCards(
        <>
          <Text fontSize="1.2rem" fontWeight="black" mt="1rem">
            Favors Requested by Me
          </Text>
          {favors
            .filter(f => f.status === 'Accepted' || f.status === 'Requested')
            .map(favor => (
              <FavorCard
                onClick={async => {
                  navigate('/favor-status', {
                    state: {
                      favorDetails: favor,
                      isFavoree: true,
                    },
                  });
                }}
                details={favor}
              />
            ))}
        </>
      );
    } else if (type === FAVORS_COMPLETED_BY_ME) {
      setCards(
        <>
          <Text fontSize="1.2rem" fontWeight="black" mt="1rem">
            Favors Completed by Me
          </Text>
          {accepted_favors
            .filter(f => f.status === 'Completed')
            .map(favor => (
              <FavorCard details={favor} />
            ))}
        </>
      );
    } else if (type === FAVORS_COMPLETED_FOR_ME) {
      setCards(
        <>
          <Text fontSize="1.2rem" fontWeight="black" mt="1rem">
            Favors Completed for Me
          </Text>
          {favors
            .filter(f => f.status === 'Completed')
            .map(favor => (
              <FavorCard details={favor} />
            ))}
        </>
      );
    }
  }

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
              <Text color={'gray.900'}>{phone}</Text>
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
          <Text fontWeight={'extrabold'}>{coins} 💰</Text>
          <Text>
            Loan Coins
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
            Out of coins? Favorly will soon allow you to borrow coins to fulfill your urgent needs.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>

        <Tabs size="lg" isFitted variant="enclosed">
          <TabList>
            <Tab
              onClick={() => {
                setTabVal(IN_PROGRESS);
                console.log(tabVal);
                assignPanel();
              }}
              _selected={{ bg: 'gray.100', borderColor: 'gray.200' }}
            >
              In Progress
            </Tab>
            <Tab
              onClick={() => {
                setTabVal(HISTORY);
                console.log(tabVal);
                assignPanel();
              }}
              _selected={{ bg: 'gray.100', borderColor: 'gray.200' }}
            >
              History
            </Tab>
          </TabList>
        </Tabs>

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="center"
                  color="gray.500"
                  fontSize={'1.2rem'}
                  py="0.5rem"
                >
                  Filter by Status:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {panel}
          </AccordionItem>
        </Accordion>
        {cards}
      </Flex>

      {/* <Box mt="3em"> */}
      <Navbar active={3} />
      {/* </Box> */}
    </Box>
  );
}

export default UserProfile;
