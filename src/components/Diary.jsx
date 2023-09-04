import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  VStack,
  Text, 
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";

const Diary = () => {

  const [entries, setEntries] = useState([]);
  const { fetchDiaryEntries } = useStore([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await fetchDiaryEntries(currentUser.uid);
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    if (entries.length === 0) fetchEntries();
  }, [currentUser.uid, fetchDiaryEntries]);

  return (
    <HStack
      align={"flex-start"}
      pt="10vh"
      minH="100vh"
      w="100vw"
      bg="#F1E4BA"
      spacing={0}
    >
      <MetaData title="Diary" />

      <Grid
        ml='10vw'
        w="70%"
        templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(6, 1fr)"]}
        gap="20px"
      >
        {entries.map((entry, index) => (
          <Link to={`/read/${entry.id}`} key={entry.id}>
            <Box bg="#FBCD44" borderRadius="5" textAlign="center" p="1">
              <Text fontWeight="bold" color={"black"}>
                {entry.title}
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
