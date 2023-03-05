import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Spacer,
  HStack,
} from '@chakra-ui/react';


import { BiHomeAlt } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';
import MyIcon from './MyIcon';
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  return (
    <Box>
      <div
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
          // background: '#B0C4DE',
          // borderTopLeftRadius: '2em',
          // borderTopRightRadius: '2em',
          background: 'linear-gradient(to bottom , transparent, #f7fafc)',
        }}
      >
        <DesktopNav active={props.active}/>
      </div>
    </Box>
  );
}

const DesktopNav = (props) => {
  const navigate = useNavigate();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  return (
    <Flex
      justify={'space-between'}
      mx={{ base: '5vw', md: '10vw', lg: '20vw' }}
    >
      <Box py="0.5em">
        <Link
        onClick={ async => {navigate('/demand')}}>
          <MyIcon as={BiHomeAlt} color={props.active === 1 ? 'blue.600' : 'gray.600'} />
        </Link>
      </Box>
      <Box py="0.5em">
        <Link
        onClick={ async => {navigate('/favor-request')}}>
          <MyIcon as={BiPlus} color={props.active === 2 ? 'blue.600' : 'gray.600'} />
        </Link>
      </Box>
      <Box py="0.5em">
        <Link
        onClick={ async => {navigate('/user-profile')}}>
          <MyIcon as={BiUser} color={props.active === 3 ? 'blue.600' : 'gray.600'} />
        </Link>
      </Box>
    </Flex>
  );
};

const NAV_ITEMS = [
  {
    label: 'Inspiration',
  },
  {
    label: 'Find Work',
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];
