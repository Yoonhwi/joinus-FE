import { useGetCategories } from "@/apis";
import { DefaultLayout } from "@/components";
import { PageRoutes, toCategory } from "@/constants";
import { AllGroups, SelectedGroups } from "@/containers";
import { Button, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

const GroupList = () => {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const { data: categories } = useGetCategories();

  return (
    <>
      <Head>
        <title>Join Us - GroupList</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Flex py={12} direction={"column"} gap={8}>
          <Flex justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Icon
                as={TiStarFullOutline}
                color={"yellow.500"}
                w={"7"}
                h={"7"}
              />
              <Heading size="md" px="8px">
                이런 모임 어때요?
              </Heading>
            </Flex>
            <IconButton
              aria-label="createclub_bt"
              variant={"ghost"}
              onClick={() => router.push(PageRoutes.CreateGroup)}
            >
              <Flex alignItems={"center"} px={2}>
                <Icon as={FaHeart} color={"red.500"} w={"6"} h={"6"} />
                <Heading size="md" px="8px">
                  모임 만들고 싶어요
                </Heading>
              </Flex>
            </IconButton>
          </Flex>
          <Flex gap={2}>
            <Button
              variant={selected === 0 ? "solid" : "ghost"}
              onClick={() => setSelected(0)}
            >
              전체
            </Button>
            {categories?.map((category, index) => {
              return (
                <Button
                  key={index}
                  variant={selected === category.id ? "solid" : "ghost"}
                  onClick={() => setSelected(category.id)}
                >
                  {toCategory[category.id]}
                </Button>
              );
            })}
          </Flex>
          {selected <= 0 ? <AllGroups /> : <SelectedGroups id={selected} />}
        </Flex>
      </DefaultLayout>
    </>
  );
};

export default GroupList;
