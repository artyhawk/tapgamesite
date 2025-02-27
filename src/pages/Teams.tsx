import { Header, Footer } from "../components";
import styles from "../styles/Teams.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithCors } from "../utils/api";
import type { PlayerData } from "../types/api";

const Teams = () => {
  const { tournamentId } = useParams();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await fetchWithCors<PlayerData[]>(`/tournament_team/${tournamentId}/users/`);
        setPlayers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchPlayers();
    }
  }, [tournamentId]);

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
                <li className={styles.activeTab}>О турнире</li>
                <li>Участники</li>
                <li>Турнирная сетка</li>
                <li>Статистика</li>
                <li onClick={() => navigate("/tournament/media")}>Медиа</li>
              </ul>
            </nav>
          </section>

          {/* Весь контент с таблицами + сайдбар в общем контейнере */}
          <div className={styles.container_main}>
            <div className={styles.mainContent}>
              {/* Левая колонка - таблицы */}
              <div className={styles.leftColumn}>
                <div className={styles.searchWrapper}>
                  <div className={styles.searchInputContainer}>
                    <svg
                      className={styles.searchIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                        stroke="#8C8A95"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input type="text" placeholder="Найти команду по названию" />
                  </div>
                  <div className={styles.tableTabs}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Команды
                      </option>
                      <option value="overall">Общий зачет</option>
                      <option value="groupA">Группа А</option>
                    </select>
                  </div>
                </div>
                {/* Table 1 */}
                <div className={styles.headSepTitle}>Статистика по игрокам в турнире</div>
                <div className={styles.tableWrapper}>
                  <table className={styles.statsTable}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Игрок</th>
                        <th>Команда</th>
                        <th>Город</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={4} className={styles.scoreCell}>
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={4} className={styles.scoreCell}>
                            {error}
                          </td>
                        </tr>
                      ) : players.length === 0 ? (
                        <tr>
                          <td colSpan={4} className={styles.scoreCell}>
                            No players found
                          </td>
                        </tr>
                      ) : (
                        players.map(player => (
                          <tr key={player.id}>
                            <td className={styles.scoreCell}>{player.team_user.number || "-"}</td>
                            <td className={styles.scoreCell}>
                              {`${player.team_user.user.last_name} ${player.team_user.user.first_name}`}
                            </td>
                            <td className={styles.scoreCell}>{player.tournament_team.name}</td>
                            <td className={styles.scoreCell}>
                              {player.tournament_team.team.city.name}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
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
                        Страна
                      </option>
                      <option value="overall">Общий зачет</option>
                      <option value="groupA">Группа А</option>
                    </select>
                  </div>
                  <div className={styles.filterTabs}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Город
                      </option>
                      <option value="overall">Общий зачет</option>
                      <option value="groupA">Группа А</option>
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

export default Teams;
