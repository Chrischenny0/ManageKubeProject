import DataTable from "./DataTable";
import {getCanadianCustomers} from "./_actions";

export default function Home({ data }) {
    return (
        <div>
            <DataTable data={data} />
        </div>
    );
}

// Fetch data on the server before page is rendered
export async function getServerSideProps(context) {
    try {
        const data = await getCanadianCustomers(); // Assuming no need for an abort signal here
        return { props: { data } };
    } catch (error) {
        console.error('Failed to fetch data', error);
        return { props: { error: 'Failed to load data' } };
    }
}
