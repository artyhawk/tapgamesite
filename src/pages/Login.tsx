import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useTheme } from "../context/ThemeContext";
import { Watch } from "react-loader-spinner";
import uri from "../utils/uri";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const { theme, toggleTheme } = useTheme();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);
  };
  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (email.length) {
        setLoading(true);
        const response = await fetch(`${uri}/v1/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const data = await response.json();
        if (data.message === "Email was sent") {
          localStorage.setItem("email", email);
          navigate("/auth/code");
        }

        return data;
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Here you might want to set an error state to show to the user
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [phoneNumberFocused, setPhoneNumberFocused] = useState<boolean>(false);
  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   // Remove any non-digit characters except the first +
  //   const digits = value.replace(/\D/g, "");
  //   // Limit to 10 digits (after +7)
  //   if (digits.length <= 10) {
  //     setPhoneNumber(digits);
  //   }
  // };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        {/* <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button> */}
        <form className={styles.loginForm}>
          <div className={styles.loginHeader}>
            <div
              className={styles.arrowBack}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img style={{ width: "21px" }} src="/img/back.svg" alt="back" />
            </div>
            <h1 className={styles.loginH1}>Tapgame</h1>
          </div>
          <div className={styles.messengerBlock}>
            {/* <div className={styles.messengerItem}>
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
            </div> */}
            <div className={styles.messengerItem}>
              <div style={{ marginRight: "8px" }}>
                <img
                  src="/img/email-black.svg"
                  alt="email"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              Email
            </div>
          </div>

          {/* <div className={styles.phoneInputWrapper}>
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
          </div> */}
          <div className={styles.phoneInputWrapper}>
            <img
              src="/img/envelope-open.png"
              alt="device"
              style={{
                width: "20px",
                marginRight: "13px",
                position: "absolute",
                top: "15px",
                left: "17px"
              }}
            />

            <input
              className={styles.phoneInput}
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="На этот email придет код ..."
            />
          </div>
          <button type="submit" className={styles.submitButton} onClick={sendEmail}>
            {loading ? (
              <Watch
                height={20}
                width={20}
                color="#fff"
                visible={true}
                wrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            ) : (
              "Войти"
            )}
          </button>
          {/* <button className={styles.qrButton}>
            <div style={{ marginRight: "10px" }}>
              <img src="/img/qr-code.png" alt="qr" />
            </div>
            QR
          </button> */}

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
        </form>
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
      <div className={styles.loginFooter} style={{ display: "none" }}>
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
