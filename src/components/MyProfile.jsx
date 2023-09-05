import {
  HStack,
  Button,
  Container,
  Heading,
  VStack,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "./Metadata";
import { useAuth } from "../Auth";
import bg from "../images/profile.png";

const MyProfile = () => {
  const { currentUser } = useAuth();
  useEffect(() => window.scrollTo(0, 0));

  return (
    <VStack
      w="100vw"
      h={"100vh"}
      p={"16"}
      bg="#F1E4BA"
      bgImage={bg}
      bgRepeat="no-repeat"
      bgColor="#030104"
      bgPosition="center"
      objectFit="contain"
      textAlign="center"
      backgroundSize="cover"
      spacing='5'
    >
      <MetaData title="Profile" />
      <Box w="100vw" p="3" bg="RGB(63, 41, 7)">
        <Heading color="#EBC11B" alignSelf={"center"}>
          DearDiary
        </Heading>
      </Box>
      <Box w="100vw" p="3" bg="RGB(63, 41, 7)">
        <Heading
          color="#EBC11B"
          alignSelf={"center"}
        >{`Hello, ${currentUser.displayName}`}</Heading>
      </Box>
      <Link to="/diary">
        <Button mt='5' bg="#EBC11B" color="RGB(63, 41, 7)">
          My Diary
        </Button>
      </Link>
    </VStack>
  );
};

export default MyProfile;
