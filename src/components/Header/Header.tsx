import styles from "./Header.module.css";
import { useState } from "react";
// import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.nav__menu_left_wrapper}>
            <div className={styles.nav__logo} onClick={() => navigate("/")}>
              <img style={{ width: "81px" }} src="/img/logo.svg" alt="logo" />
            </div>
            <ul className={styles.nav__menu_left}>
              <li>Турниры</li>
              <li>Спорт</li>
              <li>О нас</li>
              <li> Проекты</li>
            </ul>
          </div>
          <ul className={styles.nav__menu_right}>
            <li style={{ marginRight: "16px" }}>
              <img
                className={styles.icon}
                style={{ width: "13px", height: "13px" }}
                src="/img/search.svg"
                alt="seach"
              />
            </li>
            <li style={{ marginRight: "20px" }}>
              <img
                className={styles.icon}
                style={{ width: "13px", height: "13px" }}
                src="/img/interface.svg"
                alt="interface"
              />
            </li>
            {token ? (
              <li
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken("");
                }}
                style={{ marginRight: "16px", cursor: "pointer" }}
              >
                Выйти
              </li>
            ) : (
              <li
                onClick={() => navigate("/auth")}
                style={{ marginRight: "16px", cursor: "pointer" }}
              >
                Войти
              </li>
            )}
            <li>
              <img
                className={styles.icon}
                style={{ width: "16px", height: "14px" }}
                src="/img/translate.svg"
                alt="translate"
              />
            </li>
          </ul>
        </nav>

        <nav className={styles.nav_mobile}>
          <div>
            <img src="/img/burger-menu.png" alt="burger" />
          </div>
          <div className={styles.nav__logo}>
            <img style={{ width: "59px" }} src="/img/logo-white.svg" alt="logo" />
          </div>
          <ul className={styles.nav__menu_right}>
            <li style={{ marginRight: "9px" }}>
              <img
                className={styles.icon}
                style={{ width: "13px", height: "13px" }}
                src="/img/search.svg"
                alt="seach"
              />
            </li>
            <li style={{ marginRight: "9px" }}>
              <img
                className={styles.icon}
                style={{ width: "13px", height: "13px" }}
                src="/img/interface.svg"
                alt="interface"
              />
            </li>
            <li style={{ marginRight: "9px" }}>
              <img
                className={styles.icon}
                style={{ width: "16px", height: "14px" }}
                src="/img/translate.svg"
                alt="translate"
              />
            </li>

            <li>
              <img className={styles.icon} src="/img/user-white.png" alt="user" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
