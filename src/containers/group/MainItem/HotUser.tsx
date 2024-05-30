import { useGetUser } from "@/apis";
import { PageRoutes } from "@/constants";
import { UserCard } from "@/containers";
import { User } from "@/types";
import { toUrl } from "@/utils";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";

const HotUser = () => {
  const router = useRouter();
  const { data: user1 } = useGetUser(53);
  const { data: user2 } = useGetUser(104);
  const { colorMode } = useColorMode();

  const concatData = [user1, user2].filter(Boolean) as User[];

  return (
    <Flex gap={8} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>화제의 사람들 </Heading>
      </Flex>

      <Skeleton isLoaded={!!concatData.length} minH={540}>
        <Flex gap={6} direction={"column"}>
          {concatData.map((user, index) => {
            return (
              <Box
                key={`usercard_${index}`}
                p={2}
                bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
                borderRadius={16}
                onClick={() => {
                  router.push(toUrl(PageRoutes.User, { id: user.id }));
                }}
                _hover={{
                  cursor: "pointer",
                }}
              >
                <UserCard data={user} />
              </Box>
            );
          })}
        </Flex>
      </Skeleton>
    </Flex>
  );
};

export default HotUser;
