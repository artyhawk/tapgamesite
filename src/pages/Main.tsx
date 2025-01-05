import { Header, Footer } from "../components";
import styles from "../styles/Main.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container_main}>
          <div className={styles.hero}>
            <h1 className={styles.hero__title}>Все о популярности спорта</h1>
            <p className={styles.hero__text}>
              Tap Game делает спорт прозрачным и помогает спонсорам, организаторам и зрителям узнать
              всё о популярности любого спортивного события
            </p>
          </div>
          <div className={styles.hero__sports}>
            <button
              className={classNames(styles.sports_btn, styles.sports_btn_active)}
              style={{ display: "none" }}
            >
              <img src="/img/basketball.svg" alt="basketball" />
              Баскетбол
            </button>
            <button className={styles.sports_btn}>
              <img src="/img/volleyball.png" alt="volleyball" />
              Волейбол
            </button>
            <button className={styles.sports_btn} style={{ display: "none" }}>
              <img src="/img/football.svg" alt="football" />
              Футбол
            </button>
          </div>
          <section className={styles["tournament"]}>
            {/* Блок баннер + инфо */}
            <div className={styles.tournament_wrapper}>
              <div className={styles.tournamet_wrapper_under}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div className={styles.tournament__icon__text}>
                    <div className={styles.trophy_box}>
                      <img src="/img/trophy1.png" alt="trophy" />
                    </div>
                    Турниры
                  </div>
                  <div className={styles.tournament__subscribe}>
                    <div>
                      <img src="/img/notification.png" alt="notification" />
                    </div>
                    Подписаться
                  </div>
                </div>
                <div className={styles["tournament__banner"]}>
                  <img
                    src="/img/basketball-banner.png"
                    alt="Basketball Tournament Banner"
                    className={styles["tournament__img"]}
                  />
                  <div className={styles["tournament__info"]}>
                    <div className={styles["tournament__title-wrapper"]}>
                      <div className={styles["tournament__img-big"]}>
                        <img src="/img/basketball3.png" />
                      </div>
                      <h2 className={styles["tournament__title"]}>3x3 Basket 2024/2025</h2>
                    </div>
                    <p className={styles["tournament__description"]}>
                      Присоединяйтесь к главному баскетбольному турниру года! Динамичный дизайн с
                      главными фишками в ярких оттенках синего и оранжевого стимулирует энергию и
                      страсть к игре.
                    </p>
                    <div className={styles["tournament__btn-wrapper"]}>
                      <div
                        className={styles["tournament__btn"]}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            navigate("apply");
                          } else {
                            navigate("auth");
                          }
                        }}
                      >
                        Участвовать
                      </div>
                      <div className={styles["tournament__links-wrapper"]}>
                        <div className={styles["tournament__info-link"]}>
                          <img src="/img/info.png" alt="info" />
                        </div>
                        <div className={styles["tournament__info-link"]}>
                          <img src="/img/whatsapp.png" alt="WhatsApp" />
                        </div>
                        <div className={styles["tournament__info-link"]}>
                          <img src="/img/instagram.png" alt="Instagram" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Блок с ближайшими турнирами */}
              <div style={{ minWidth: "244px" }} className={styles.tournamet_wrapper_upcoming}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div className={styles.tournament__icon__text}>
                    <div className={styles.trophy_box}>
                      <img src="/img/flash.png" alt="flash" />
                    </div>
                    Ближайшие турниры
                  </div>
                </div>
                <div className={styles["tournament__upcoming"]}>
                  <ul className={styles["tournament__list"]}>
                    <li className={styles["tournament__item"]}>
                      <img src="/img/basketball3.png" />
                      <div>
                        <div className={styles["tournament__item-title"]}>3х3 Basket 2024/2025</div>
                        <div className={styles["tournament__item-date"]}>
                          15 янв. - 21 фев. 2025 года
                        </div>
                      </div>
                    </li>
                    <li className={styles["tournament__item"]}>
                      <img src="/img/basketball3.png" />
                      <div>
                        <div className={styles["tournament__item-title"]}>3х3 Basket 2024/2025</div>
                        <div className={styles["tournament__item-date"]}>
                          15 янв. - 21 фев. 2025 года
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles["news"]}>
              <div className={styles["news__header"]}>
                <div className={styles.tournament__icon__text}>
                  <div className={styles.trophy_box}>
                    <img src="/img/megaphone-news.png" alt="news" />
                  </div>
                  Новости
                </div>
                <div className={styles["news__btn-all"]}>
                  Все новости компании
                  <div style={{ marginLeft: "16px" }}>
                    <img src="/img/arrow-right.png" alt="arrow-right" />
                  </div>
                </div>
              </div>
              <div className={styles["news__items"]}>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
              </div>
              <div className={styles["download__tapgame"]}>
                <div className={styles["qr__image"]}>
                  <img src="/img/QR.png" alt="QR" />
                </div>
                <div className={styles["qr__info"]}>
                  <div className={styles["qr__title"]}>
                    Скачай TapGame - Играй и побеждай без ограничений!
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "6px" }}>
                      <img src="/img/ios.png" alt="ios" />
                    </div>
                    <div>
                      <img src="/img/android.png" alt="android" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className={styles.patners}>
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.patners__title}>Нам доверяют:</div>
              <div>
                <img src="/img/freedom.png" alt="freedom" />
              </div>
            </div>
            <div className={styles.patners__subtitle_button}>Станьте нашим клиентом</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
