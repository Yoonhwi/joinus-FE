import { Box } from "@chakra-ui/react";
import { createData } from "../../../createData";
import { useEffect } from "react";
const Admin = () => {
  useEffect(() => {
    const fetchData = async () => {
      await createData();
    };
    fetchData();
  }, []);

  return <Box>Admin Page</Box>;
};

export default Admin;
