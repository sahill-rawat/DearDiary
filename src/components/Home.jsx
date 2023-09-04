import React, { useEffect } from 'react';
import { Box, Button, VStack, Text, Heading } from "@chakra-ui/react";
import bg from '../images/back.jpg';
import MetaData from './Metadata';
import { Link } from 'react-router-dom';
import { useStore } from '../Store';
import { useAuth } from '../Auth';

const Home = () => {

  const {currentUser} = useAuth();
  const {fetchDiaryEntries} = useStore();
  
  useEffect(()=> {
    window.scrollTo(0, 0);
    if (currentUser) {
      fetchDiaryEntries(currentUser.uid);
    }
    
  });
  return (
    <Box h='100vh' w="100vw">
      <MetaData title='DearDiary' />
        <VStack
          h="100vh"
          bgImage={bg}
          bgRepeat="no-repeat"
          bgColor="#030104"
          bgPosition="center"
          objectFit="contain"
          textAlign="center"
          justify="center"
          backgroundSize="cover"
        >
          <Box color={"black"}>
            <Heading fontSize={"6xl"}> Dear Diary </Heading>
            <Text fontSize="2xl">Write Anywhere. Read Anytime.</Text>
        
            <VStack mt='5vh'>
            <Link to={currentUser ? '/diary' : '/signup'}>
              <Button
                variant={"solid"}
                color="white"
                bgColor="black"
                p="4vmin"
              >
                Get Started
              </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
    </Box>
  )
}

export default Home