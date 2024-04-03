import { useFetch } from "@/apis";
import { useGetGroupChat } from "@/apis/chat";
import { WindowVirtualList } from "@/components/common/DynamicInfiniteList";
import { ApiRoutes } from "@/constants";
import { ChatType } from "@/constants/chat";
import { useBgColor, useSocketObserver } from "@/hooks";
import { SubscribeCb } from "@/hooks/useSocketObserver";
import { User } from "@/types";
import { ApiResponseChat } from "@/types/chat";
import { QueryParser } from "@/utils";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Chat from "./Chat";

export interface ChatLog {
  user: number | undefined;
  message: string;
  timestamp: string;
  method: ChatType.Join | ChatType.Leave | ChatType.Chat | null;
}

interface ChatPanelProps {
  bgImg: number;
}

export const ChatPanel = ({ bgImg }: ChatPanelProps) => {
  const [chat, setChat] = useState<ApiResponseChat[]>([]);
  //초기 채팅방의 내용을 가져옴

  const router = useRouter();
  const color = useBgColor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupId = QueryParser.toNumber(router.query.id);

  const { data: me } = useFetch<User>(ApiRoutes.Me);
  const { data: chatData } = useGetGroupChat({ groupId, limit: 10 });

  const { subscribe, unsubscribe, submit } = useSocketObserver({
    groupId,
    userId: me?.id,
  });

  useEffect(() => {
    // if (chatData) {
    //   setChat(
    //     chatData.pages.flatMap((data) => {
    //       return data.data.map((chat) => {
    //         return {
    //           user_id: chat.user_id,
    //           club_id: chat.club_id,
    //           method: ChatType.Chat,
    //           message: chat.message,
    //           timestamp: new Date(
    //             chat?.created_at as string | number | Date
    //           ).toString(),
    //         };
    //       });
    //     })
    //   );
    // }

    const cb: SubscribeCb = (data) => {
      setChat((prev) => [
        ...prev,
        {
          method: data.method,
          user_id: data.user ?? 0,
          club_id: groupId!,
          message: data.body.message,
          timestamp: data.body.timestamp.toString(),
        },
      ]);
    };

    subscribe(cb);

    return () => {
      unsubscribe(cb);
    };
  }, [chatData, groupId, subscribe, unsubscribe]);

  return (
    <Box h={1200} shadow={"lg"} position={"relative"}>
      <Box opacity={0.5}>
        <Image
          src={`/group_chat${bgImg}.jpg`}
          alt="group_chat"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box h={1100} overflowY={"auto"} position={"absolute"} top={0} w={"100%"}>
        {/* <WindowVirtualList<ApiResponseChat>
          infiniteQueryResult={useGetGroupChat({
            groupId,
            limit: 10,
          })}
          renderItem={Chat}
        /> */}

        <Flex direction={"column"} p={4} gap={4}>
          {chat.map((data, i) => (
            <Chat key={`chat${i}`} data={data} />
          ))}
        </Flex>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputRef.current?.value) return;
          submit(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }}
      >
        <Flex position={"absolute"} bottom={0} width={"100%"} p={16}>
          <Input
            placeholder={"message"}
            size="lg"
            h={16}
            backgroundColor={color}
            ref={inputRef}
          />
          <Button
            type="submit"
            position={"absolute"}
            fontWeight={"bold"}
            m={2}
            w={12}
            h={12}
            zIndex={1}
            right={16}
          >
            <Icon as={FaCheck} />
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
