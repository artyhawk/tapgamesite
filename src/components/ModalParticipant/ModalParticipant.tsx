// ModalParticipant.tsx (TypeScript)
import React from "react";
import styles from "./ModalParticipant.module.css";
import uri from "../../utils/uri";

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

interface ModalParticipantProps {
  onClose: () => void;
  data: IApply;
}

const ModalParticipant: React.FC<ModalParticipantProps> = ({ onClose, data }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Кнопка закрытия */}
        <button onClick={onClose} className={styles.closeButton} aria-label="Close Modal">
          ✕
        </button>

        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <img
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
              src={`${uri}${data.photo}`}
              alt="avatar"
              className={styles.avatarImg}
            />
          </div>
          <div className={styles.participantInfo}>
            <h2>
              {data.lastName} {data.firstName} {data.middleName ? data.middleName : ""}
            </h2>
            <p>{data.tournamentInfo}</p>
          </div>
        </div>

        {/* Детали */}
        <div className={styles.details}>
          <ul>
            <li>
              <strong>Телефон:</strong> {data.phone}
            </li>
            <li>
              <strong>Email:</strong> {data.email}
            </li>
            <li>
              <strong>Город:</strong> {data.city}
            </li>
            <li>
              <strong>Страна:</strong> {data.country}
            </li>
            <li>
              <strong>Пол:</strong> {data.gender}
            </li>
            <li>
              <strong>Дата рождения:</strong> {new Date(data.birthDate).toLocaleDateString("ru-RU")}
            </li>
            <li>
              <strong>Капитан команды:</strong> {data.captain === "yes" ? "Да" : "Нет"}
            </li>
            <li>
              <strong>Название команды:</strong> {data.teamName}
            </li>
          </ul>
        </div>

        {/* Кнопка WhatsApp или что-то ещё */}
        <button
          onClick={() => {
            const phoneNumber = data.phone.replace(/\D/g, ""); // Remove non-digits
            window.open(`https://wa.me/${phoneNumber}`, "_blank");
          }}
          className={styles.whatsappButton}
        >
          Написать в WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ModalParticipant;
