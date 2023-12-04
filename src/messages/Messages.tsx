import { useSelector } from "react-redux"
import { RootState } from "../model/common"
import { Box, Heading } from "@chakra-ui/react"

const Messages = () => {

  const session = useSelector((state: RootState) =>state.session.session)
  return (
    <Box>
      <Heading>Welcome {session ? session.username : ""} to UBO relay chat</Heading>
      <div>Messages</div>
      <div>{sessionStorage.getItem("session")}</div>
    </Box>
  )
}

export default Messages
