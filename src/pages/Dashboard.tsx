import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button>
            <img src="/img/sidebar.svg" alt="sidebar" />
          </button>

          <div className={styles.sidebarHeaderRight}>
            <button style={{ marginRight: "10px" }}>
              <img src="/img/interface.svg" alt="interface" />
            </button>

            <button>
              <img src="/img/search.svg" alt="search" />
            </button>
            {/* <button>
              <img src="/img/moon.svg" alt="moon" />
            </button> */}
          </div>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li className={styles.active}>
              <img src="/img/user2.svg" alt="user" className={styles.navigationIcon} />
              Пользователи
            </li>
            <li>
              <img src="/img/trophy.svg" alt="trophy" className={styles.navigationIcon} />
              Турниры
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.mainContentHeader}>
          <select>
            <option value="TapGame">TapGame</option>
          </select>
          <button>
            <img src="/img/user.svg" alt="user" />
          </button>
        </div>
        <h1 className={styles.h1}>Пользователи TapGame</h1>
        <p className={styles.description}>
          В этом разделе вы можете управлять пользователями платформы.
        </p>
        <p className={styles.description}>
          Здесь представлены все организаторы, участники и сотрудники Tapgame.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBar}>
            <img src="/img/search-gray.png" alt="search" className={styles.searchBarSearchIcon} />
            <input
              type="text"
              placeholder="Поиск организаторов"
              className={styles.searchBarInput}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={styles.activeTab}>Организаторы</button>
          <button>Участники</button>
          <button>Протоколисты</button>
          <button>Сотрудники</button>
        </div>
        <div className={styles.tabs2}>
          <div className={styles.tab2Left}>
            <button className={styles.tab2Active}>Все</button>
            <button>Новые</button>
          </div>
          <button> + Новый пользователь</button>
        </div>
        <button className={styles.filterButton}>
          <img src="/img/filter.svg" alt="filter" style={{ width: "18px", height: "14px" }} />
          Фильтр
        </button>
        <table>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Пользователь</th>
              <th>ID</th>
              <th>Ограничения</th>
              <th>Игр</th>
              <th>Телефон</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.avatar}></div>
              </td>
              <td>
                <div className={styles.userDetails}>
                  <div>Ербол Тастанов</div>
                  <small>Баскетбол, волейбол, теннис</small>
                </div>
              </td>
              <td>1275</td>
              <td className={`${styles.status} ${styles.locked}`}>
                <span>Нет</span>
              </td>
              <td>0</td>
              <td className={styles.phone}>+7 (777) 777 77 77</td>
              <td className="date">28 нояб. 2024г. Участие в турнире</td>
            </tr>
            <tr>
              <td>
                <div className={styles.avatar}></div>
              </td>
              <td>
                <div className={styles.userDetails}>
                  <div>Ербол Тастанов</div>
                  <small>Баскетбол</small>
                </div>
              </td>
              <td>3788</td>
              <td className={`${styles.status} ${styles.locked}`}>
                <span>Заблокирован</span>
              </td>
              <td>2</td>
              <td className={styles.phone}>+7 (777) 777 77 77</td>
              <td className={styles.date}>28 нояб. 2024г. Регистрация</td>
            </tr>
            <tr>
              <td>
                <div className={styles.avatar}></div>
              </td>
              <td>
                <div className={styles.userDetails}>
                  <div>Ербол Тастанов</div>
                  <small>Баскетбол</small>
                </div>
              </td>
              <td>1275</td>
              <td className={`styles.status styles.unlocked`}>
                <span>Нет</span>
              </td>
              <td>0</td>
              <td className={styles.phone}>+7 (777) 777 77 77</td>
              <td className={styles.date}>28 нояб. 2024г. Регистрация</td>
            </tr>
            <tr>
              <td>
                <div className={styles.avatar}></div>
              </td>
              <td>
                <div className={styles.userDetails}>
                  <div>Ербол Тастанов</div>
                  <small>Баскетбол</small>
                </div>
              </td>
              <td>3788</td>
              <td className={`${styles.status} ${styles.locked}`}>
                <span>Заблокирован</span>
              </td>
              <td>5</td>
              <td className={styles.phone}>+7 (777) 777 77 77</td>
              <td className={styles.date}>28 нояб. 2024г. Регистрация</td>
            </tr>
            <tr>
              <td>
                <div className={styles.avatar}></div>
              </td>
              <td>
                <div className={styles.userDetails}>
                  <div>Ербол Тастанов</div>
                  <small>Баскетбол</small>
                </div>
              </td>
              <td>3788</td>
              <td className={`${styles.status} ${styles.locked}`}>
                <span>Заблокирован</span>
              </td>
              <td>7</td>
              <td className={styles.phone}>+7 (777) 777 77 77</td>
              <td className={styles.date}>28 нояб. 2024г. Регистрация</td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* Right Section */}
    </div>
  );
};

export default Dashboard;
