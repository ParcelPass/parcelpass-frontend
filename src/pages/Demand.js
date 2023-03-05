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
const DEMANDS_URL = process.env.REACT_APP_URL + '/favors';
const DEMANDS_CATEG_URL = process.env.REACT_APP_URL + '/favors/byCategory';
const USER_URL = process.env.REACT_APP_URL + '/users';

export default function DemandPage() {
  const navigate = useNavigate();
  let [cards, setCards] = useState([]);
  let [user, setUser] = useState({});
  let [category, setCategory] = useState('All');

  const getFavors = async () => {
    let token = localStorage.getItem('auth-token');
    if (category === 'All') {
      console.log('All');
      try {
        const json = await axios.get(DEMANDS_URL, {
          headers: { 'auth-token':  token},
        });
        // console.log(json.data);
        setCards(json.data);
      } catch (err) {
        console.error(err.response);
      }
    } else {
      try {
        const json = await axios.get(DEMANDS_CATEG_URL, {
          params: { category: category },
          headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        // console.log(json.data);
        setCards(json.data);
      } catch (err) {
        console.error(err.response);
      }
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
    getFavors();
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
            Get a favor
          </Tab>
          <Tab onClick={onOpen}>
            Give a favor
          </Tab>
        </TabList>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feature Under Development</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Have something to Offer? Favorly will soon add the feature that allows you to offer gigs.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                  setCategory('Coffee');
                }}
              >
                Coffee
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('Food');
                }}
              >
                Food
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('General Help');
                }}
              >
                General Help
              </Button>
              <Button
                mx="1rem"
                mt="0.5rem"
                onClick={() => {
                  setCategory('Grocery');
                }}
              >
                Grocery
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box mb="1rem">
        {cards.map(card => (
          <FavorCard
            onClick={async => {
              navigate('/favor-description', {
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
