import { DefaultLayout } from "@/components";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import GroupCard from "../item";
export interface GroupCardProps {
  id: number;
  name: string;
  category: string;
  imgSrc: string;
  overview: string;
  members: number;
}

const dummyData: GroupCardProps = {
  id: 1,
  name: "배철수의 음악캠프",
  category: "음악",
  imgSrc: "/groupTestImg.webp",
  overview: "배철수의 음악캠프를 사랑하는 사람 모두 모여라!!",
  members: 1557,
};

const index = () => {
  return (
    <div>
      <Head>
        <title>Join Us - GroupList</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Text as="b" fontSize="xl" mt={5}>
          이런 모임 어때요?
        </Text>
        <GroupCard groupData={dummyData} />
      </DefaultLayout>
    </div>
  );
};

export default index;
