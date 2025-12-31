import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
} from "@mui/material";

const AdminAuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("audit_logs")
            .select(`
        *,
        admin:users(email)
      `)
            .order("created_at", { ascending: false });

        if (!error) setLogs(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <Box>
            <Typography variant="h5" mb={2}>
                Admin Audit Logs
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : logs.length === 0 ? (
                <Typography>No logs found</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Admin</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.admin?.email || "System"}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.description}</TableCell>
                                <TableCell>
                                    {new Date(log.created_at).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default AdminAuditLogs;
