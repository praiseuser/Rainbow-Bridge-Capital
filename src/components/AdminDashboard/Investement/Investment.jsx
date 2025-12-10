import React, { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./styles";
import UpdateInvestmentModal from "./UpdateInvestmentModal/UpdateInvestmentModal";

const initialInvestments = [
    {
        id: "INV001",
        user: "John Doe",
        email: "john@gmail.com",
        plan: "Gold Plan",
        amount: 100000,
        returns: 150000,
        startDate: "2025-01-01",
        endDate: "2025-02-01",
        status: "Active",
    },
    {
        id: "INV002",
        user: "Mary Okafor",
        email: "mary@gmail.com",
        plan: "Starter Plan",
        amount: 50000,
        returns: 70000,
        startDate: "2025-01-03",
        endDate: "2025-02-03",
        status: "Completed",
    },
    {
        id: "INV003",
        user: "James Obi",
        email: "james@gmail.com",
        plan: "Diamond Plan",
        amount: 200000,
        returns: 240000,
        startDate: "2025-01-07",
        endDate: "2025-03-07",
        status: "Pending",
    },
];

const InvestmentManagement = () => {
    const [investments] = useState(initialInvestments);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;

    const filtered = useMemo(() => {
        return investments.filter((inv) => {
            const matchesSearch =
                inv.user.toLowerCase().includes(search.toLowerCase()) ||
                inv.email.toLowerCase().includes(search.toLowerCase()) ||
                inv.plan.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter === "All" || inv.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter, investments]);

    const indexOfLast = page * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRows = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / rowsPerPage);

    const exportCSV = () => {
        const headers = "ID,User,Email,Plan,Amount,Returns,Start Date,End Date,Status\n";
        const rows = filtered
            .map(
                (i) =>
                    `${i.id},${i.user},${i.email},${i.plan},${i.amount},${i.returns},${i.startDate},${i.endDate},${i.status}`
            )
            .join("\n");

        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "investments.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleUpdateClick = (inv) => {
        setSelectedInvestment(inv);
        setModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return { bg: "#2563eb20", color: "#2563eb" };
            case "Completed":
                return { bg: "#16a34a20", color: "#16a34a" };
            case "Pending":
                return { bg: "#f59e0b20", color: "#f59e0b" };
            default:
                return { bg: "#64748b20", color: "#64748b" };
        }
    };

    const calculateProgress = (start, end) => {
        const startDate = new Date(start).getTime();
        const endDate = new Date(end).getTime();
        const now = new Date().getTime();
        const total = endDate - startDate;
        const elapsed = now - startDate;
        const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
        return Math.round(progress);
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Investment Management</h2>
                    <p style={styles.subtitle}>{filtered.length} investments found</p>
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
                            placeholder="Search user, email or plan..."
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
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* Investment Cards */}
            <div style={styles.cardGrid}>
                {currentRows.map((inv, index) => {
                    const statusColors = getStatusColor(inv.status);
                    const progress = calculateProgress(inv.startDate, inv.endDate);

                    return (
                        <div
                            key={inv.id}
                            style={{
                                ...styles.investmentCard,
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <div style={styles.cardHeaderLeft}>
                                    <div style={styles.planIcon}>
                                        <TrendingUpIcon style={{ fontSize: "1.5rem", color: "#667eea" }} />
                                    </div>
                                    <div>
                                        <p style={styles.userName}>{inv.user}</p>
                                        <p style={styles.userEmail}>{inv.email}</p>
                                    </div>
                                </div>

                                <span
                                    style={{
                                        ...styles.statusChip,
                                        background: statusColors.bg,
                                        color: statusColors.color,
                                    }}
                                >
                                    {inv.status}
                                </span>
                            </div>

                            {/* Plan Name */}
                            <div style={styles.planBadge}>{inv.plan}</div>

                            {/* Amount Section */}
                            <div style={styles.amountSection}>
                                <div style={styles.amountItem}>
                                    <p style={styles.amountLabel}>Investment</p>
                                    <p style={styles.amountValue}>₦{inv.amount.toLocaleString()}</p>
                                </div>
                                <div style={styles.divider}></div>
                                <div style={styles.amountItem}>
                                    <p style={styles.amountLabel}>Returns</p>
                                    <p style={styles.returnValue}>₦{inv.returns.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {inv.status === "Active" && (
                                <div style={styles.progressSection}>
                                    <div style={styles.progressHeader}>
                                        <span style={styles.progressLabel}>Progress</span>
                                        <span style={styles.progressPercent}>{progress}%</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div
                                            style={{
                                                ...styles.progressFill,
                                                width: `${progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Dates */}
                            <div style={styles.datesSection}>
                                <div style={styles.dateItem}>
                                    <CalendarTodayIcon style={styles.dateIcon} />
                                    <div>
                                        <p style={styles.dateLabel}>Start Date</p>
                                        <p style={styles.dateValue}>{inv.startDate}</p>
                                    </div>
                                </div>
                                <div style={styles.dateItem}>
                                    <CalendarTodayIcon style={styles.dateIcon} />
                                    <div>
                                        <p style={styles.dateLabel}>End Date</p>
                                        <p style={styles.dateValue}>{inv.endDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Update Button */}
                            <button style={styles.updateBtn} onClick={() => handleUpdateClick(inv)}>
                                <EditIcon style={{ fontSize: "1rem", marginRight: "6px" }} />
                                Update Investment
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    style={{
                        ...styles.pageBtn,
                        opacity: page === 1 ? 0.3 : 1,
                        cursor: page === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    <ChevronLeftIcon />
                </button>

                <span style={styles.pageInfo}>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    style={{
                        ...styles.pageBtn,
                        opacity: page === totalPages ? 0.3 : 1,
                        cursor: page === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    <ChevronRightIcon />
                </button>
            </div>

            <UpdateInvestmentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                investment={selectedInvestment}
            />
        </div>
    );
};

export default InvestmentManagement;