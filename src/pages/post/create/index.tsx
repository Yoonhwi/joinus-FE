import { DefaultLayout } from "@/components";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
export interface PostData {
  title: string;
  content: string;
}

const FroalaEditor = dynamic(() => import("@/containers/post/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<PostData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: PostData) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>Join Us - CreatePost</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="space-between" mb={4}>
            <Text as="b" fontSize="2xl" mt={5}>
              게시글 작성
            </Text>
            <Button
              mt={4}
              color="green.400"
              type="submit"
              backgroundColor="blue.50"
              _hover={{ bg: "ghost" }}
              _active={{ bg: "ghost" }}
            >
              등록
            </Button>
          </Flex>
          <hr />
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            {...register("title", { required: "제목을 입력하세요" })}
            borderColor="white"
            focusBorderColor="gray.300"
            mt={4}
            mb={4}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={() => (
              <FroalaEditor
                value={getValues("content") || ""}
                onChange={(value) => setValue("content", value)}
              />
            )}
          />
        </form>
      </DefaultLayout>
    </>
  );
};

export default CreatePost;