import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { getEnterpriseEmployee, getServerAnalytics } from "../../../graphql/query"

export default function Employee({ employee }): JSX.Element {
    const router = useRouter()
    useEffect(() => {
        (async () => {
            console.log(await getEnterpriseEmployee("orange2", "ed34e7a6-7166-45e5-a52a-c41293cdcbee"))
        })();
    }, [])
    return (
        <div style={{ height: "100vh" }}>
            <label>{JSON.stringify(router.query)}</label>
        </div>
    )
}
type RouteBlob = {
    enterprise: string,
    employee: string
}
export async function getStaticPaths() {
    const { enterprises } = await getServerAnalytics();
    const paths = []
    enterprises.forEach((enterprise) => {
        enterprise.employees.forEach((employee) => {
            let blob: RouteBlob = {} as RouteBlob;
            blob.enterprise = enterprise.name
            blob.employee = employee.id
            paths.push({ params: blob })
        });

    })

    console.log("[paths]: ", paths)

    return { paths, fallback: 'blocking' };
}
export async function getStaticProps({ params }) {
    // consol
    try {
        const employee = await getEnterpriseEmployee(params.enterprise, params.employee)
        return {
            props: {
                employee
            }
        }
    }
    catch (e) {
        return { notFound: true }
    }
}