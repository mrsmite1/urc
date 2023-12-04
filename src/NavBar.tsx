import React from 'react';
import { Flex, Box, Spacer, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { CLEAR_SESSION } from './redux';
import { RootState } from './model/common';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = () => {
  const session = useSelector((state: RootState)=> state.session.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = ()=>{
    dispatch(CLEAR_SESSION());
    console.log("Déconnexion !");
    navigate("/login");
  }


  return (
    <Flex p={4} bg="teal.500" color="white" align="center">
      <Box>
        <Text fontSize="xl">UBO Relay Chat</Text>
      </Box>
      <Spacer />
      <Box>
        {session.token ? (
          <>
            <Link onClick={onLogout} color="white" mr={4}>
              Déconnexion
            </Link>
            {/* Lien de déconnexion */}
          </>
        ) : (
          <Link as={RouterLink} to="/login" color="white" mr={4}>
            Connexion
          </Link>
          // {/* Lien de connexion */}
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
