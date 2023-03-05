import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react';

import Faq from '../components/Faq';
import Feature from '../components/Feature';
import Logo from '../assets/pp.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CallToActionWithVideo() {
  const navigate = useNavigate();
  return (
    <Box >
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        pb="4rem"
        minH="100vh"
        align="center"
        justify={'center'}
      >
        <Flex
          align={'center'}
          justify="center"
          px="2rem"
          py="1rem"
          direction="column"
        >
          <Image w="30rem" src={Logo} />
          <Heading
            textAlign={'center'}
            fontWeight={600}
            fontSize="3rem"
            color="#0077b6"
            pb='2rem'
          >
            Parcel Pass
          </Heading>

          <Stack mt="1rem">
            <Button
              rounded={'2xl'}
              py="2rem"
              px="5rem"
              fontWeight={'normal'}
              fontSize="1.3rem"
              colorScheme={'blue'}
              bg={'blue.600'}
              _hover={{ bg: 'blue.800' }}
              onClick={() => navigate('/demand')}
            >
              Get started
            </Button>
          </Stack>
        </Flex>

   
      </Flex>
      <Box p="2rem" bg={'blue.700'}>
        <Faq />
      </Box>
    </Box>
  );
}
