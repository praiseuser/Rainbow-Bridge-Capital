import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

// Toast Cleaner Component – dismisses all toasts on route change
const ToastCleaner = () => {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss(); // Dismiss all active toasts when route changes
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <>
      {/* Clean up toasts on route change */}
      <ToastCleaner />

      {/* Your routes */}
      <AppRoutes />

      {/* Toaster */}
      <Toaster position="top-right" />
    </>
  );
};

export default App;
