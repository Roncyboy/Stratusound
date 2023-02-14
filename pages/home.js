import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session === undefined) {
      return; // wait for authentication state to initialize
    }
    if (!session) {
      router.push("/");
      console.log("pushed");
    }
  }, [session])

  if (session) {
    return (
      <>
        <h1>Home</h1>
      </>
    )
  }

}