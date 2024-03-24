import Image from "next/image";
import DataTable from "./DataTable";

async function getData() {
    // Revalidates data every 60 SECONDS
    const res = await fetch('https://localhost:8080', { next: { revalidate: 60 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function Home() {
    // const data = await getData()

    return (
        <div>
            <DataTable/>
        </div>
    );
}
