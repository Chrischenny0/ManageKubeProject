'use client'
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { customers } from "./data"; // Make sure this path is correct

async function fetchDataWithRetry(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Response not ok');
            return response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    let list = useAsyncList({
        async load({ signal }) {
            try {
                let json = await fetchDataWithRetry(`${process.env.API_URL}/canadian_customers`, { signal }, 3);
                setIsLoading(false);
                return {
                    items: json.results && json.results.length > 0 ? json.results : customers.canadian_customers,
                };
            } catch (error) {
                console.error("Failed to fetch data, using fallback:", error);
                setIsLoading(false);
                return { items: customers.canadian_customers };
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let aValue = sortDescriptor.column === 'name' ? `${a.first_name} ${a.last_name}` : a[sortDescriptor.column];
                    let bValue = sortDescriptor.column === 'name' ? `${b.first_name} ${b.last_name}` : b[sortDescriptor.column];
                    let cmp = aValue.localeCompare(bValue, undefined, {numeric: true, sensitivity: 'base'});
                    return sortDescriptor.direction === "descending" ? -cmp : cmp;
                }),
            };
        },
    });

    return (
        <Table
            aria-label="Example table with client-side sorting, conditional empty state, and fallback data"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            classNames={{ table: "min-h-[400px]" }}
        >
            <TableHeader>
                <TableColumn key="name" allowsSorting>Name</TableColumn> {/* Combined First and Last Name */}
                <TableColumn key="email">Email</TableColumn>
                <TableColumn key="city" allowsSorting>City</TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
                emptyContent={!isLoading && list.items.length === 0 ? "No rows to display." : null}
            >
                {(item) => (
                    <TableRow key={item.customer_id}>
                        <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.city}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
