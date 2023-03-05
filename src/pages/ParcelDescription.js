import React from 'react';
import {
  Button,
  Image,
  Flex,
  Box,
  Text,
  Icon,
  Link,
  Container,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import packageImg from '../assets/parcel.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { RiHandCoinFill } from 'react-icons/ri';

const moment = require('moment');
const TRANSPORT_URL = process.env.REACT_APP_URL + '/transports';
const UPDATE_PARCEL_URL = process.env.REACT_APP_URL + '/parcels/updateStatus';

// const Map = () => (
//   <iframe 
//     src="https://www.google.com/maps/embed/v1/directions?origin=New+York+City&destination=Washington,+DC" 
//     width="600" 
//     height="450" 
//     frameborder="0" 
//     style={{border: 0}} 
//     allowfullscreen=""
//     aria-hidden="false"
//     title="Google Maps Route"
//     tabindex="0"
//   >
//   </iframe>
// );


function ParcelDescription() {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const [_id, set_id] = useState('');
  const [userId, setUserId] = useState('');
  const [assigned, setAssigned] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tip, setTip] = useState('');
  const [content, setContent] = useState('');
  const [urgency, setUrgency] = useState('Low');
  useEffect(() => {
    if (location.state !== null) {
      console.log(location.state);
      let parcelDetails = location.state.favorDetails;
      console.log(parcelDetails);
      setTo(parcelDetails.startLocation);
      setFrom(parcelDetails.endLocation);
      setContent(parcelDetails.content);
      setUserId(parcelDetails.userId);
      set_id(parcelDetails._id);
      setAssigned(parcelDetails.assigned);
      loadMap();
    } else {
      navigate('/demand');
    }
  }, []);

  function loadMap() {
    // Replace YOUR_API_KEY with your actual Google Maps API key
const API_KEY = "AIzaSyAAu-KAy4W3va28uKjq7yOJnwObG_a2sBI";

// Define the map variable
let map;

const coordinates = {
    start: { lat: 39.120715, lng: -108.530290 },
    from: { lat: 40.907141, lng: -114.305150 },
    to: { lat: 41.025714, lng: -117.588148 },
    end: { lat: 37.7749, lng: -122.4194 },
};

// Define the function to initialize the map
// function initMap() {
//     // Use the Directions API to get the route string
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const routeString = "ixtfEz_bjUkeFbhFuiHdpAalHpuC{fI_fAarTpcGutZl{Lat[zdXykPd{V{gJt|G}eDx}Fe}H_m@}cJdZkaFvrFebP|eLm|IfrOkjMfpM_zI`_S{oLblMmzJ`vLmiAjyEszGv@y{L~vJmpI~zJkvGbpO{~JhtJutK`cN{wOdkIkiN||FkwIdzIgjIpzFo_MbcHatHhIagC~|DalAvuGk{Gcj@yeFzhEuhNlfFebNncGm_^pq`@qmZjs^ibh@|vt@_eg@ry_@m`s@ncp@}xPx}Wa|_@xkWif_@lzZor`@vbf@}`n@tla@i}h@nig@gdTlrN_fOviDc{a@p_MecWt{YcxCjeEo_Gzp@}nQfBkoI}eEq~JseDw_LlSccHzoF_mMpbFobUr_Fo_Vz~HiqQlkCsiZ`rG_{Lu^mkEoj@ovGpjCc_DzrB{CbfHmL`nI}@|jK}hCliI{`L``OesKlgLgmQfrO{_QnoJuwYnkOctRxaG_`LbmAwj]~FsmHbuB_uJ_ZoiV{\a}S{b@wos@vfBswQn]giHfdEg`NxcDuwT|Gu_SfbK{~U~`DgrPk~Fe~JidBujK`_CuqIb}HqhHlpIs~IigDenK_nHgoPmbL{}Ig}Bw_Dm}@spExkBucOvmMmzK~|D}x@rxF{nDtvB_~LxdEcjIjyCorLpiHskFdhPopFyVkdD}{DucCkdCwuD_WgmIuu@}nJjTwpMdbFkbIuf@yyIjYurUnpRykIvlQerKhoLgfHz}EmgEriOuqBzzMzcCl_NowCfuExfAh~Gm|DzlOcrC|cG{`EltA}~LroA{ySdvA}dDyvCovC~U_}Ca|Cc|@uiGo|BucGsyC~FmtKczBmnItkGknDd~G_aEsc@_lDkyC{vErzEk_DlzD_mIqBgmQaPqsPmaBkvEirBepH|n@c`JkoAg_Ebr@{`FywC}gMa_MqwJm~DqwDiYwtCdjBskFkdLqjDa}Py}OgoGkjSqLw`EnXmqExfCqjPtcAecUzkAotp@dDuh[jC_jRqy@kmVk~FkcFeyBalIyLkaJdq@apNodHszRafSqmT{hNgl[__DivCemG}fDczCeaJ`MmwFhKm|Gm}Au`Q_~@wkXlpHmdS|pQemP`cKavUrgG_mSabAsjJnuBuhLy_AelUcwCimLve@ckEfsDmfGvyJ{dEmFqpOftCy_Gpo@{lD_gBmqQ{iGe~QutHglEqiWqnKufk@{kKytNmjEvD_pBa{Nk_Cq|I}gJc}DmhOgTkdKydDsoDzBarClfCidK~`EkjDjqA"; // Replace with the actual route string from the Directions API

//     // Set the map options
//     const mapOptions = {
//         zoom: 10,
//         center: { lat: 37.7749, lng: -122.4194 }, // Set the default center to San Francisco
//     };

//     // Create the map object
//     map = new google.maps.Map(document.getElementById("map"), mapOptions);

//     addMarker(coordinates.start, '', map);
//     addMarker(coordinates.from, 'A', map);
//     addMarker(coordinates.to, 'B', map);
//     addMarker(coordinates.end, '', map);

//     function addMarker(location, label, map) {
//         new google.maps.Marker({
//             position: location,
//             label: label,
//             map: map,
//         });
//     }

//     // Set the directions renderer options
//     directionsRenderer.setMap(map);
//     directionsRenderer.setOptions({ suppressMarkers: true });

//     // Use the route string to get the directions and display them on the map
//     directionsService.route(
//         {
//             origin: "San Francisco, CA",
//             destination: "San Francisco, CA",
//             travelMode: google.maps.TravelMode.DRIVING,
//             waypoints: [{ location: routeString }],
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//             } else {
//                 window.alert("Directions request failed due to " + status);
//             }
//         }
//     );
// }

// Load the Google Maps API
function loadScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    document.head.appendChild(script);
}


loadScript();
  }

  async function acceptFavor() {
    try {
      const response = await axios.post(
        TRANSPORT_URL,
        {
          params: { clientId: userId, parcelId: _id},
          headers: { 'auth-token': localStorage.getItem('auth-token') },
        }
      );
      console.log(response.data);
      updateFavor();
    } catch (err) {
      console.error(err.response);
    }
  }

  async function updateFavor() {
    try {
      const response = await axios.get(UPDATE_PARCEL_URL, {
        params: { assigned: true, parcelId: _id},
        headers: { 'auth-token': localStorage.getItem('auth-token') },
      });
      console.log(response.data);
      toast({
        position: 'top',
        title: 'Favor Started!',
        description: 'You have successfully started the favor.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/demand');
    } catch (err) {
      console.error(err.response);
    }
  }

  const handleButtonClick = () => {
    window.location.href = 'https://www.google.com/maps/dir/New+York+City/Washington,+DC/';
  };
  
  return (
    <Box>
      <Flex
        mx={'auto'}
        flex="1"
        minH={'100vh'}
        justifyContent="center"
        direction={'column'}
        px="2rem"
        py="1rem"
        maxW={{ lg: '4xl' }}
      >
        <Image
          src={packageImg}
          rounded={'full'}
          w="12rem"
          mx="auto"
          my="0"
        ></Image>
        <Text
          fontSize={{ base: '2xl', lg: '3xl' }}
          m="0.7rem"
          textAlign={'center'}
          fontWeight="black"
          px="1rem"
        >
          {"To: " + to}
        </Text>
        <Text
          fontSize={{ base: '2xl', lg: '3xl' }}
          m="0.7rem"
          textAlign={'center'}
          fontWeight="black"
          px="1rem"
        >
          {"From: " + from}
        </Text>
        <Container w='90%' h='200' centerContent><Map route="Los Angeles, CA" /></Container>

        <Text fontSize="1.2rem" fontWeight="black" mt="1rem">
          Package Contents: 
        </Text>
        <Text color="gray.500">{content}</Text>

        <Button
          mt="1.5rem"
          mb="2rem"
          p="2rem"
          rounded={'2xl'}
          background="blue.500"
          color={'white'}
          onClick={handleButtonClick}
        >
          <Link>Accept Order</Link>
        </Button>
      </Flex>
      {/* <Box mt="3em"> */}
      <Navbar active={1} />
      {/* </Box> */}
    </Box>
  );
}

export default ParcelDescription;
