import { DefaultLayout } from "@/components";
import { Button } from "@chakra-ui/react";
import Head from "next/head";

import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);
  }

  const { mutate } = useMutation({
    mutationFn: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("hello");
        }, 1000);
      });
    },
    onSuccess: (data) => {
      console.log("success2");
    },
  });

  return (
    <>
      <Head>
        <title>Join Us - Main</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        {!session && <>Not signed in</>}
        {session && (
          <>
            Signed in as <button onClick={() => signOut()}>로그아웃</button>
          </>
        )}
        {session && <p>{session.user?.name}님 반갑습니다</p>}
        <Button onClick={() => mutate()}>Hello, World</Button>
        <Button variant={"ghost"}>Hello, World</Button>
        <Button variant={"outline"}>Hello, World</Button>
      </DefaultLayout>
    </>
  );
}
