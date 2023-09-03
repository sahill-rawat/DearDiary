import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Flex, HStack } from "@chakra-ui/react";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";

const Read = () => {

  const navigate = useNavigate();
  const { entryId } = useParams();
  const  {currentUser} =  useAuth();
  const { entries, deleteDiaryEntry } = useStore([]);
  const entry = entries.find((item)=> item.id === entryId);

  const handleEditClick = () => {
    navigate(`/edit/${entryId}`);
  };

  return (
    <VStack p="15vmin" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <MetaData title={entry.title}/>
      <Flex
        h="10vh"
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
        mb='2vh'
      >
        <Heading size='lg' mb={2}>
          {entry.title}
        </Heading>
        <HStack>
          <Link to="/diary" mt={2} display="block">
            <Button bg="#FBCD44">Back</Button>
          </Link>
          <Button bg="#FBCD44" variant="solid" onClick={handleEditClick}>
            Edit
          </Button>
          <Link to="/diary" onClick={()=>deleteDiaryEntry(currentUser.uid, entryId)} > <Button color='white' bg="red.500"> Delete Entry</Button></Link>
        </HStack >
      </Flex>

      <Text minH="68vh" alignSelf="flex-start">
        {entry.diaryEntry}
      </Text>
    </VStack>
  );
};

export default Read;
