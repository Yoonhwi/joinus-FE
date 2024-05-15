import { useGetComment, useGetFeed, useGetGroup } from "@/apis";
import { DefaultLayout } from "@/components";
import { WindowVirtualList } from "@/components/common/DynamicInfiniteList";
import { PageRoutes } from "@/constants";
import { FeedBody, FeedExtra, GroupDescription } from "@/containers";
import FeedComment from "@/containers/group/GroupFeedComments/Comment";
import { Comment } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";

const FeedDetail = () => {
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);
  const { data: feed } = useGetFeed(numberingQuery);
  const { data: group } = useGetGroup(feed?.club_id);

  return (
    <>
      <Head>
        <title>Join Us - Feed</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout>
        <Flex
          w={{ base: "100%", md: "container.md" }}
          direction={"column"}
          gap={8}
        >
          <Box shadow={"md"} borderRadius={4} overflow={"hidden"}>
            {group && <GroupDescription group={group} />}
          </Box>
          <Flex justifyContent={"end"}>
            <IconButton
              aria-label="route_groupfeed"
              onClick={() =>
                router.push(toUrl(PageRoutes.GroupFeed, { id: feed?.club_id }))
              }
            >
              <Flex gap={1} p={2}>
                <Icon as={RiArrowGoBackLine} w="6" h={"5"} />
                <Text>목록</Text>
              </Flex>
            </IconButton>
          </Flex>
          {feed && (
            <>
              <FeedBody feed={feed} />
              <FeedExtra feed={feed} />
            </>
          )}
          <Box borderTopWidth={"1px"}>
            <WindowVirtualList<Comment>
              infiniteQueryResult={useGetComment({
                feedId: feed?.id,
                limit: 10,
              })}
              renderItem={FeedComment}
              gap={8}
              emptyDataMessage="작성된 댓글이 없습니다. 첫번째로 작성을 해보세요!"
            />
          </Box>
        </Flex>
      </DefaultLayout>
    </>
  );
};

export default FeedDetail;