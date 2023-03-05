import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Icon,
  Spacer,
  Button,
  useDisclosure,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { Image } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

import FavorCard from '../components/FavorCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Fonts from '../fonts'
const REQUESTS_URL = process.env.REACT_APP_URL + '/parcels';
const USER_URL = process.env.REACT_APP_URL + '/users';

export default function DemandPage() {
  const navigate = useNavigate();
  let [cards, setCards] = useState([]);
  let [user, setUser] = useState({});
  let [category, setCategory] = useState('All');

  const getParcels = async () => {
    let token = localStorage.getItem('auth-token');
    try {
        const json = await axios.get(REQUESTS_URL, {
          headers: { 'auth-token':  token},
        });
        // console.log(json.data);
        setCards(json.data);
      } catch (err) {
        console.error(err.response);
      }
    };

  const getUser = async () => {
    try {
      const userData = await axios.get(USER_URL, {
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      setUser(userData.data);
    } catch (err) {
      console.error(err.response);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getParcels();
  }, [category]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
      mx={'auto'}
      minH={'100vh'}
      justifyContent="center"
      direction={'column'}
      px="2rem"
      py="2rem"
      maxW={{ lg: '4xl' }}
    >
      <Heading color='blue.900' as="h1" fontSize={'4xl'} textAlign="center" fontWeight={'1000'} mb="1rem">
        Welcome, {user.name !== undefined ? user.name.split(' ')[0] : ''}
      </Heading>
      <Box p='0.5' bg='blue.600' rounded="lg" >
      </Box>
      <Tabs size="lg" isFitted variant="enclosed">
        <TabList>
          <Tab background='gray.100' borderColor='gray.200'>
            Packages Available
          </Tab>
          <Tab onClick={onOpen}>
            Transporters Available
          </Tab>
        </TabList>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feature Under Development</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ParcelPass will soon allow interested drivers to post their routes which can be seen by people who want to send stuff
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Accordion allowToggle>
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
                Filter by Category:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pt={'0.5rem'}>
            <Flex wrap={'wrap'} justifyContent="center">
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('All');
                }}
              >
                All
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('High');
                }}
              >
                High
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('Medium');
                }}
              >
                Medium
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('Low');
                }}
              >
                Low
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion> */}

      <Box mb="1rem">
        {cards.map(card => (
          <FavorCard
            onClick={async => {
              navigate('/parcel-description', {
                state: {
                  favorDetails: card,
                },
              });
            }}
            details={card}
          />
        ))}
      </Box>

      <Navbar active={1} />
    </Flex>
  );
}

