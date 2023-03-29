import Head from "next/head";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex } from "@/components/Flex";
import { Switch } from "@mantine/core";
import { BsArrowRight } from "react-icons/bs";
import { Spacer } from "@/components/Spacer";

const HeadingBar = styled.div`
  width: 100%;
  padding: 10px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgb(52 52 52 / 0%) 100%
  );
  display: flex;
  justify-content: space-between;
`;

export default function Settings() {
       const router = useRouter();

       const handleSignOut = async () => {
              console.log("Signing out...");
              await signOut({ redirect: false, callbackUrl: '/' });
              console.log("Redirecting...");
              router.push("/");
       };

       return (
              <>
              <Head>
                <title>Settings</title>
                <meta name="description" content="Stratusound settings" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
              </Head>
              <Flex align="stretch">
                     <Flex align="flex-start" className="white">
                            <h2>Hello, </h2>
                            <h1> Settings </h1>
                            <HeadingBar>
                                   <h3> Accessibility </h3>
                                   <Spacer size="5" />
                            </HeadingBar>
                            <Spacer size="10" />
                            <Flex
                                   dir="row"
                                   justify="space-between"
                                   minWidth="50%"
                                   onClick={handleSignOut}
                            >
                                   <p>Log out</p>
                                   <BsArrowRight />
                            </Flex>
                            <Spacer size="20" />
                            <HeadingBar>
                                   <h3> Account</h3>
                                   <Spacer size="5" />
                            </HeadingBar>
                            <Spacer size="10" />
                            <Flex dir="row" minWidth="50%" justify="space-between">
                                   <p>Dark Mode</p>
                                   <Switch onLabel="ON" offLabel="OFF" />
                            </Flex>
                            <Spacer size="10" />

                            <Flex dir="row" justify="space-between" minWidth="50%">
                                   <p>Weather Colour Shift</p>
                                   <Switch onLabel="ON" offLabel="OFF" />
                            </Flex>
                            <Spacer size="20" />
                            <HeadingBar>
                                   <h3>Other</h3>
                                   <Spacer size="5" />
                            </HeadingBar>
                            <Spacer size="10" />
                            <Flex dir="row" justify="space-between" minWidth="50%">
                                   <p>About Us</p>
                                   <BsArrowRight />
                            </Flex>
                     </Flex>
              </Flex>
              </>
       );
}
