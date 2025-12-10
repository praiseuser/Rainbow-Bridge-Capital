// src/components/Admin/WalletManagement/WalletManagement.jsx
import { useState } from "react";
import styles from "./styles";

const wallets = [
    { id: 1, user: "John Doe", balance: "₦50,000" },
    { id: 2, user: "Mary Okafor", balance: "₦120,000" },
    { id: 3, user: "James Obi", balance: "₦75,000" },
];

const Wallet = () => {
    const [userWallets, setUserWallets] = useState(wallets);

    const handleUpdateBalance = (id) => {
        const newBalance = prompt("Enter new balance:");
        if (newBalance) {
            setUserWallets(
                userWallets.map((wallet) =>
                    wallet.id === id ? { ...wallet, balance: `₦${newBalance}` } : wallet
                )
            );
        }
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>Wallet Management</h2>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Balance</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userWallets.map((wallet) => (
                            <tr key={wallet.id} style={styles.row}>
                                <td style={styles.td}>{wallet.id}</td>
                                <td style={styles.td}>{wallet.user}</td>
                                <td style={styles.td}>{wallet.balance}</td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.updateBtn}
                                        onClick={() => handleUpdateBalance(wallet.id)}
                                    >
                                        Update Balance
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wallet;
