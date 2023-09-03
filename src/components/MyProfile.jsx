import {
    Avatar,
    Button,
    Container,
    Heading,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  import { Link } from "react-router-dom";
  import MetaData from './Metadata';
  import { useAuth } from '../Auth';

const MyProfile = () => {

    const {currentUser} = useAuth();

  return (
    <Container maxW={"container.xl"} h={"100vh"} p={"16"} bg="#F1E4BA">
        <MetaData title='Profile'/>
        <form>
          <VStack
            alignItems={"stretch"}
            spacing={"8"}
            w={["full", "96"]}
            m={"auto"}
          >
            <Heading alignSelf={"center"}>DearDiary</Heading>
            <Avatar alignSelf={"center"} boxSize={"32"} />
            <Heading alignSelf={"center"}>{currentUser.displayName}</Heading>
            <VStack justify={'center'}>
                <Link to='/password'><Button bg='#FBCD44'>Change Password</Button></Link>
            </VStack>
          </VStack>
        </form>
      </Container>
  )
}

export default MyProfile