import React from 'react';
import {
  chakra,
  Text,
  Heading,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function Faq() {
  return (
    <Box minW="60vw" px="1rem" mx="auto" justify={'center'} bg="blue.700">
      <Accordion allowMultiple color="white">
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontSize={'1.5rem'}>How does Favorly work?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Feel like you're in a hurry and don't want to pay the high fees
            charged by delivery services? Just post a favor request on favorly
            for your needs and as soon as a kind soul agrees to help out, you're
            on your way! Each favor costs a certain amount of favorcoins, which
            we give you, for free!
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontSize={'1.5rem'}>What is a favorcoin?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Favorcoin is our very own crypto token used to monitor favor
            transactions
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontSize={'1.5rem'}>How do favorcoins work?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Every time a user posts a favor request, they specify the cost of
            the favor depending on the time required to complete the favor as
            well as the effort required to complete it
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontSize={'1.5rem'}>
                What is the value of a favorcoin?
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            One favorcoin is equivalent to about 15 minutes of your time
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontSize={'1.5rem'}>
                How do I get more favorcoins?
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            The easiest way to get more favorcoins is by helping out your peers!
            Accept a favor from the request tab or even offer help to someone.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default Faq;
