import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, toggleTheme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberFocused, setPhoneNumberFocused] = useState<boolean>(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any non-digit characters except the first +
    const digits = value.replace(/\D/g, "");
    // Limit to 10 digits (after +7)
    if (digits.length <= 10) {
      setPhoneNumber(digits);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        {/* <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button> */}
        <div className={styles.loginForm}>
          <div className={styles.loginHeader}>
            <div className={styles.arrowBack}>
              <img src="/img/back.png" alt="back" />
            </div>
            <h1 className={styles.loginH1}>Tapgame</h1>
          </div>
          <div className={styles.messengerBlock}>
            <div className={styles.messengerItem}>
              <div style={{ marginRight: "8px" }}>
                <img src="/img/whatsapp.png" alt="whatsapp" />
              </div>
              Whatsapp
            </div>
            <div className={styles.messengerItem}>
              <div style={{ marginRight: "8px" }}>
                <img src="/img/telegram-logo.png" alt="telegram" />
              </div>
              Telegram
            </div>
          </div>

          <div className={styles.phoneInputWrapper}>
            <img
              src="/img/device.png"
              alt="device"
              style={{ marginRight: "13px", position: "absolute", top: "12px", left: "17px" }}
            />
            {phoneNumberFocused || phoneNumber.length > 0 ? (
              <span className={styles.phonePrefix}>+7</span>
            ) : null}

            <input
              className={styles.phoneInput}
              type="tel"
              id="phone"
              name="phoneNumber"
              required
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="На этот номер придет код ..."
              onFocus={() => setPhoneNumberFocused(true)}
              onBlur={() => setPhoneNumberFocused(false)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
          <button className={styles.qrButton}>
            <div style={{ marginRight: "10px" }}>
              <img src="/img/qr-code.png" alt="qr" />
            </div>
            QR
          </button>

          {/* <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button> */}
        </div>
        <p
          style={{
            width: "360px",
            textAlign: "center",
            paddingTop: "30px",
            fontSize: "14.5px",
            color: "#a1a5af"
          }}
        >
          Продолжая, Вы соглашаетесь с{" "}
          <span style={{ color: "#0cdd79" }}>Пользовательским соглашением</span> Tapgame и {""}
          <span style={{ color: "#0cdd79" }}>Политикой конфиденциальности</span> , а так же даете
          согласие на обработку <span style={{ color: "#0cdd79" }}>Персональных данных</span>
        </p>
      </div>
      <div className={styles.loginFooter}>
        <div onClick={toggleTheme}>
          <img src="/img/night-day.png" alt="night-day" />
        </div>
        <ul className={styles.footerUl}>
          <li>Қазақша</li>
          <li>Написать в поддержку</li>
          <li>© 2024, Tapgame</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
