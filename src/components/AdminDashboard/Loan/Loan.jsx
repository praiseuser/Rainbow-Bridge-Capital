import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles";
import ApproveLoanModal from "./ApproveLoanModal/ApproveLoanModal";

const loans = [
    { id: 1, user: "John Doe", email: "john@gmail.com", amount: 150000, purpose: "Business", date: "2025-01-10", status: "Pending" },
    { id: 2, user: "Mary Okafor", email: "mary@gmail.com", amount: 80000, purpose: "Personal", date: "2025-01-08", status: "Approved" },
    { id: 3, user: "James Obi", email: "james@gmail.com", amount: 200000, purpose: "Emergency", date: "2025-01-05", status: "Rejected" },
];

const LoanManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleApproveClick = (loan) => {
        setSelectedLoan(loan);
        setOpenModal(true);
    };

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch =
            loan.user.toLowerCase().includes(search.toLowerCase()) ||
            loan.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || loan.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case "Approved":
                return <CheckCircleIcon style={{ fontSize: "1rem" }} />;
            case "Rejected":
                return <CancelIcon style={{ fontSize: "1rem" }} />;
            case "Pending":
                return <PendingIcon style={{ fontSize: "1rem" }} />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return { bg: "#16a34a20", color: "#16a34a" };
            case "Rejected":
                return { bg: "#ef444420", color: "#ef4444" };
            case "Pending":
                return { bg: "#f59e0b20", color: "#f59e0b" };
            default:
                return { bg: "#64748b20", color: "#64748b" };
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Loan Management</h2>
                    <p style={styles.subtitle}>{filteredLoans.length} loan applications</p>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filterPaper}>
                <div style={styles.filterRow}>
                    <div style={styles.searchWrapper}>
                        <SearchIcon style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search user or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Loan Cards */}
            <div style={styles.cardGrid}>
                {filteredLoans.map((loan, index) => {
                    const statusColors = getStatusColor(loan.status);

                    return (
                        <div
                            key={loan.id}
                            style={{
                                ...styles.loanCard,
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <div style={styles.cardHeaderLeft}>
                                    <div style={styles.loanIcon}>
                                        <AccountBalanceIcon style={{ fontSize: "1.5rem", color: "#667eea" }} />
                                    </div>
                                    <div>
                                        <p style={styles.userName}>{loan.user}</p>
                                        <p style={styles.userEmail}>{loan.email}</p>
                                    </div>
                                </div>

                                <span
                                    style={{
                                        ...styles.statusChip,
                                        background: statusColors.bg,
                                        color: statusColors.color,
                                    }}
                                >
                                    {getStatusIcon(loan.status)}
                                    <span style={{ marginLeft: "6px" }}>{loan.status}</span>
                                </span>
                            </div>

                            {/* Loan Details */}
                            <div style={styles.detailsSection}>
                                <div style={styles.amountBox}>
                                    <p style={styles.amountLabel}>Loan Amount</p>
                                    <p style={styles.amountValue}>₦{loan.amount.toLocaleString()}</p>
                                </div>

                                <div style={styles.detailsGrid}>
                                    <div style={styles.detailItem}>
                                        <p style={styles.detailLabel}>Purpose</p>
                                        <p style={styles.detailValue}>{loan.purpose}</p>
                                    </div>

                                    <div style={styles.detailItem}>
                                        <p style={styles.detailLabel}>Date Applied</p>
                                        <p style={styles.detailValue}>{loan.date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button style={styles.actionBtn} onClick={() => handleApproveClick(loan)}>
                                <EditIcon style={{ fontSize: "1rem", marginRight: "6px" }} />
                                Approve / Reject
                            </button>
                        </div>
                    );
                })}
            </div>

            <ApproveLoanModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                loan={selectedLoan}
            />
        </div>
    );
};

export default LoanManagement;