import { Header, Footer } from "../components";
import styles from "../styles/Media.module.css";
import { useNavigate } from "react-router-dom";

const Media = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container_main}>
          <p className={styles.tournamentInfoP}>Tap Game &gt; Турниры &gt; Tapgo cup</p>
          <div className={styles.timeQuarter}>
            <img
              style={{ width: "13px", height: "13px", marginRight: "7px" }}
              src="/img/time-quarter-to.png"
              alt="time-quarter"
            />
            Прием заявок
          </div>
          <div className={styles.tournamentNameContainer}>
            <div className={styles.tournamentName}>
              <img style={{ marginRight: "10px" }} src="/img/tapgocup-icon.png" alt="tapgocup" />{" "}
              Tapgo cup
            </div>
            <div className={styles.tournamentNameGradient}>
              <button type="submit" className={styles["submit-button"]}>
                Участвовать
              </button>
            </div>
          </div>
          {/* Название турнира и навигация */}
          <section className={styles.titleAndTabs}>
            <nav className={styles.tabs}>
              <ul>
                <li onClick={() => navigate("/tournament/")}>О турнире</li>
                <li onClick={() => navigate("/tournament/teams/players")}>Участники</li>
                <li>Турнирная сетка</li>
                <li>Статистика</li>
                <li className={styles.activeTab}>Медиа</li>
              </ul>
            </nav>
          </section>

          {/* Весь контент с таблицами + сайдбар в общем контейнере */}
          <div className={styles.container_main}>
            <div className={styles.mainContent}>
              {/* Левая колонка - таблицы */}
              <div className={styles.leftColumn}>
                <div className={styles.mediaContainer}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      color: "#fff",
                      fontSize: "10.42px"
                    }}
                  >
                    <img
                      src="/img/logo.svg"
                      alt="logo"
                      style={{ width: "136px", height: "64px", marginBottom: "60px" }}
                    />
                    Организатор еще не загрузил галерею
                  </div>
                </div>
              </div>

              {/* Правая колонка - баннер + блок "О турнире" */}
              <aside className={styles.sidebar}>
                <div className={styles.filterWrapper}>
                  <div
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#1f1f24",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px"
                    }}
                  >
                    <div>
                      <img
                        style={{ width: "15px", height: "15px" }}
                        src="/img/filter-white.png"
                        alt="filter"
                      />
                    </div>
                  </div>
                  Фильтр
                </div>
                <div className={styles.selectBox}>
                  <div className={styles.filterTabs} style={{ marginBottom: "13px" }}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Тип медиа
                      </option>
                      <option value="overall">Фото</option>
                      <option value="overall">Видео</option>
                    </select>
                  </div>
                  <div className={styles.filterTabs} style={{ marginBottom: "13px" }}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Тур
                      </option>
                    </select>
                  </div>
                  <div className={styles.filterTabs}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Команда
                      </option>
                    </select>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Media;
