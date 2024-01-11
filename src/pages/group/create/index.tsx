import { DefaultLayout } from "@/components";
import { SetGroup, SetGroupOptions } from "@/containers";
import { Group, GroupOptions } from "@/types/group";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { color } from "framer-motion";
import Head from "next/head";
import { useState } from "react";

const CreateGroup = () => {
  const initialGroupState: Group = {
    name: "",
    category: "",
    description: "",
  };

  const initialGroupOptionState: GroupOptions = {
    minAge: 0,
    maxAge: 100,
    maxParticipants: 10,
  };

  const [group, setGroup] = useState<Group>(initialGroupState);
  const [groupOptions, setGroupOptions] = useState<GroupOptions>(
    initialGroupOptionState
  );
  return (
    <>
      <Head>
        <title>Join Us - CreateGroup</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Flex mt={12} mb={20} position={"relative"} boxShadow={"lg"} w={"100%"}>
          <Box
            zIndex={0}
            position={"absolute"}
            w={"85%"}
            h={"100%"}
            bgColor={"green.500"}
            transition={"1s ease-in-out"}
            borderBottomRightRadius={"max(50rem,50rem)"}
            borderTopLeftRadius={"max(0,50rem)"}
          />
          <Flex
            zIndex={1}
            direction={"column"}
            flexGrow={1}
            alignItems={"center"}
            gap={24}
            pt={36}
          >
            <Heading size={"3xl"} color={"white"}>
              <Box>Welcome</Box>
              <Box mt={4} pl={12}>
                Create Group
              </Box>
            </Heading>
            <Flex
              color={"white"}
              fontSize={22}
              fontWeight={"bold"}
              direction={"column"}
              gap={4}
            >
              <Box>환영합니다!</Box>
              <Box>그룹을 만들어 취향과 관심을 공유하고</Box>
              <Box>새로운 경험을 만들어 보세요.</Box>
            </Flex>
            <Flex gap={8}>
              <Button
                fontSize={24}
                p={8}
                bgColor={"white"}
                color={"green.500"}
                _hover={{ color: "white", bgColor: "green.600" }}
              >
                돌아가기
              </Button>
              <Button
                fontSize={24}
                p={8}
                bgColor={"white"}
                color={"green.500"}
                _hover={{ color: "white", bgColor: "green.600" }}
              >
                생성하기
              </Button>
            </Flex>
          </Flex>
          <Container
            boxShadow={"lg"}
            p={8}
            zIndex={1}
            m={12}
            background={"white"}
            borderRadius={"2xl"}
            flexGrow={1}
          >
            <SetGroup setGroup={setGroup} group={group} />
            <SetGroupOptions
              setGroupOptions={setGroupOptions}
              groupOptions={groupOptions}
            />
          </Container>
        </Flex>
      </DefaultLayout>
    </>
  );
};

export default CreateGroup;
