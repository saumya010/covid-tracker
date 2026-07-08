import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { fetchDailyData } from "../../api.js";
import styles from "./Charts.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchDailyData(controller.signal)
      .then(setDailyData)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (country) {
    return (
      <div className={styles.container}>
        <Bar
          data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [
              {
                label: "People",
                backgroundColor: ["rgba(59, 130, 246, .6)", "rgba(34, 197, 94, .6)", "rgba(239, 68, 68, .6)"],
                data: [confirmed, recovered, deaths],
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            },
          }}
        />
      </div>
    );
  }

  if (!dailyData.length) return null;

  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, .2)",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, .2)",
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
};

export default Charts;
