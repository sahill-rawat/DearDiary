import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { useAuth } from '../Auth';

const Header = () => {

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout().then(()=>{
      navigate('/');
    })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Button
        p="0"
        w="10"
        h="10"
        borderRadius={"full"}
        position={"fixed"}
        top={4}
        left={4}
        bg='#FBCD44'
        onClick={onOpen}
        zIndex="100"
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      <Drawer zIndex="1000" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color='#FBCD44' bg='white'>DearDiary</DrawerHeader>
          <DrawerBody bg='white'>
            
          {currentUser ? (
              <HStack
                width={"full"}
                justifyContent="space-between"
              >
                <Link to={"/logout"}>
                <Button
                  onClick={() => {
                    onClose();
                    handleLogout();
                    navigate("/");
                    toast.success("LoggedOut Successfully!");
                  }}
                  bg='#FBCD44'
                >
                  Logout
                </Button>
                </Link>

                <Link to={"/account"}>
                <Button
                  onClick={onClose}
                  bg='#FBCD44'
                  variant={"outline"}
                >
                  My Profile
                </Button>
                </Link>

              </HStack>
            ) : (
              <HStack
                width={"full"}
                justifyContent="space-between"
              >
                <Link to={"/login"}>
                  <Button onClick={onClose} bg='#FBCD44'>
                    Login
                  </Button>
                </Link>

                <Link to={"/signup"}>
                  <Button
                    onClick={onClose}
                    bg='#FBCD44'
                    variant={"outline"}
                  >
                    SignUp
                  </Button>
                </Link>
              </HStack>
            )}
            <VStack mt='5vh' alignItems='flex-start'>
              <Link to={"/"}>
                <Button
                  as="button"
                  onClick={onClose}
                  variant={"ghost"}
                  bg='#FBCD44'
                >
                  Home
                </Button>
              </Link>
              {
                currentUser && (
                <Link to={"/diary"}>
                <Button
                  onClick={onClose}
                  variant={"ghost"}
                  bg='#FBCD44'
                >
                  My Diary
                </Button>
              </Link>
              
                )
              }
              
            </VStack>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;