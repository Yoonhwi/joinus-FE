import Link from "next/link";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  CardFooter,
  Box,
} from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { GroupCardProps } from "../list";

interface GroupProps {
  groupData: GroupCardProps;
}

const GroupCard = ({ groupData }: GroupProps) => {
  return (
    <>
      <Link href={`/group/${groupData.id}`}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={groupData.imgSrc}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{groupData.name}</Heading>

              <Text py="2">{groupData.overview}</Text>
              <Box>
                <Text py="1">
                  {groupData.category}
                  {/* <IoPersonSharp /> */}
                  &bull;
                  {groupData.members}
                </Text>
              </Box>
            </CardBody>

            <CardFooter></CardFooter>
          </Stack>
        </Card>
      </Link>
    </>
  );
};

export default GroupCard;
