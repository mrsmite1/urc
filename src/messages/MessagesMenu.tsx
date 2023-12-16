import { useSelector } from "react-redux"
import { RootState } from "../model/common"
import UsersList from "./UsersList"
import Chat from "./Chat"
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
const MessagesMenu = () => {

  const session = useSelector((state: RootState) =>state.session.session)
  const {id} = useParams();

  return (
    <Box ml='100' mt='0'>
      <Box><UsersList/><Chat/></Box>

    </Box>
  )
}

export default MessagesMenu
