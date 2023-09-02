import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  VStack,
  Text,
  Flex,
  HStack,
  useBreakpointValue, // Import useBreakpointValue hook
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";
import { VscAdd } from "react-icons/vsc";

const Diary = () => {
    const dates = [
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
        "January 26th, 2023",
      ];
  const { getEntries, entries } = useStore([]);
  const { currentUser } = useAuth();
  const isSmallScreen = useBreakpointValue({ base: true, sm: false }); // Detect screen size

  useEffect(() => {
    // getEntries(currentUser).then(()=>{
    //     console.log(entries);
    // })
  }, []);

  return (
    <HStack
      align={"flex-start"}
      justify="center"
      pt="10vh"
      minH="100vh"
      w="100vw"
      bg="#F1E4BA"
      spacing={0} // Add spacing
    >
      <MetaData title="Diary" />

      <Grid
        maxW="70%"
        templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(6, 1fr)"]}
        gap="20px"
      >
        {dates.map((date) => (
          <Link to="/read" key={date}>
            <Box bg="#FBCD44" borderRadius="5" textAlign="center" p="1">
              <Text fontWeight="bold" color={"black"}>
                {date}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
      <VStack
        pos={"fixed"}
        top={16}
        right={4}
        ml="5"
        w="10%"
        justify="center"
      >
        <Link to="/add">
          <Button
            h="10"
            w="10"
            p="0"
            borderRadius={"full"}
            bg="#FBCD44"
            zIndex="100"
          >
            <VscAdd />
          </Button>
        </Link>
      </VStack>
    </HStack>
  );
};

export default Diary;
