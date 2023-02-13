
import { useSession, signIn, signOut } from "next-auth/react"

export default function Landing () {
    return (
        <div>
            <h1>Landing</h1>
            Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
        </div>

    )
}