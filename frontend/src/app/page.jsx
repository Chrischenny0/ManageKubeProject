import DataTable from "./DataTable";
import { getCanadianCustomers } from "./_actions";

export async function loader() {
    try {
        const data = await getCanadianCustomers(); // Assuming no need for an abort signal here
        return { data };
    } catch (error) {
        console.error('Failed to fetch data', error);
        return { error: 'Failed to load data' };
    }
}

export default function Home({ data }) {
    return (
        <div>
            <DataTable data={data} />
        </div>
    );
}