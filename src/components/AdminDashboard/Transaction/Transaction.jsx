import React, { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./styles";

const initialTransactions = [
    {
        id: "TXN001",
        user: "John Doe",
        email: "john@gmail.com",
        type: "Deposit",
        amount: 50000,
        date: "2025-01-01",
        status: "Completed",
        ref: "REF12345",
    },
    {
        id: "TXN002",
        user: "Mary Okafor",
        email: "mary@gmail.com",
        type: "Withdrawal",
        amount: 20000,
        date: "2025-01-05",
        status: "Pending",
        ref: "REF99881",
    },
    {
        id: "TXN003",
        user: "James Obi",
        email: "james@gmail.com",
        type: "Transfer",
        amount: 75000,
        date: "2025-01-07",
        status: "Completed",
        ref: "REF11229",
    },
];

const Transactions = () => {
    const [transactions] = useState(initialTransactions);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredData = useMemo(() => {
        return transactions.filter((tx) => {
            const inSearch =
                tx.user.toLowerCase().includes(search.toLowerCase()) ||
                tx.email.toLowerCase().includes(search.toLowerCase()) ||
                tx.ref.toLowerCase().includes(search.toLowerCase());

            const inType = typeFilter === "All" || tx.type === typeFilter;

            const inDate =
                (!dateFrom || new Date(tx.date) >= new Date(dateFrom)) &&
                (!dateTo || new Date(tx.date) <= new Date(dateTo));

            return inSearch && inType && inDate;
        });
    }, [transactions, search, typeFilter, dateFrom, dateTo]);

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const exportCSV = () => {
        const headers = "ID,User,Email,Type,Amount,Date,Status,Reference\n";
        const rows = filteredData
            .map(
                (tx) =>
                    `${tx.id},${tx.user},${tx.email},${tx.type},${tx.amount},${tx.date},${tx.status},${tx.ref}`
            )
            .join("\n");

        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getTypeIcon = (type) => {
        const iconStyle = { fontSize: "1.2rem" };
        switch (type) {
            case "Deposit":
                return <ArrowDownwardIcon style={iconStyle} />;
            case "Withdrawal":
                return <ArrowUpwardIcon style={iconStyle} />;
            case "Transfer":
                return <SwapHorizIcon style={iconStyle} />;
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Transactions</h2>
                    <p style={styles.subtitle}>{filteredData.length} transactions found</p>
                </div>
                <button style={styles.exportBtn} onClick={exportCSV}>
                    <FileDownloadIcon style={{ fontSize: "1.2rem", marginRight: "8px" }} />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filterPaper}>
                <div style={styles.filterRow}>
                    <div style={styles.searchWrapper}>
                        <SearchIcon style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search user, email or ref..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="All">All Types</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdrawal">Withdrawal</option>
                        <option value="Transfer">Transfer</option>
                    </select>

                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        style={styles.dateInput}
                    />

                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        style={styles.dateInput}
                    />
                </div>
            </div>

            {/* Transaction Cards */}
            <div style={styles.cardGrid}>
                {currentRows.map((tx, index) => (
                    <div
                        key={tx.id}
                        style={{
                            ...styles.transactionCard,
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        {/* Card Header */}
                        <div style={styles.cardHeader}>
                            <div style={styles.cardHeaderLeft}>
                                <div
                                    style={{
                                        ...styles.typeIcon,
                                        background: tx.type === "Deposit" ? "#ffd70020" : tx.type === "Withdrawal" ? "#ff6b6b20" : "#8b5cf620",
                                        color: tx.type === "Deposit" ? "#ffd700" : tx.type === "Withdrawal" ? "#ff6b6b" : "#8b5cf6",
                                    }}
                                >
                                    {getTypeIcon(tx.type)}
                                </div>
                                <div>
                                    <p style={styles.userName}>{tx.user}</p>
                                    <p style={styles.userEmail}>{tx.email}</p>
                                </div>
                            </div>

                            <span
                                style={{
                                    ...styles.statusChip,
                                    background: tx.status === "Completed" ? "#ffd70020" : "#ff6b6b20",
                                    color: tx.status === "Completed" ? "#ffd700" : "#ff6b6b",
                                }}
                            >
                                {tx.status}
                            </span>
                        </div>

                        {/* Transaction Details */}
                        <div style={styles.detailsGrid}>
                            <div style={styles.detailItem}>
                                <p style={styles.detailLabel}>Type</p>
                                <span
                                    style={{
                                        ...styles.typeChip,
                                        background: tx.type === "Deposit" ? "#ffd70015" : tx.type === "Withdrawal" ? "#ff6b6b15" : "#8b5cf615",
                                        color: tx.type === "Deposit" ? "#ffd700" : tx.type === "Withdrawal" ? "#ff6b6b" : "#8b5cf6",
                                    }}
                                >
                                    {tx.type}
                                </span>
                            </div>

                            <div style={styles.detailItem}>
                                <p style={styles.detailLabel}>Amount</p>
                                <p style={styles.amount}>₦{tx.amount.toLocaleString()}</p>
                            </div>

                            <div style={styles.detailItem}>
                                <p style={styles.detailLabel}>Date</p>
                                <p style={styles.detailValue}>{tx.date}</p>
                            </div>

                            <div style={styles.detailItem}>
                                <p style={styles.detailLabel}>Reference</p>
                                <p style={styles.detailValue}>{tx.ref}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    style={{
                        ...styles.pageBtn,
                        opacity: currentPage === 1 ? 0.3 : 1,
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    <ChevronLeftIcon />
                </button>

                <span style={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    style={{
                        ...styles.pageBtn,
                        opacity: currentPage === totalPages ? 0.3 : 1,
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

export default Transactions;