import { Box, Heading, Spinner, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { listUsers } from "./usersApi";
import { RootState, RootUsersState, UserPublic, UsersState } from "../model/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SET_USERS } from "../redux";

const UserList = () => {
  const {id_receiver} = useParams();
  const [users, setUsers] = useState<UserPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSelector((state: RootState)=> state.session.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const receiver_id = (id == null || id == undefined ? 0 : id) as number;

  useEffect(() => {
    console.log(id_receiver)
    const fetchUsers = async () => {
      try {
        const usersData = await listUsers();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      } finally {
        setLoading(false); // Met fin au chargement, que ce soit réussi ou non
      }
    };

    fetchUsers();
  }, []);


  const handleUserClick = (userId: number) => {
    // Vous pouvez ajouter le comportement que vous souhaitez lorsqu'un utilisateur est cliqué
    navigate(`/messages/user/${userId}`);
  };

  return (
    <Box mt={8}  width="390px">
      {loading ? (
        // Afficher un Spinner pendant le chargement
        <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box>
          <Heading
            fontSize="2xl"
            mb="4"
            padding="4"
            color="teal.500"
            borderBottom="1px solid teal"
          >
            Utilisateurs
          </Heading>
          <ul>
            {users.map((user) =>
            user.user_id!==session.id
            &&(

              <Box
                key={user.user_id}
                onClick={() => handleUserClick(user.user_id)}

                backgroundColor={ user.user_id == receiver_id ? "gray.300" : "gray.100"}
                p="3"
                mb="2"
                borderRadius="5px"
                cursor="pointer"
                _hover={{ backgroundColor: "blue.100" }}
              >
                <Text fontSize="lg" fontWeight="bold" color="blue.500">
                  {user.username}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user.last_login}
                </Text>
              </Box>
            ))}
          </ul>
          {/* <Heading
            fontSize="2xl"
            mb="4"
            padding="4"
            color="teal.500"
            borderBottom="1px solid teal"
          >
            Salons
          </Heading> */}
        </Box>
      )}
    </Box>
  );
};

export default UserList;
