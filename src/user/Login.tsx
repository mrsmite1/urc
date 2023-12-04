import {useState} from "react";
import {loginUser} from "./loginApi";
import {RootState, Session} from "../model/common";
import {CustomError} from "../model/CustomError";
import {
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Link,
  } from '@chakra-ui/react';
  import { Link as RouterLink, useNavigate  } from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux"
import { SET_SESSION } from "../redux";

export function Login() {

    const [error, setError] = useState({} as CustomError);
    const session = useSelector((state: RootState) => state.session.session || null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        loginUser({user_id: -1, username:  data.get('login') as string, password: data.get('password') as string},
            (result: Session) => {
                dispatch(SET_SESSION(result));
                sessionStorage.setItem('session',JSON.stringify(result));
                console.log(session);
                form.reset();
                setError(new CustomError(""));
                navigate('/messages');
            }, (loginError: CustomError) => {
                console.log(loginError);
                setError(loginError);
                dispatch(SET_SESSION({} as Session));
            });
    };

    return (
        <Box p={4} maxW="xl" mx="auto" width="30%" mt="5em">
            <Heading mb={4} textAlign="center" size="lg">
                Connexion
            </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Login</FormLabel>
              <Input name="login" placeholder="Enter your login" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" placeholder="Enter your password" />
            </FormControl>
            <Button type="submit" width="100%" colorScheme="teal">
              Connexion
            </Button>
          </form>

          {session.token && (
            <Box mt={4}>
              <span>
                {session.username} : {session.token}
              </span>
            </Box>
          )}

        {error.message && (
            <Box mt={4} color="red.500">
                <span>{error.message}</span>
            </Box>
        )}
            <Box mt={4} textAlign="center">
                <span>Vous n&apos;avez pas encore de compte ?</span>{' '}
                <Link as={RouterLink} to="/signup" color="teal.500">
                Créer un compte
                </Link>
            </Box>
        </Box>
      );
}
