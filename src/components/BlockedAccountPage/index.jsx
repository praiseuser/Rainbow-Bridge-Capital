// BlockedAccountPage.jsx
import { Box, Typography, Button } from "@mui/material";
import { Block } from "@mui/icons-material";

const BlockedAccountPage = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        }}>
            <Box sx={{
                textAlign: 'center',
                color: 'white',
                p: 4,
                maxWidth: 500
            }}>
                <Block sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    Account Blocked
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Your account has been temporarily blocked. Please contact our customer support team for assistance.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: '#dc2626',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onClick={() => window.location.href = 'mailto:support@yourplatform.com'}
                >
                    Contact Support
                </Button>
            </Box>
        </Box>
    );
};

export default BlockedAccountPage;