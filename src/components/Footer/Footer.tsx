import styles from "./Footer.module.css";
// import classNames from "classnames";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["container_main"]}>
        <div className={styles.footerWrapper}>
          <div className={styles["footer__left"]}>
            <div className={styles["footer__logo"]}>
              <img src="/img/tapgame-logо-white.png" alt="logo" />
            </div>
            <div>
              <div className={styles["footer__text"]}>
                По любым вопросам обращайтесь на наш email:
              </div>
              <div className={styles["footer__email"]}>mailbox@tapgegame.kz</div>
            </div>
          </div>
          <div>
            <div className={styles["footer__copyright"]}>© 2025 TAPGAME. BIN 191240011379</div>
            <div className={styles.footer_box}>
              <img src="/img/instagram-footer.png" alt="instagram" />
            </div>
          </div>
        </div>
        <div className={styles.footerWrapperMobile}>
          <div className={styles["footer__logo"]}>
            <img src="/img/tapgame-logо-white.png" alt="logo" />
          </div>
          <div style={{ marginBottom: "6px" }}>
            <div className={styles["footer__text"]}>
              По любым вопросам обращайтесь на наш email:
            </div>
            <div className={styles["footer__email"]}>mailbox@tapgegame.kz</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div className={styles.footer_box}>
              <img src="/img/instagram-footer.png" alt="instagram" />
            </div>
            <div className={styles["footer__copyright"]}>© 2024 TAPGAME. BIN 191240011379</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
