import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Code.module.css";
import uri from "../utils/uri";
import { Watch } from "react-loader-spinner";

const Code = () => {
  // const { theme, toggleTheme } = useTheme();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [phoneNumberFocused, setPhoneNumberFocused] = useState<boolean>(false);
  const [code, setCode] = useState("");
  const [errorCode, setCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCode, setCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;

    if (countdown > 0) {
      intervalId = window.setInterval(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [countdown]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (code.length <= 6) {
        setCode(value);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (countdown > 0) return;

      setLoading(true);
      const response = await fetch(`${uri}/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: localStorage.getItem("email") })
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setCountdown(60);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (code.length !== 6) {
        return;
      }

      setCodeLoading(true);
      const response = await fetch(`${uri}/v1/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: localStorage.getItem("email"), code })
      });

      if (response.status === 400) {
        setCodeError(true);
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setCodeLoading(false);
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
            <div className={styles.arrowBack} onClick={() => navigate("/auth")}>
              <img src="/img/back.png" alt="back" />
            </div>
            <h1 style={{ opacity: "0" }} className={styles.loginH1}>
              Tapgame
            </h1>
          </div>
          <p style={{ textAlign: "center", fontSize: "20.83px" }}>
            Подтвердите с помощью кода, отправленного на ваш email
          </p>
          <p></p>
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
              src="/img/email-leter.svg"
              alt="device"
              style={{
                width: "25px",
                height: "25px",
                marginRight: "13px",
                position: "absolute",
                top: "15px",
                left: "17px"
              }}
            />

            <input
              className={styles.phoneInput}
              type="text"
              id="number"
              name="number"
              required
              value={code}
              onChange={handleCodeChange}
              placeholder="Введите код"
              maxLength={6}
              style={errorCode ? { color: "red" } : { color: "#000" }}
            />
          </div>
          <button type="submit" className={styles.submitButton} onClick={verifyCode}>
            {loadingCode ? (
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
              "Продолжить"
            )}
          </button>
          <button
            style={{ backgroundColor: "#f5f5f8", color: "#000", marginTop: "9px" }}
            className={styles.submitButton}
            onClick={sendEmail}
          >
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
              <span>
                Получить код повторно
                {countdown > 0 && (
                  <span style={{ marginLeft: "5px" }}>{formatTime(countdown)}</span>
                )}
              </span>
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
      <div className={styles.loginFooter} style={{ display: "none" }}>
        <div onClick={toggleTheme}>
          <img src="/img/night-day.png" alt="night-day" />
        </div>
        <ul className={styles.footerUl}>
          <li>Қазақша</li>
          <li>Написать в поддержку</li>
          <li> 2024, Tapgame</li>
        </ul>
      </div>
    </div>
  );
};

export default Code;
