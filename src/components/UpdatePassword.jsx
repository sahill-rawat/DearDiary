import React, { useState } from 'react';
import { Container, Avatar, VStack, Heading, Input, Button } from "@chakra-ui/react";
import MetaData from './Metadata';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';

const UpdatePassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {changePassword} = useAuth();
    const navigate = useNavigate();
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            changePassword(newPassword);
            navigate('/account');
        }
        else    toast.error('Password does not match!');
    };
    return (
        <>
          <MetaData title={"Update Password"}  />
            <Container maxW={"container.xl"} h={"100vh"} p={"16"} bg="#F1E4BA">
              <form>
                <VStack
                  alignItems={"stretch"}
                  spacing={"8"}
                  w={["full", "96"]}
                  m={"auto"}
                >
                  <Heading alignSelf={"center"}>Update Profile</Heading>
                  <Avatar alignSelf={"center"} boxSize={"32"} />
    
                  <VStack>
                    <Input
                      placeholder={"New Password"}
                      type={"password"}
                      required
                      value={newPassword}
                      focusBorderColor='#FBCD44'
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      placeholder={"Password"}
                      type={"password"}
                      required
                      value={confirmPassword}
                      focusBorderColor='#FBCD44'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
    
                    <Button
                      bg='#FBCD44'
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

export default UpdatePassword