import React, { useState, useEffect } from "react";
import {
    TrendingUp, TrendingDown, Filter, RefreshCw, Search,
    Calendar, DollarSign, CheckCircle, Clock, XCircle,
    ArrowUpRight, ArrowDownRight, ChevronDown, Download
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../supabase";
import { styles } from "./styles";

const TransactionHistoryPage = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (user) fetchTransactions();
    }, [user, filterType]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from("transactions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (filterType !== "all") {
                query = query.eq("type", filterType);
            }

            const { data, error } = await query;

            if (error) throw error;

            let filtered = data || [];
            if (searchQuery) {
                filtered = filtered.filter(tx =>
                    tx.reference_id.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setTransactions(filtered);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved": return <CheckCircle size={14} />;
            case "pending": return <Clock size={14} />;
            case "rejected": return <XCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "approved": return styles.statusApproved;
            case "pending": return styles.statusPending;
            case "rejected": return styles.statusRejected;
            default: return styles.statusPending;
        }
    };

    const totalFunding = transactions.filter(t => t.type === "funding" && t.status === "approved").reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawal = transactions.filter(t => t.type === "withdrawal" && t.status === "approved").reduce((sum, t) => sum + t.amount, 0);

    if (!user) return <div style={{ color: "white", textAlign: "center", padding: "40px" }}>Please login to see your transactions</div>;

    return (
        <>
            <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, 20px) scale(1.05); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .stat-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
        .select:hover, .search-input:hover { border-color: rgba(255,255,255,0.4); }
        .select:focus, .search-input:focus { border-color: #3b82f6; background: rgba(255,255,255,0.15); }
        .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5); }
        .button-secondary:hover { background: rgba(255,255,255,0.15); }
        .transaction-row:hover { background: rgba(255,255,255,0.05); }
        .mobile-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
        
        .search-input::placeholder { color: rgba(255,255,255,0.5); }
        select option { background: #1e293b; color: white; }
        
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; }
          .filter-grid { grid-template-columns: 1fr; }
          .button-group { flex-direction: column; }
          .button { width: 100%; justify-content: center; }
        }
      `}</style>

            <div style={styles.pageWrapper}>
                <div style={styles.animatedBg} />

                <div style={styles.container}>
                    <div style={styles.header}>
                        <div style={styles.headerTop}>
                            <h1 style={styles.headerTitle}>Transaction History</h1>
                            <button className="button" style={styles.button} onClick={fetchTransactions}>
                                <RefreshCw size={18} />
                                Refresh
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="stats-grid" style={styles.statsGrid}>
                            <div className="stat-card" style={styles.statCard}>
                                <div style={styles.statHeader}>
                                    <span style={styles.statLabel}>Total Funding</span>
                                    <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #10b981, #34d399)" }}>
                                        <TrendingUp size={20} color="white" />
                                    </div>
                                </div>
                                <div style={styles.statValue}>${totalFunding.toLocaleString()}</div>
                                <div style={{ ...styles.statChange, color: "#34d399" }}>
                                    <ArrowUpRight size={16} />
                                    Total approved funding
                                </div>
                            </div>

                            <div className="stat-card" style={styles.statCard}>
                                <div style={styles.statHeader}>
                                    <span style={styles.statLabel}>Total Withdrawal</span>
                                    <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #ef4444, #f87171)" }}>
                                        <TrendingDown size={20} color="white" />
                                    </div>
                                </div>
                                <div style={styles.statValue}>${totalWithdrawal.toLocaleString()}</div>
                                <div style={{ ...styles.statChange, color: "#f87171" }}>
                                    <ArrowDownRight size={16} />
                                    Total approved withdrawals
                                </div>
                            </div>

                            <div className="stat-card" style={styles.statCard}>
                                <div style={styles.statHeader}>
                                    <span style={styles.statLabel}>Pending</span>
                                    <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}>
                                        <Clock size={20} color="white" />
                                    </div>
                                </div>
                                <div style={styles.statValue}>{transactions.filter(t => t.status === "pending").length}</div>
                                <div style={{ ...styles.statChange, color: "#fbbf24" }}>
                                    Awaiting approval
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div style={styles.filterSection}>
                            <div className="filter-grid" style={styles.filterGrid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Transaction Type</label>
                                    <select
                                        className="select"
                                        style={styles.select}
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        <option value="all">All Transactions</option>
                                        <option value="funding">Funding</option>
                                        <option value="withdrawal">Withdrawal</option>
                                    </select>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Search Reference</label>
                                    <div style={styles.searchWrapper}>
                                        <Search size={18} style={styles.searchIcon} />
                                        <input
                                            className="search-input"
                                            style={styles.searchInput}
                                            placeholder="Search by reference ID..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="button-group" style={styles.buttonGroup}>
                                <button className="button" style={styles.button} onClick={fetchTransactions}>
                                    <Filter size={18} />
                                    Apply Filters
                                </button>
                                <button className="button button-secondary" style={{ ...styles.button, ...styles.buttonSecondary }}>
                                    <Download size={18} />
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table for Desktop */}
                    {!isMobile ? (
                        <div style={styles.tableCard}>
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHeader}>
                                        <tr>
                                            <th style={styles.th}>Transaction</th>
                                            <th style={styles.th}>Date & Time</th>
                                            <th style={styles.th}>Amount</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Reference ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} style={{ ...styles.td, textAlign: "center", padding: "40px" }}>
                                                    <RefreshCw size={32} color="rgba(255,255,255,0.5)" style={{ animation: "spin 1s linear infinite" }} />
                                                </td>
                                            </tr>
                                        ) : transactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={5}>
                                                    <div style={styles.emptyState}>
                                                        <DollarSign style={styles.emptyIcon} />
                                                        <div style={styles.emptyText}>No transactions found</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            transactions.map((tx) => (
                                                <tr key={tx.id} className="transaction-row" style={styles.transactionRow}>
                                                    <td style={styles.td}>
                                                        <div style={styles.transactionType}>
                                                            <div style={{
                                                                ...styles.typeIcon,
                                                                background: tx.type === "funding"
                                                                    ? "linear-gradient(135deg, #10b981, #34d399)"
                                                                    : "linear-gradient(135deg, #ef4444, #f87171)"
                                                            }}>
                                                                {tx.type === "funding" ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                                            </div>
                                                            <div style={styles.typeInfo}>
                                                                <div style={styles.typeTitle}>{tx.type === "funding" ? "Funding" : "Withdrawal"}</div>
                                                                <div style={styles.typeSubtitle}>Bank Transfer</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={styles.td}>{new Date(tx.created_at).toLocaleString()}</td>
                                                    <td style={{
                                                        ...styles.td,
                                                        ...styles.amount,
                                                        color: tx.type === "funding" ? "#34d399" : "#f87171"
                                                    }}>
                                                        {tx.type === "funding" ? "+" : "-"}${tx.amount.toLocaleString()}
                                                    </td>
                                                    <td style={styles.td}>
                                                        <span style={{ ...styles.statusBadge, ...getStatusStyle(tx.status) }}>
                                                            {getStatusIcon(tx.status)}
                                                            {tx.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td style={styles.td}>{tx.reference_id}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        // Mobile Cards View
                        <div>
                            {loading ? (
                                <div style={styles.emptyState}>
                                    <RefreshCw size={32} color="rgba(255,255,255,0.5)" style={{ animation: "spin 1s linear infinite" }} />
                                </div>
                            ) : transactions.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <DollarSign style={styles.emptyIcon} />
                                    <div style={styles.emptyText}>No transactions found</div>
                                </div>
                            ) : (
                                transactions.map((tx) => (
                                    <div key={tx.id} className="mobile-card" style={styles.mobileCard}>
                                        <div style={styles.mobileCardHeader}>
                                            <div style={styles.transactionType}>
                                                <div style={{
                                                    ...styles.typeIcon,
                                                    background: tx.type === "funding"
                                                        ? "linear-gradient(135deg, #10b981, #34d399)"
                                                        : "linear-gradient(135deg, #ef4444, #f87171)"
                                                }}>
                                                    {tx.type === "funding" ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                                </div>
                                                <div style={styles.typeInfo}>
                                                    <div style={styles.typeTitle}>{tx.type === "funding" ? "Funding" : "Withdrawal"}</div>
                                                    <div style={styles.typeSubtitle}>Bank Transfer</div>
                                                </div>
                                            </div>
                                            <span style={{ ...styles.statusBadge, ...getStatusStyle(tx.status) }}>
                                                {getStatusIcon(tx.status)}
                                                {tx.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={styles.mobileCardRow}>
                                            <span style={styles.mobileCardLabel}>Amount</span>
                                            <span style={{
                                                ...styles.mobileCardValue,
                                                ...styles.amount,
                                                color: tx.type === "funding" ? "#34d399" : "#f87171"
                                            }}>
                                                {tx.type === "funding" ? "+" : "-"}${tx.amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div style={styles.mobileCardRow}>
                                            <span style={styles.mobileCardLabel}>Date</span>
                                            <span style={styles.mobileCardValue}>{new Date(tx.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div style={styles.mobileCardRow}>
                                            <span style={styles.mobileCardLabel}>Reference ID</span>
                                            <span style={styles.mobileCardValue}>{tx.reference_id}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TransactionHistoryPage;