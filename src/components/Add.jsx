import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Textarea, Button, VStack, Flex } from "@chakra-ui/react";
import MetaData from "./Metadata";
import { useStore } from "../Store";
import { useAuth } from "../Auth";
import { toast } from "react-hot-toast";

const Add = () => {
  const navigate = useNavigate();
  const { storeDiaryEntry } = useStore();
  const { currentUser } = useAuth();

  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const title =
    date.getDate().toString() +
    (date.getDate() === 1
      ? "st "
      : date.getDate() === 2
      ? "nd "
      : date.getDate() === 3
      ? "rd "
      : "th ") +
    monthNames[date.getMonth()] +
    ", " +
    date.getFullYear().toString();
  const [content, setContent] = useState("");

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (content.trim()) {
    storeDiaryEntry(currentUser.uid, title, content)
      .then(() => {
        navigate("/diary");
        toast.success("Entry Saved Successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
    else    navigate("/diary");
  };

  return (
    <VStack
      minH="100vh"
      pt="10vh"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <MetaData title={"Edit"} />

      <Flex justifyContent="space-between" w="95vw">
        <Link to={`/diary`}>
          <Button>Cancel</Button>{" "}
        </Link>
        <Heading>{title}</Heading>
        <Button colorScheme="green" onClick={handleSaveClick}>
          Save
        </Button>
      </Flex>
      <Textarea
        h="65vh"
        w="80vw"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit your diary entry..."
        resize="vertical"
        mb="3vh"
      />
    </VStack>
  );
};

export default Add;
