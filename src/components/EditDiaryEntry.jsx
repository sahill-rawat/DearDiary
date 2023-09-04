import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Textarea, Button, VStack, Flex } from "@chakra-ui/react";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import ColorModeSwitcher from "../ColorModeSwitcher";

const EditDiaryEntry = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();
  const { entries, updateDiaryEntry, deleteDiaryEntry, fetchDiaryEntries } =
    useStore();
  const [content, setContent] = useState("");
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const fetchedEntries = await fetchDiaryEntries(currentUser.uid);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching diary entries");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (entries.length === 0) {
      fetchEntries();
    } else {
      const entry = entries.find((item) => item.id === entryId);
      if (entry) {
        setContent(entry.diaryEntry);
      }
    }
  }, [currentUser.uid, entryId, entries]);

  const handleSaveClick = () => {
    const updatedData = {
      diaryEntry: content,
    };

    updateDiaryEntry(currentUser.uid, entryId, updatedData);
    navigate(`/read/${entryId}`);
    toast.success("Updated!");
  };

  return loading ? (
    <Loader />
  ) : (
    <VStack
      minH="100vh"
      p="10vh"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <ColorModeSwitcher />
      <MetaData title={"Edit"} />
      <Textarea
        h="55vh"
        w="80vw"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit your diary entry..."
        resize="vertical"
        mb="3vh"
      />
      <Flex justifyContent="space-between" w="90vw">
        <Link to={`/read/${entryId}`}>
          <Button>Cancel</Button>
        </Link>
        <Button colorScheme="green" onClick={handleSaveClick}>
          Save
        </Button>
        <Link
          to="/diary"
          onClick={() => deleteDiaryEntry(currentUser.uid, entryId)}
        >
          <Button color="white" bg="red.500">
            Delete Entry
          </Button>
        </Link>
      </Flex>
    </VStack>
  );
};

export default EditDiaryEntry;
