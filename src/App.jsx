import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { fetchData } from "./api.js";
import coronaImage from "./images/image.png";
import { Cards, Charts, CountryPicker } from "./Components";

const App = () => {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetchData(country, controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Couldn't load COVID-19 data. Please try again.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [country]);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <header className={styles.header}>
          <img src={coronaImage} className={styles.image} alt="COVID-19" />
          <h1 className={styles.title}>COVID-19 Tracker</h1>
          <p className={styles.subtitle}>Live global and country-level case data</p>
        </header>

        {error && <p className={styles.error}>{error}</p>}

        {!error && (loading || !data) && <p className={styles.loading}>Loading…</p>}

        {!error && data && (
          <>
            <Cards data={data} />
            <CountryPicker onCountryChange={setCountry} />
            <Charts data={data} country={country} />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          Data provided by{" "}
          <a href="https://disease.sh" target="_blank" rel="noreferrer">
            disease.sh
          </a>
        </p>
        <p>
          Built by{" "}
          <a href="https://iamsaumya.com" target="_blank" rel="noreferrer">
            Saumya
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
