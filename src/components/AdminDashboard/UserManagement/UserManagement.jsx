import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Chip,
    Button,
    Avatar,
    IconButton,
    TextField,
    InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import ApproveUserModal from "./ApproveUserModal/ApproveUserModal";

const users = [
    { id: 1, name: "John Doe", email: "john@gmail.com", balance: "₦50,000", verified: false },
    { id: 2, name: "Mary Okafor", email: "mary@gmail.com", balance: "₦120,000", verified: true },
    { id: 3, name: "James Obi", email: "james@gmail.com", balance: "₦75,000", verified: false },
];

const UserManagement = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleApproveClick = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    return (
        <Box sx={styles(theme, isDark).container}>
            {/* Header */}
            <Box sx={styles(theme, isDark).header}>
                <Box>
                    <Typography sx={styles(theme, isDark).title}>User Management</Typography>
                    <Typography sx={styles(theme, isDark).subtitle}>
                        {users.length} total users
                    </Typography>
                </Box>

                <TextField
                    placeholder="Search users..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={styles(theme, isDark).searchField}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* User Cards */}
            <Box sx={styles(theme, isDark).cardGrid}>
                {users.map((user, index) => (
                    <Paper
                        key={user.id}
                        elevation={0}
                        sx={{
                            ...styles(theme, isDark).userCard,
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        {/* Card Header */}
                        <Box sx={styles(theme, isDark).cardHeader}>
                            <Box sx={styles(theme, isDark).userInfo}>
                                <Avatar sx={styles(theme, isDark).avatar}>
                                    {user.name.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography sx={styles(theme, isDark).userName}>
                                        {user.name}
                                    </Typography>
                                    <Typography sx={styles(theme, isDark).userEmail}>
                                        {user.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Chip
                                icon={
                                    user.verified ? (
                                        <CheckCircleIcon sx={{ fontSize: "1rem" }} />
                                    ) : (
                                        <PendingIcon sx={{ fontSize: "1rem" }} />
                                    )
                                }
                                label={user.verified ? "Verified" : "Pending"}
                                size="small"
                                sx={{
                                    ...styles(theme, isDark).statusChip,
                                    background: user.verified
                                        ? `${theme.palette.accent.gold}20`
                                        : `${theme.palette.accent.coral}20`,
                                    color: user.verified
                                        ? theme.palette.accent.gold
                                        : theme.palette.accent.coral,
                                }}
                            />
                        </Box>

                        {/* Balance */}
                        <Box sx={styles(theme, isDark).balanceBox}>
                            <Typography sx={styles(theme, isDark).balanceLabel}>
                                Current Balance
                            </Typography>
                            <Typography sx={styles(theme, isDark).balanceAmount}>
                                {user.balance}
                            </Typography>
                        </Box>

                        {/* Actions */}
                        <Box sx={styles(theme, isDark).actions}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={styles(theme, isDark).approveBtn}
                                onClick={() => handleApproveClick(user)}
                            >
                                Approve
                            </Button>
                            <IconButton sx={styles(theme, isDark).editBtn}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
            </Box>

            <ApproveUserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                user={selectedUser}
            />
        </Box>
    );
};

const styles = (theme, isDark) => ({
    container: {
        p: { xs: 2, md: 3 },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 4,
    },

    title: {
        fontSize: { xs: "1.5rem", md: "1.8rem" },
        fontWeight: 800,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },

    subtitle: {
        fontSize: "0.9rem",
        color: theme.palette.text.secondary,
        mt: 0.5,
    },

    searchField: {
        minWidth: { xs: "100%", sm: "300px" },
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
        },
    },

    cardGrid: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
        },
        gap: 3,
    },

    userCard: {
        p: 3,
        borderRadius: "20px",
        background: isDark
            ? "rgba(255,255,255,0.05)"
            : theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s",
        animation: "fadeSlideUp 0.4s ease-out backwards",
        "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 30px ${theme.palette.primary.main}20`,
            borderColor: theme.palette.primary.main,
        },
    },

    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 3,
    },

    userInfo: {
        display: "flex",
        alignItems: "center",
        gap: 2,
    },

    avatar: {
        width: 48,
        height: 48,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        fontWeight: 700,
        fontSize: "1.2rem",
    },

    userName: {
        fontSize: "1.1rem",
        fontWeight: 700,
        color: theme.palette.text.primary,
    },

    userEmail: {
        fontSize: "0.85rem",
        color: theme.palette.text.secondary,
        mt: 0.3,
    },

    statusChip: {
        fontWeight: 700,
        fontSize: "0.75rem",
        height: "28px",
    },

    balanceBox: {
        p: 2,
        borderRadius: "12px",
        background: isDark
            ? "rgba(255,255,255,0.03)"
            : "rgba(0,0,0,0.02)",
        mb: 2,
    },

    balanceLabel: {
        fontSize: "0.8rem",
        color: theme.palette.text.secondary,
        mb: 0.5,
    },

    balanceAmount: {
        fontSize: "1.5rem",
        fontWeight: 800,
        color: theme.palette.primary.main,
    },

    actions: {
        display: "flex",
        gap: 1,
    },

    approveBtn: {
        py: 1.2,
        borderRadius: "10px",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.accent.pink})`,
        textTransform: "none",
        fontWeight: 700,
        flex: 1,
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
        },
    },

    editBtn: {
        background: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        color: theme.palette.text.primary,
        "&:hover": {
            background: theme.palette.action.hover,
            transform: "scale(1.05)",
        },
    },

    "@keyframes fadeSlideUp": {
        from: { opacity: 0, transform: "translateY(30px)" },
        to: { opacity: 1, transform: "translateY(0)" },
    },
});

export default UserManagement;