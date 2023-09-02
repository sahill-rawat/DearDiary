import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Heading, Textarea, Button, VStack, Flex } from '@chakra-ui/react';
import MetaData from './Metadata';

const EditDiaryEntry = () => {
  const navigate = useNavigate();
  const { entryId } = useParams(); // Assuming you have a route parameter for entryId

  // Sample diary entry content
  const initialContent = 'This is the content of my diary entry...';
  const [content, setContent] = useState(initialContent);

  const handleSaveClick = () => {
    console.log('Edited Content:', content);
    navigate(`/read/${entryId}`);
  };

  return (
    <VStack minH='100vh' p='10vh' borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <MetaData title={'Edit'} />
      <Textarea
        h='55vh'
        w='80vw'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit your diary entry..."
        resize="vertical"
        mb='3vh'
      />
      <Flex justifyContent="space-between" w="90vw">
        <Link to={`/read/${entryId}`}><Button>Cancel</Button> </Link>
        <Button colorScheme='green' onClick={handleSaveClick}>
        Save
      </Button>
        <Link to="/diary"> <Button color='white' bg="red.500"> Delete Entry</Button></Link>
      </Flex>
    </VStack>
  );
};

export default EditDiaryEntry;
