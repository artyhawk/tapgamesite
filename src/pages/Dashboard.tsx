import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import { ModalParticipant } from "../components"; // Предположим, вы экспортируете его так
import Pagination from "../components/Pagination/Pagination";
import uri from "../utils/uri";
import { useNavigate } from "react-router-dom";

// 1. Интерфейс для элемента (заявки) из API
interface IApply {
  _id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  gender: string;
  birthDate: string;
  photo: string;
  tournamentInfo: string;
  userId: string;
  createdAt: string;
  captain: string;
  teamName: string;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApply, setSelectedApply] = useState<IApply | null>(null);
  // Данные с сервера (заявки)
  const [applies, setApplies] = useState<IApply[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      navigate("/");
    }
  }, []);

  // Параметры пагинации
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Общее кол-во записей

  // 2. Получение данных с сервера
  // Вызываем этот метод при первом рендере и при смене currentPage / rowsPerPage
  useEffect(() => {
    const fetchApplies = async () => {
      try {
        // Пример, если нужно передавать JWT-токен:
        // const token = localStorage.getItem("token") || "";
        // В заголовки запроса добавляем Authorization, если нужно.

        const response = await fetch(`${uri}/v1/applies?page=${currentPage}&limit=${rowsPerPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          throw new Error("Не удалось загрузить список заявок");
        }

        // JSON-ответ, в котором: { data, total, currentPage, rowsPerPage }
        const json = await response.json();

        // Сохраняем полученные данные в стейты
        setApplies(json.data || []);
        setTotalItems(json.total || 0);
        // currentPage и rowsPerPage обычно не обязательно обновлять,
        // ведь мы уже их используем для запроса
      } catch (error) {
        console.error("Ошибка при загрузке заявок:", error);
      }
    };

    fetchApplies();
  }, [currentPage, rowsPerPage]);

  // 3. Хендлер смены страницы (вызывается из пагинации)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Данные подтянутся в useEffect
  };

  // 4. Открытие/закрытие модалки
  const openModal = (apply: IApply) => {
    setSelectedApply(apply);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApply(null); // очистим при закрытии
  };

  return (
    <div className={styles.dashboardContainer}>
      {isModalOpen && selectedApply && (
        <ModalParticipant onClose={closeModal} data={selectedApply} />
      )}

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
          <button>Организаторы</button>
          <button className={styles.activeTab}>Участники</button>
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

        {/* Таблица заявок */}
        <table>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Пользователь</th>
              {/* <th>ID</th> */}
              <th>Название команды</th>
              <th>Капитан</th>
              {/* <th>Ограничения</th> */}
              <th>Игр</th>
              <th>Телефон</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {applies.map(apply => (
              <tr key={apply._id} onClick={() => openModal(apply)}>
                <td>
                  <div className={styles.avatar}>
                    <img src={`${uri}${apply.photo}`} alt="avatar" className={styles.avatarImg} />
                  </div>
                </td>
                <td>
                  <div className={styles.userDetails}>
                    <div>
                      {apply.lastName} {apply.firstName} {apply.middleName ? apply.middleName : ""}
                    </div>
                    <small>
                      {apply.country}, {apply.city}, {apply.tournamentInfo}
                    </small>
                  </div>
                </td>
                <td>{apply.teamName}</td>
                <td>{apply.captain === "yes" ? "Да" : "Нет"}</td>
                {/* <td className={`${styles.status} ${styles.locked}`}>
                  <span>Нет</span>
                </td> */}
                <td>0</td>
                <td className={styles.phone}>{apply.phone}</td>
                <td className={styles.date}>
                  {new Date(apply.createdAt).toLocaleDateString("ru-RU")}
                </td>
              </tr>
            ))}
            {applies.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Пагинация */}
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Dashboard;
