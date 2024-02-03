import { useDelete, usePost } from "@/apis";
import { ApiRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { Feed } from "@/types";
import {
  Box,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ModifyIconProps {
  feed: Feed;
}
export const ModifyIcon = ({ feed }: ModifyIconProps) => {
  console.log(feed);
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { mutate: deleteFeed } = useDelete(ApiRoutes.Feeds);
  return (
    <>
      <Popover trigger={"click"} placement="left">
        <PopoverTrigger>
          <Box as="button" top={4} right={4} position={"absolute"}>
            <Icon as={BsThreeDotsVertical} fontSize={20} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width={20} alignItems={"center"} mt={12}>
          <Text padding={2} as={"button"}>
            수정
          </Text>
          <Text
            padding={2}
            as={"button"}
            onClick={() =>
              openConfirm({
                title: "Delete Post",
                content: "해당피드를 삭제하시겠습니까?",
                onConfirm: () => deleteFeed(feed.id),
              })
            }
          >
            삭제
          </Text>
        </PopoverContent>
      </Popover>
    </>
  );
};
