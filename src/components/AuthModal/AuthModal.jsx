import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { authStyles } from "./styles";

const AuthModal = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState("signup"); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mode, formData);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setFormData({ name: "", email: "", password: "" });
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={authStyles.modalWrapper}>
                {/* Close Icon */}
                <IconButton onClick={onClose} sx={authStyles.closeBtn}>
                    <CloseIcon />
                </IconButton>

                <Typography sx={authStyles.title}>
                    {mode === "signup" && "Sign Up"}
                    {mode === "login" && "Login"}
                    {mode === "forgot" && "Forgot Password"}
                </Typography>

                <form onSubmit={handleSubmit} style={authStyles.form}>
                    {mode === "signup" && (
                        <TextField
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            sx={authStyles.input}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "#aaa" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    {(mode === "signup" || mode === "login" || mode === "forgot") && (
                        <TextField
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            sx={authStyles.input}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: "#aaa" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    {(mode === "signup" || mode === "login") && (
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            sx={authStyles.input}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: "#aaa" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    <Button type="submit" sx={authStyles.submitBtn}>
                        {mode === "signup" && "Sign Up"}
                        {mode === "login" && "Login"}
                        {mode === "forgot" && "Send Reset Link"}
                    </Button>
                </form>

                {/* Footer Text */}
                <Box sx={authStyles.footerText}>
                    {mode === "signup" && (
                        <>
                            Already have an account?{" "}
                            <span onClick={() => switchMode("login")} style={authStyles.linkText}>
                                Login
                            </span>
                        </>
                    )}
                    {mode === "login" && (
                        <>
                            Forgot password?{" "}
                            <span onClick={() => switchMode("forgot")} style={authStyles.linkText}>
                                Reset
                            </span>{" "}
                            | Don't have an account?{" "}
                            <span onClick={() => switchMode("signup")} style={authStyles.linkText}>
                                Sign Up
                            </span>
                        </>
                    )}
                    {mode === "forgot" && (
                        <>
                            Remembered your password?{" "}
                            <span onClick={() => switchMode("login")} style={authStyles.linkText}>
                                Login
                            </span>
                        </>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default AuthModal;
