import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from("transactions")
        .select(
          `
          *,
          user:users(email)
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(
          page * PAGE_SIZE,
          page * PAGE_SIZE + PAGE_SIZE - 1
        );

      if (typeFilter !== "all") {
        query = query.eq("type", typeFilter);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setTransactions(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, typeFilter]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        All Transactions
      </Typography>

      {/* FILTER */}
      <Box mb={2} display="flex" gap={2}>
        <Select
          value={typeFilter}
          onChange={(e) => {
            setPage(0);
            setTypeFilter(e.target.value);
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="funding">Funding</MenuItem>
          <MenuItem value="withdrawal">Withdrawal</MenuItem>
          <MenuItem value="investment">Investment</MenuItem>
        </Select>
      </Box>

      {/* TABLE */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : transactions.length === 0 ? (
        <Typography>No transactions found</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.user?.email || "N/A"}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>
                    {new Date(tx.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Typography>
              Page {page + 1} of {totalPages}
            </Typography>

            <Button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminTransactions;
