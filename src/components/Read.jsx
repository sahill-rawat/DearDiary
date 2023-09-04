import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heading, Text, Button, VStack, Flex, HStack } from "@chakra-ui/react";
import { AiFillDelete, AiOutlineRollback, AiTwotoneEdit } from "react-icons/ai";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import ColorModeSwitcher from "../ColorModeSwitcher";

const Read = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();
  const {
    entries,
    deleteDiaryEntry,
    fetchDiaryEntries,
  } = useStore();
  const [entry, setEntry] = useState('');
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const fetchedEntries = await fetchDiaryEntries(currentUser.uid);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching diary entries');
    }
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (entries.length === 0) {
      fetchEntries();
    } else {
      const entry = entries.find((item) => item.id === entryId);
      if (entry) {
        setEntry(entry);
      }
    }
  }, [currentUser.uid, entryId, entries]);

  const handleEditClick = () => {
    navigate(`/edit/${entryId}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <VStack p="15vmin" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <ColorModeSwitcher/>
      <MetaData title={entry.title} />
      <Flex
        h="10vh"
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
        mb="2vh"
      >
        <Heading size="lg" mb={4}>
          {entry.title}
        </Heading>
        <HStack>
          <Link to="/diary" mt={2} display="block">
            <Button bg="#FBCD44">
              <AiOutlineRollback />
            </Button>
          </Link>
          <Button bg="#FBCD44" variant="solid" onClick={handleEditClick}>
            <AiTwotoneEdit />
          </Button>
          <Link
            to="/diary"
            onClick={() => deleteDiaryEntry(currentUser.uid, entryId)}
          >
            {" "}
            <Button color="white" bg="red.500">
              {" "}
              <AiFillDelete />{" "}
            </Button>
          </Link>
        </HStack>
      </Flex>

      <Text mt="5vh" fontWeight="medium" minH="68vh" alignSelf="flex-start">
        {entry.diaryEntry}
      </Text>
    </VStack>
  );
};

export default Read;
