import React from 'react';
import {
  chakra,
  Text,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Icon
} from '@chakra-ui/react';

import { RiHandCoinFill } from "react-icons/ri";

const DemandFavorCard = () => {
  return (
    <Flex
      // bg={useColorModeValue("#F9FAFB", "borderTopLeftRadius: .600")}
      px={2}
      py={0}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="50px"
        shadow="lg"
        bg={useColorModeValue('white', 'blue.600')}
        minWidth="80%"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Mar 10, 2019
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="blue.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: 'gray.500' }}
          >
            Category
          </Link>
        </Flex>

        <Box mt={1}>
          <Flex alignItems="center">
            <Image
              mr={'1rem'}
              w={'6rem'}
              h={'6rem'}
              rounded="lg"
              fit="cover"
              // display={{ base: "none", sm: "block" }}
              src="https://www.eatright.org/-/media/eatrightimages/cup-of-coffee_528814833.jpg"
              alt="avatar"
            />
            <Flex display={'block'}>
              <Link
                fontSize="1.1rem"
                color={useColorModeValue('blue.700', 'white')}
                fontWeight="700"
                _hover={{
                  color: useColorModeValue('gray.600', 'gray.200'),
                }}
              >
                Buy me a Coffee
              </Link>
              <Text fontSize="1rem"> <Icon as={RiHandCoinFill} w={5} h={5} color="blue.600" verticalAlign='-4px'/> 10 </Text>
              <Text fontSize="0.7rem">Expires in 10 minutes</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex alignItems="center" mt={4}></Flex>
      </Box>
    </Flex>
  );
};

export default DemandFavorCard;
