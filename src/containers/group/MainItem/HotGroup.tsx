import { Flex, Heading, Icon, IconButton, Skeleton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { HotGroupItem } from "@/containers";
import { useGetGroup } from "@/apis";
import { useRouter } from "next/router";
import { PageRoutes } from "@/constants";
import { TiStarFullOutline } from "react-icons/ti";
import { Group } from "@/types";

const HotGroup = () => {
  const router = useRouter();
  const { data: group1 } = useGetGroup(31);
  const { data: group2 } = useGetGroup(1);

  const concatData = [group1, group2].filter(Boolean) as Group[];

  return (
    <Flex gap={8} direction={"column"}>
      <Flex justify={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
          <Heading size={"md"}>인기 모임에 가입해보세요 </Heading>
        </Flex>

        <IconButton
          aria-label="createclub_bt"
          variant={"ghost"}
          onClick={() => router.push(PageRoutes.CreateGroup)}
        >
          <Flex alignItems={"center"} px={2}>
            <Icon as={TiStarFullOutline} color={"yellow.500"} w={"6"} h={"6"} />
            <Heading size="md" px="8px">
              모임 만들고 싶어요
            </Heading>
          </Flex>
        </IconButton>
      </Flex>

      <Skeleton isLoaded={!!concatData.length} minH={630}>
        {concatData.map((group, index) => {
          return <HotGroupItem key={index} data={group} />;
        })}
      </Skeleton>
    </Flex>
  );
};

export default HotGroup;
