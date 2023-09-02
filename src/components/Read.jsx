import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Flex, HStack } from "@chakra-ui/react";
import MetaData from "./Metadata";

const Read = () => {
  const navigate = useNavigate();
  const { entryId } = useParams(); // Assuming you have a route parameter for entryId

  const diaryEntry = {
    id: entryId,
    date: "January 26th, 2023",
    content: "This is the content of my diary entry...",
  };

  const handleEditClick = () => {
    navigate(`/edit`);
  };

  return (
    <VStack p="15vmin" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <MetaData title={diaryEntry.date}/>
      <Flex
        h="10vh"
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
        mb='2vh'
      >
        <Heading size='lg' mb={2}>
          {diaryEntry.date}
        </Heading>
        <HStack>
          <Link to="/diary" mt={2} display="block">
            <Button bg="#FBCD44">Back</Button>
          </Link>
          <Button bg="#FBCD44" variant="solid" onClick={handleEditClick}>
            Edit
          </Button>
        </HStack >
      </Flex>

      <Text minH="68vh" alignSelf="flex-start">
        {diaryEntry.content}
      </Text>
    </VStack>
  );
};

export default Read;
