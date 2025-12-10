// src/components/Admin/AdminSettings/AdminSettings.jsx
import { useState } from "react";
import styles from "./styles";

const Setting = () => {
  const [siteName, setSiteName] = useState("Rainbow Bridge Capital");
  const [theme, setTheme] = useState("Dark");

  const handleSave = () => {
    alert(`Settings saved:\nSite Name: ${siteName}\nTheme: ${theme}`);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Admin Settings</h2>

      <div style={styles.formWrapper}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Site Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.input}
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
          </select>
        </div>

        <button onClick={handleSave} style={styles.saveBtn}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Setting;
