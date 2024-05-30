import { useGetFeed } from "@/apis";
import { NewFeedItem } from "@/containers/feed";
import { Feed } from "@/types";
import { Flex, Heading, Icon, Skeleton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const HotFeed = () => {
  const { data: feed1 } = useGetFeed(28);
  const { data: feed2 } = useGetFeed(30);
  const concatData = [feed1, feed2].filter(Boolean) as Feed[];

  return (
    <Flex gap={8} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>급상승 중인 피드에요</Heading>
      </Flex>

      <Skeleton isLoaded={!!concatData.length} minH={340}>
        <Flex gap={6} direction={"column"}>
          {concatData.map((feed, index) => {
            return <NewFeedItem key={index} data={feed} />;
          })}
        </Flex>
      </Skeleton>
    </Flex>
  );
};

export default HotFeed;
