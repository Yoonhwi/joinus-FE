import { CircleImg } from "@/components";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdOnlinePrediction } from "react-icons/md";

interface Members {
  profile: string;
  name: string;
  id: number;
}
interface AccordionProps {
  members: Members[];
}

const Accordion = ({ members }: AccordionProps) => {
  return (
    <Flex overflowY={"auto"} direction={"column"} gap={4}>
      {members.map((member, i) => {
        return (
          <Flex alignItems={"center"} key={`group_member${i}`} gap={2} flex={1}>
            <Icon as={MdOnlinePrediction} fontSize={24} fill={"primary.500"} />
            {member && member.profile && (
              <CircleImg
                imgSrc={member.profile}
                alt="member_profile"
                size={12}
              />
            )}
            {member && member.name && <Text>{member.name}</Text>}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Accordion;
