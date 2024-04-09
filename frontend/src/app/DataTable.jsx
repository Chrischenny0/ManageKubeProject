'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

export default function DataTable({ data }) {
    // Directly use the data passed as props
    const isLoading = !data;

    return (
        <Table aria-label="Example table">
            <TableHeader>
                <TableColumn key="name">Name</TableColumn>
                <TableColumn key="email">Email</TableColumn>
                <TableColumn key="city">City</TableColumn>
            </TableHeader>
            <TableBody
                items={data || []}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
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
