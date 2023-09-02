import {
    Avatar,
    Button,
    Container,
    Heading,
    Input,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import MetaData from './Metadata';
  import { useAuth } from '../Auth';
import { toast } from "react-hot-toast";


  const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {signUp, currentUser} = useAuth();

  
    const handleRegister = (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      signUp(email, password)
        .then(() => {
          console.log(currentUser);
          navigate("/diary");
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
 
    useEffect(() => {
      window.scrollTo(0, 0);
      
    }, []);
  
    return (
      <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
        <MetaData title='Signup'/>
        <form>
          <VStack
            alignItems={"stretch"}
            spacing={"8"}
            w={["full", "96"]}
            m={"auto"}
          >
            <Heading alignSelf={"center"}>DearDiary</Heading>
            <Avatar alignSelf={"center"} boxSize={"32"} />
  
            <VStack>
              <Input
                placeholder={"Name"}
                type={"text"}
                required
                focusBorderColor={"purple.500"}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder={"Email"}
                type={"email"}
                required
                focusBorderColor={"purple.500"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder={"Password"}
                type={"password"}
                required
                focusBorderColor={"purple.500"}
                onChange={(e) => setPassword(e.target.value)}
              />
  
              <Button
                bg='#FBCD44'
                type={"submit"}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </VStack>
  
            <Text textAlign={"right"}>
              Already Signed Up?{" "}
              <Button variant={"link"} color='#FBCD44'>
                <Link to={"/login"}>Log In</Link>
              </Button>
            </Text>
          </VStack>
        </form>
      </Container>
    );
  };
  
  export default Signup;