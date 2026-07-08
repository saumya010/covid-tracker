import CountUp from "react-countup";
import styles from "./Cards.module.css";

const STATS = [
  { key: "confirmed", label: "Infected", className: "infected", note: "Total confirmed cases" },
  { key: "recovered", label: "Recovered", className: "recovered", note: "Total recovered cases" },
  { key: "deaths", label: "Deaths", className: "deaths", note: "Total deaths" },
];

const Cards = ({ data }) => {
  const { lastUpdate } = data;

  return (
    <div className={styles.container}>
      {STATS.map(({ key, label, className, note }) => (
        <div key={key} className={`${styles.card} ${styles[className]}`}>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>
            <CountUp start={0} end={data[key] ?? 0} duration={2} separator="," />
          </p>
          <p className={styles.date}>{new Date(lastUpdate).toDateString()}</p>
          <p className={styles.note}>{note}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
