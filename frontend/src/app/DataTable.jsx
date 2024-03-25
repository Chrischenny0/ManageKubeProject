'use client'
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { getCanadianCustomers } from "./_actions";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    let list = useAsyncList({
        async load({ signal }) {
            try {
                let json = await getCanadianCustomers(signal);
                setIsLoading(false);
                // Ensure that items is only populated if json contains data; otherwise, return an empty array
                return {
                    items: json && json.length > 0 ? json : [],
                };
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setIsLoading(false);
                // In case of an error, return an empty array to trigger the empty state
                return { items: [] };
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
            aria-label="Example table with client-side sorting, conditional empty state"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            classNames={{ table: "min-h-[400px]" }}
        >
            <TableHeader>
                <TableColumn key="name" allowsSorting>Name</TableColumn>
                <TableColumn key="email">Email</TableColumn>
                <TableColumn key="city" allowsSorting>City</TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
                // NextUI's emptyContent is used to render a message when no data is available
                emptyContent={!isLoading ? "No rows to display." : null}
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
