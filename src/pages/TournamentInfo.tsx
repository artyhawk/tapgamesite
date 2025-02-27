import { Header, Footer } from "../components";
import styles from "../styles/TournamentInfo.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TeamData {
  id: number;
  team: {
    id: number;
    name: string;
    city: {
      name: string;
    };
    logo: string;
  };
  games_count: number;
  won_games_count: number;
  lose_games_count: number;
  won_games_percent: number;
  plus_minus: string;
}

const TournamentInfo = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("https://mtgame.ru/api/v1/tournament/2070/teams/");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

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
                <li onClick={() => navigate("/tournament/teams/players")}>Участники</li>
                <li>Турнирная сетка</li>
                <li>Статистика</li>
                <li onClick={() => navigate("/tournament/media")}>Медиа</li>
              </ul>
            </nav>
          </section>
          <div className={styles.statisticsTitle}>
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
                  style={{ width: "13px", height: "13px" }}
                  src="/img/chart-pie-alt.png"
                  alt="statistics"
                />
              </div>
            </div>
            Общая статистика
          </div>
          {/* Весь контент с таблицами + сайдбар в общем контейнере */}
          <div className={styles.container_main}>
            <div className={styles.mainContent}>
              {/* Левая колонка - таблицы */}
              <div className={styles.leftColumn}>
                <div className={styles.statisticsContainer}>
                  <div className={styles.statisticsRow}>
                    <div className={styles.statisticsItem}>
                      <div className={styles.statisticsIcon}>
                        <img src="/img/basketball.svg" alt="teams" style={{ marginRight: "5px" }} />
                        Команд
                      </div>
                      <div className={styles.statisticsValue}>-</div>
                    </div>
                    <div className={styles.statisticsItem}>
                      <div className={styles.statisticsIcon}>
                        <img
                          src="/img/volleyball-man.png"
                          alt="teams"
                          style={{ marginRight: "5px" }}
                        />
                        Игроков
                      </div>
                      <div className={styles.statisticsValue}>-</div>
                    </div>
                    <div className={styles.statisticsItem}>
                      <div className={styles.statisticsIcon}>
                        <img src="/img/volley-net.png" alt="teams" style={{ marginRight: "5px" }} />
                        Матчей
                      </div>
                      <div className={styles.statisticsValue}>-</div>
                    </div>
                    <div className={styles.statisticsItem}>
                      <div className={styles.statisticsIcon}>
                        <img
                          src="/img/whistle-icon.png"
                          alt="teams"
                          style={{ marginRight: "5px" }}
                        />
                        Судьей
                      </div>
                      <div className={styles.statisticsValue}>-</div>
                    </div>
                    <div className={styles.statisticsItem}>
                      <div className={styles.statisticsIcon}>
                        <img src="/img/group-icon.png" alt="teams" style={{ marginRight: "5px" }} />
                        Зрители
                      </div>
                      <div className={styles.statisticsValue}>-</div>
                    </div>
                  </div>
                </div>
                <div className={styles.tableHeader}>
                  <div className={styles.statisticsTitle} style={{ marginBottom: "0" }}>
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
                          style={{ width: "13px", height: "13px" }}
                          src="/img/chart-pie-alt.png"
                          alt="statistics"
                        />
                      </div>
                    </div>
                    Турнирная таблица
                  </div>
                  <div className={styles.tableTabs}>
                    <select name="groupSelect" id="groupSelect" defaultValue="">
                      <option value="" disabled selected>
                        Группы
                      </option>
                      <option value="overall">Общий зачет</option>
                      <option value="groupA">Группа А</option>
                    </select>
                  </div>
                </div>
                {/* Table 1 */}
                <div>
                  <div className={styles.headSepTitle}>Общий зачет</div>
                  <div className={styles.tableWrapper}>
                    <table className={styles.statsTable}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Команды</th>
                          <th>Матчей проведено</th>
                          <th>Побед</th>
                          <th>Поражения</th>
                          <th>% побед</th>
                          <th>Разница мячей</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((team, index) => (
                          <tr
                            key={team.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/tournament/${team.id}/teams`)}
                          >
                            <td>{index + 1}</td>
                            <td>
                              <div className={styles.playerCell}>
                                <img
                                  src={team.team.logo || "/img/empty-logo-basketball.png"}
                                  alt="team"
                                />
                                <div>
                                  <div className={styles.playerName}>{team.team.name}</div>
                                  <div className={styles.playerTeam}>{team.team.city.name}</div>
                                </div>
                              </div>
                            </td>
                            <td>{team.games_count}</td>
                            <td className={styles.scoreCell}>{team.won_games_count}</td>
                            <td>{team.lose_games_count}</td>
                            <td>{team.won_games_percent}%</td>
                            <td>{team.plus_minus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Table 2 */}
                <div style={{ display: "none" }}>
                  <div className={styles.headSepTitle}>Группа А</div>
                  <div className={styles.tableWrapper}>
                    <table className={styles.statsTable}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Игрок</th>
                          <th>Сыграно матчей</th>
                          <th>Очки</th>
                          <th>Подборы</th>
                          <th>Передачи</th>
                          <th>Блокшоты</th>
                          <th>Перехваты</th>
                          <th>Потери</th>
                          <th>2 очковых</th>
                          <th>% 2 очковых</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <div className={styles.playerCell}>
                              <img src="/img/team-image-example.png" alt="player" />
                              <div>
                                <div className={styles.playerName}>Никулочки</div>
                                <div className={styles.playerTeam}>Шымкент</div>
                              </div>
                            </div>
                          </td>
                          <td>1</td>
                          <td className={styles.scoreCell}>6</td>
                          <td>1</td>
                          <td>2</td>
                          <td>0</td>
                          <td>2</td>
                          <td>2</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className={styles.playerCell}>
                              <img src="/img/team-image-example.png" alt="player" />
                              <div>
                                <div className={styles.playerName}>Пармалат</div>
                                <div className={styles.playerTeam}>Шымкент</div>
                              </div>
                            </div>
                          </td>
                          <td>1</td>
                          <td className={styles.scoreCell}>6</td>
                          <td>2</td>
                          <td>2</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className={styles.playerCell}>
                              <img src="/img/team-image-example.png" alt="player" />
                              <div>
                                <div className={styles.playerName}>Миркаб</div>
                                <div className={styles.playerTeam}>Шымкент</div>
                              </div>
                            </div>
                          </td>
                          <td>1</td>
                          <td className={styles.scoreCell}>4</td>
                          <td>0</td>
                          <td>1</td>
                          <td>1</td>
                          <td>2</td>
                          <td>2</td>
                          <td>2</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className={styles.playerCell}>
                              <img src="/img/team-image-example.png" alt="player" />
                              <div>
                                <div className={styles.playerName}>МультПрим</div>
                                <div className={styles.playerTeam}>Шымкент</div>
                              </div>
                            </div>
                          </td>
                          <td>1</td>
                          <td className={styles.scoreCell}>2</td>
                          <td>3</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>1</td>
                          <td>1</td>
                          <td>100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Правая колонка - баннер + блок "О турнире" */}
              <aside className={styles.sidebar}>
                <img
                  className={styles.sidebarBanner}
                  src="/img/voleyball.jpg"
                  alt="Tapgo cup banner"
                />
                <div className={styles.aboutCard}>
                  <h3>О турнире</h3>
                  <p>
                    <strong>Игры:</strong> Sandbox
                  </p>
                  <p>
                    <strong>Дата:</strong> 05.02.25 - 17.02.25
                  </p>
                  <p>
                    <strong>Событие:</strong> Tapgo cup
                  </p>
                  <p>
                    <strong>Организатор:</strong> Vokay
                  </p>
                  <p>
                    <strong>Категория:</strong> Мужчины
                  </p>
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

export default TournamentInfo;
