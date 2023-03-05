import React from 'react';
import {
  Button,
  Image,
  Flex,
  Box,
  Text,
  Icon,
  Link,
  Heading,
  useToast,
} from '@chakra-ui/react';

import Faq from '../components/Faq';

export default function FaqPage() {
    return (
        <Flex minH='100vh' direction={'column'} justify='center' bg='blue.700'>
            <Heading color='white' as="h1" fontSize={{ base: '3xl', lg: '4xl' }} textAlign="center" fontWeight={'1000'} mb="1rem">
            Frequently Asked Questions.
            </Heading>
            <Faq />
        </Flex>
    );
};