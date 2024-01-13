import { DefaultLayout } from "@/components";
import { SetGroup, SetGroupOptions } from "@/containers";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { keyframes } from "@emotion/react";
import { useCallback } from "react";
import { useBgColor } from "@/hooks";

export interface FormValues {
  name: string;
  category: string;
  description: string;
  minAge: number;
  maxAge: number;
  maxParticipants: number;
}

export const initialFormValues: FormValues = {
  name: "",
  category: "",
  description: "",
  minAge: 0,
  maxAge: 100,
  maxParticipants: 10,
};

const bgColorAnimation = keyframes`
  from {
    width: 0;
    height: 0;
  }
  to {
    width:85%;
    height:100%;
  }
`;

const btnAnimation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const CreateGroup = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: initialFormValues,
  });

  const onSubmit = useCallback((data: FormValues) => {
    //서버로 data를 보내는 로직을 작성합니다.
  }, []);

  const bgColor = useBgColor();

  return (
    <>
      <Head>
        <title>Join Us - CreateGroup</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Flex
          mt={12}
          mb={20}
          position={"relative"}
          boxShadow={"lg"}
          w={"100%"}
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            zIndex={0}
            position={"absolute"}
            w={"85%"}
            h={"100%"}
            bgColor={"primary.500"}
            borderBottomRightRadius={"max(50rem,50rem)"}
            borderTopLeftRadius={"max(0,50rem)"}
            animation={`${bgColorAnimation} 1s ease-in-out`}
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
                animation={`${btnAnimation} 1s ease-in-out`}
              >
                돌아가기
              </Button>
              <Button
                type="submit"
                fontSize={24}
                p={8}
                animation={`${btnAnimation} 1s ease-in-out`}
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
            background={bgColor}
            borderRadius={"2xl"}
            flexGrow={1}
          >
            <SetGroup register={register} />
            <SetGroupOptions setValue={setValue} watch={watch} />
          </Container>
        </Flex>
      </DefaultLayout>
    </>
  );
};

export default CreateGroup;
