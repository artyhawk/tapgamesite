import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useState } from "react";
import { Header, Footer } from "../components";
import styles from "../styles/Main.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const Main = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("basketball");
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
              className={classNames(styles.sports_btn, {
                [styles.sports_btn_active]: tab === "basketball"
              })}
              onClick={() => setTab("basketball")}
            >
              <img src="/img/basketball.svg" alt="basketball" />
              Баскетбол
            </button>
            <button
              className={classNames(styles.sports_btn, {
                [styles.sports_btn_active]: tab === "volleyball"
              })}
              onClick={() => setTab("volleyball")}
            >
              <img src="/img/game.svg" alt="volleyball" />
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
                      <img src="/img/trophy.png" alt="trophy" />
                    </div>
                    Турниры
                  </div>
                  <div className={styles.tournament__subscribe}>
                    <div style={{ width: "13px", height: "13px", marginRight: "5px" }}>
                      <img src="/img/notification.png" alt="notification" />
                    </div>
                    Подписаться
                  </div>
                </div>
                <SwitchTransition>
                  <CSSTransition
                    key={tab} // ключ, по которому React будет понимать, что "контент" меняется
                    timeout={300} // длительность анимации (в мс)
                    classNames="fade" // корень имён классов анимации (см. ниже в CSS)
                    unmountOnExit // чтобы старый блок удалялся из DOM по окончании анимации
                  >
                    {tab === "basketball" ? (
                      <div className={styles["tournament__banner"]}>
                        <img
                          src="/img/basket.jpg"
                          alt="Basketball Tournament Banner"
                          className={styles["tournament__img"]}
                        />
                        <div className={styles["tournament__info"]}>
                          <div className={styles["tournament__title-wrapper"]}>
                            <div className={styles["tournament__img-big"]}>
                              <img
                                src="/img/beach-volleyball.png"
                                style={{ width: "32px", height: "32px" }}
                                alt="volleyball"
                              />
                            </div>
                            <h2 className={styles["tournament__title"]}>JUMP 5x5 SHYMKENT</h2>
                          </div>
                          <p className={styles["tournament__description"]}>
                            Ты готов почувствовать настоящий ритм баскетбола? Тогда твое место на
                            площадке JUMP 5x5 SHYMKENT! Это не просто турнир – это битва амбиций,
                            силы и командного духа!
                          </p>
                          <div className={styles["tournament__btn-wrapper"]}>
                            <div
                              className={styles["tournament__btn"]}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const tournamentTitle =
                                  tab === "basketball"
                                    ? "JUMP 5x5 SHYMKENT"
                                    : "ПРК - Первенство РК среди частных волейбольных школ.";

                                if (localStorage.getItem("token")) {
                                  navigate("apply", { state: { tournamentInfo: tournamentTitle } });
                                } else {
                                  navigate("auth");
                                }
                              }}
                            >
                              Участвовать
                            </div>
                            <div className={styles["tournament__links-wrapper"]}>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/info.png"
                                  alt="info"
                                  style={{ width: "8px", height: "16px" }}
                                />
                              </div>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/whatsapp.png"
                                  alt="WhatsApp"
                                  style={{ width: "16px" }}
                                />
                              </div>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/instagram.png"
                                  alt="Instagram"
                                  style={{ width: "16px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles["tournament__banner"]}>
                        <img
                          src="/img/voleyball.jpg"
                          alt="Basketball Tournament Banner"
                          className={styles["tournament__img"]}
                        />
                        <div className={styles["tournament__info"]}>
                          <div className={styles["tournament__title-wrapper"]}>
                            <div className={styles["tournament__img-big"]}>
                              <img
                                src="/img/beach-volleyball.png"
                                style={{ width: "32px", height: "32px" }}
                                alt="volleyball"
                              />
                            </div>
                            <h2 className={styles["tournament__title"]}>
                              ПРК - Первенство РК среди частных волейбольных школ.
                            </h2>
                          </div>
                          <p className={styles["tournament__description"]}>
                            Пришло время выйти на площадку, где встречаются лучшие! Участвуй в
                            молодежном турнире по волейболу ПРК – стань частью захватывающей борьбы,
                            энергии и настоящего командного духа!
                          </p>
                          <div className={styles["tournament__btn-wrapper"]}>
                            <div
                              className={styles["tournament__btn"]}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const tournamentTitle =
                                  tab === "basketball"
                                    ? "JUMP 5x5 SHYMKENT"
                                    : "ПРК - Первенство РК среди частных волейбольных школ.";
                                if (localStorage.getItem("token")) {
                                  navigate("apply", { state: { tournamentInfo: tournamentTitle } });
                                } else {
                                  navigate("auth");
                                }
                              }}
                            >
                              Участвовать
                            </div>
                            <div className={styles["tournament__links-wrapper"]}>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/info.png"
                                  alt="info"
                                  style={{ width: "8px", height: "16px" }}
                                />
                              </div>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/whatsapp.png"
                                  alt="WhatsApp"
                                  style={{ width: "16px" }}
                                />
                              </div>
                              <div className={styles["tournament__info-link"]}>
                                <img
                                  src="/img/instagram.png"
                                  alt="Instagram"
                                  style={{ width: "16px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CSSTransition>
                </SwitchTransition>
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
                      <img src="/img/flash.svg" alt="flash" />
                    </div>
                    Ближайшие турниры
                  </div>
                </div>
                <div className={styles["tournament__upcoming"]}>
                  <ul className={styles["tournament__list"]}>
                    <li className={styles["tournament__item"]}>
                      <img
                        src="/img/beach-volleyball.png"
                        style={{ width: "32px", height: "32px" }}
                      />
                      <div>
                        <div className={styles["tournament__item-title"]}>ПРК</div>
                        <div className={styles["tournament__item-date"]}>
                          22 мар. - 27 мар. 2025 года
                        </div>
                      </div>
                    </li>
                    <li className={styles["tournament__item"]}>
                      <img src="/img/basketball.svg" style={{ width: "32px", height: "32px" }} />
                      <div>
                        <div className={styles["tournament__item-title"]}>JUMP 5x5 SHYMKENT</div>
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
                    <img src="/img/megaphone-ultra.png" alt="news" />
                  </div>
                  Новости
                </div>
                <div className={styles["news__btn-all"]}>
                  Все новости Tapgame
                  <div style={{ marginLeft: "16px" }}>
                    <img
                      style={{ width: "11px", height: "9px" }}
                      src="/img/next-white.png"
                      alt="arrow-right"
                    />
                  </div>
                </div>
              </div>
              <div className={styles["news__items"]}>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/voley-img.webp" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Турнир по волейболу стартует уже через несколько дней!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
                <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/basketball.webp" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div>
                {/* <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div> */}
                {/* <div className={styles["news__item"]}>
                  <div className={styles["news__item-img"]}>
                    <img src="/img/news1.png" alt="news1" />
                  </div>
                  <div className={styles["news__item-info"]}>
                    <div className={styles["news__item-title"]}>
                      Большая игра: Баскетбольный турнир года стартует уже в эти выходные!
                    </div>
                    <div className={styles["news__item-date"]}>15 янв 2025</div>
                  </div>
                </div> */}
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
                      <img
                        src="/img/game2.svg"
                        alt="ios"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </div>
                    <div>
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src="/img/android.svg"
                        alt="android"
                      />
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
                <img
                  src="/img/freedom.png"
                  alt="freedom"
                  style={{ width: "80px", height: "24px" }}
                />
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
