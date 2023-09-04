import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import React from "react";

const Loader = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/diary');
  }
  return (
    <VStack h='100vh' justify={'center'} >
      {/* <Button pos='fixed' bg="#FBCD44" onClick={handleClick}>
        <AiOutlineRollback />
      </Button> */}
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"} />
      </Box>
    </VStack>
  );
};

export default Loader;
