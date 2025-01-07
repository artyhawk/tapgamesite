import { Header, Footer } from "../components";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "../styles/Apply.module.css";
import { useNavigate } from "react-router-dom";
import uri from "../utils/uri";
import { Watch } from "react-loader-spinner";

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
  tournamentInfo: string;
}

const Apply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: localStorage.getItem("email") || "",
    country: "",
    city: "",
    gender: "",
    birthDate: "",
    photo: null,
    tournamentInfo: "3x3 Basket 2024/2025"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("/img/user-auth.png");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));

        // Create preview URL for the photo
        const previewUrl = URL.createObjectURL(files[0]);
        setPhotoPreview(previewUrl);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (photoPreview !== "/img/user-photo.png") {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          formDataToSend.append("photo", value);
        } else if (value !== null) {
          formDataToSend.append(key, value.toString());
        }
      });

      const response = await fetch(`${uri}/v1/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы");
      }

      return handleSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 5000);
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
              условий участия в турнире. <br></br>
              <br></br>
              Обязательные поля для заполнения указаны{" "}
              <span className={styles["required"]}>* </span>
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
                    <img
                      src={photoPreview}
                      alt="user"
                      style={{ borderRadius: "26px", width: "24px", height: "24px" }}
                    />
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
                    Загрузите фото <span className={styles["required"]}>*</span>
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
                  Имя <span className={styles["required"]}>* </span>
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
                  <option value="kz">Казахстан</option>
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
                  <option value="Шымкент">Шымкент</option>
                  <option value="Астана">Астана</option>
                  <option value="Алматы">Алматы</option>
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
                  <option value="Мужской">Мужской</option>
                  <option value="Женский">Женский</option>
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
              {success ? (
                <div className={styles["success-button"]}>
                  <div style={{ marginRight: "15px" }}>
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src="/img/check-circle.png"
                      alt="check-circle"
                    />
                  </div>
                  Ваша заявка отправлена
                </div>
              ) : (
                <button type="submit" className={styles["submit-button"]} disabled={loading}>
                  {loading ? (
                    <Watch
                      height={20}
                      width={20}
                      color="#fff"
                      visible={true}
                      wrapperStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    />
                  ) : (
                    "Отправить"
                  )}
                </button>
              )}

              {error && <div className={styles.error}>{error}</div>}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
