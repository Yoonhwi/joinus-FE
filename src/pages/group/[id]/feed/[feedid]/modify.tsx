import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed, GroupDetail } from "@/containers";
import ModifyFeed from "@/containers/group/ModifyFeed";
import { Feed } from "@/types";
import { toUrl } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";

const Modify = () => {
  const router = useRouter();
  const name = router.query.feedid;

  const { data: feed } = useFetch<Feed>(toUrl(ApiRoutes.Feeds, { id: name }));

  return (
    <>
      <Head>
        <title>Join Us - Modify Feed</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GroupDetail>{feed && <ModifyFeed />}</GroupDetail>
    </>
  );
};

export default Modify;