import { Header, Footer } from "../components";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/Apply.module.css";
// import classNames from "classnames";

interface IFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  gender: string;
  birthDate: string;
  photo: File | null;
}

const Apply = () => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    gender: "",
    birthDate: "",
    photo: null
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;

    // Если поле — фото (type="file"), нужно взять files
    if (name === "photo" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] ?? null;
      setFormData({ ...formData, photo: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /** Отправка формы */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Здесь можно сделать запрос на сервер
    console.log("Данные формы:", formData);
    alert("Форма успешно отправлена (пример). Откройте консоль для деталей.");
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.container_main}>
            <div className={styles.hero__uppertext}>Подача заявки</div>
            <div className={styles.hero__content}>
              <h1 className={styles.hero__title}>Подача заявки</h1>
              <p className={styles.hero__text}>
                Заполните заявку на участие в турнире и присоединяйтесь к команде настоящих
                чемпионов. Проверьте свои силы, ощутите адреналин соревнований и докажите, что вы -
                лучший.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.container_main}>
          <div className={styles["form-container"]}>
            <h2 className={styles["form-title"]}>Форма отправки</h2>
            <p className={styles["form-description"]}>
              Пожалуйста, указывайте только достоверные данные при подаче заявки. Это важно для
              корректного учета вашей статистики и рейтинга, а также для создания справедливых
              условий участия в турнире.
            </p>

            <form onSubmit={handleSubmit} className={styles["form-content"]}>
              {/* Фото */}
              <div className={styles["form-group file-input"]}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative"
                  }}
                >
                  <div className={styles["photo-download"]}>
                    <img src="/img/user-photo.png" alt="user" />
                  </div>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className={styles["photo-input"]}
                  />

                  <label
                    htmlFor="photo"
                    className={styles["photo-label"]}
                    style={{ marginLeft: "9px", marginBottom: "0px" }}
                  >
                    Загрузите фото
                  </label>
                </div>
              </div>
              <div className={styles["form-group file-input"]} style={{ opacity: "0" }}>
                <label htmlFor="photo" className={styles["photo-label"]}>
                  Загрузите фото
                </label>
              </div>

              {/* Имя */}
              <div className={styles["form-group"]}>
                <label htmlFor="firstName">
                  Имя <span className={styles["required"]}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Введите имя"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* Страна */}
              <div className={styles["form-group"]}>
                <label htmlFor="country">
                  Страна <span className={styles["required"]}>*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Выберите страну</option>
                  <option value="ru">Россия</option>
                  <option value="ua">Украина</option>
                  <option value="by">Беларусь</option>
                  <option value="kz">Казахстан</option>
                  <option value="other">Другая</option>
                </select>
              </div>

              {/* Фамилия */}
              <div className={styles["form-group"]}>
                <label htmlFor="lastName">
                  Фамилия <span className={styles["required"]}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Введите фамилию"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Город */}
              <div className={styles["form-group"]}>
                <label htmlFor="city">
                  Город <span className={styles["required"]}>*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Выберите город</option>
                  <option value="moscow">Москва</option>
                  <option value="spb">Санкт-Петербург</option>
                  <option value="kiev">Киев</option>
                  <option value="minsk">Минск</option>
                  <option value="astana">Астана</option>
                  <option value="other">Другой</option>
                </select>
              </div>

              {/* Отчество */}
              <div className={styles["form-group"]}>
                <label htmlFor="middleName">Отчество</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  placeholder="Введите отчество (если есть)"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>

              {/* Пол */}
              <div className={styles["form-group"]}>
                <label htmlFor="gender">
                  Пол <span className={styles["required"]}>*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Укажите ваш пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                  <option value="other">Другой</option>
                </select>
              </div>

              {/* Телефон */}
              <div className={styles["form-group"]}>
                <label htmlFor="phone">
                  Телефон <span className={styles["required"]}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Укажите ваш телефон"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Дата рождения */}
              <div className={styles["form-group"]}>
                <label htmlFor="birthDate">Дата рождения</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="дд.мм.гггг"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className={styles["form-group"]}>
                <label htmlFor="email">
                  Email <span className={styles["required"]}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Укажите электронную почту"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Кнопка отправки */}
              <button type="submit" className={styles["submit-button"]}>
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
