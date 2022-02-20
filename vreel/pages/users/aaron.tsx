import React, { useEffect, useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { GetUserByUsername } from "../../graphql/query"
import axios from "axios"
interface ProfilePageProps {
    username: string
}

export default function UserProfilePage({ username }: ProfilePageProps): JSX.Element {
    const [vcardData, setVCardData] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/api/vcard?username=${username}`);
            setVCardData(data)
        })()
    }, []);

    useEffect(() => {
        if (vcardData) {
            console.log(vcardData)
        }
    }, [vcardData])
    return (
        <div>

        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    const { username } = params
    const user = await GetUserByUsername(username)
    return {
        props: {
            username: user.username
        }
    }
}