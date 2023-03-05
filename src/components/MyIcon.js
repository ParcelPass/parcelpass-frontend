import {
Icon
} from '@chakra-ui/react';

import { BiHomeAlt } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';

export default function MyIcon(props) {
  return (
    <Icon as={props.as} w={10} h={10} color={props.color}/>
  );}