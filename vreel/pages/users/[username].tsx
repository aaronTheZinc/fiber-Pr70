import React, { useEffect } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { GetUserByUsername } from "../../graphql/query"

interface ProfilePageProps {
    username: string
}

export default function UserProfilePage({ username }: ProfilePageProps): JSX.Element {
    useEffect(() => {
        console.log(username)
    }, [])
    return (
        <div></div>
    )
}

export async function getStaticPaths() {
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [],
        fallback: true
    }
}


export const getStaticProps = async ({ params, }) => {
    const { username } = params
    const user = await GetUserByUsername(username)
    return {
        props: {
            username: user.first_name
        }
    }
}