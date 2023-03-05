import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function Error() {
  return (
    <Flex

      minH='100vh'
      direction={'column'}
      textAlign="center"
      py={10}
      px={6}
      mx="auto"
      justifyContent={'center'}
    >

      <Flex alignItems={'center'} justifyContent='center'>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Flex>


      <Box>
        <Heading as="h2" size="3xl" mb={2}>
          There is nothing here 😓
        </Heading>
        <Text fontSize={'xl'} color={'gray.500'}>
        It looks like that you've entered a URL that doesn't exist.
        </Text>
      </Box>
    </Flex>
  );
}
