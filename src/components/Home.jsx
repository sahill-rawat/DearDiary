import React from 'react';
import { Box, Button, Input, VStack, Text, Heading } from "@chakra-ui/react";
import bg from '../images/back.jpg';
import MetaData from './Metadata';

const Home = () => {
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
        
            <VStack>
              <Input
                bg={"white"}
                w="70vw"
                color="black"
                m="4vmin"
                type="text"
                placeholder="Email address..."
              />
              <Button
                variant={"solid"}
                color="white"
                bgColor="black"
                p="4vmin"
              >
                Get Started
              </Button>
            </VStack>
          </Box>
        </VStack>
    </Box>
  )
}

export default Home