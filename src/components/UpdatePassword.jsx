import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  VStack,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import MetaData from "./Metadata";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";

const UpdatePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      changePassword(currPassword, newPassword);
      navigate("/account");
    } else toast.error("Password does not match!");
  };

  useEffect(() => window.scrollTo(0, 0));
  return (
    <>
      <MetaData title={"Update Password"} />
      <Container maxW={"container.xl"} h={"100vh"} p={"16"} bg="#F1E4BA">
        <form>
          <VStack
            alignItems={"stretch"}
            spacing={"8"}
            w={["full", "96"]}
            m={"auto"}
          >
            <Heading alignSelf={"center"}>Update Password</Heading>
            <Avatar alignSelf={"center"} boxSize={"32"} />

            <VStack>
            <Input
                placeholder={"Current Password"}
                type={"password"}
                required
                value={currPassword}
                focusBorderColor="#FBCD44"
                onChange={(e) => setCurrPassword(e.target.value)}
              />
              <Input
                placeholder={"New Password"}
                type={"password"}
                required
                value={newPassword}
                focusBorderColor="#FBCD44"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                placeholder={"Password"}
                type={"password"}
                required
                value={confirmPassword}
                focusBorderColor="#FBCD44"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                bg="#FBCD44"
                type={"submit"}
                onClick={updatePasswordSubmit}
              >
                Update
              </Button>
            </VStack>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default UpdatePassword;
