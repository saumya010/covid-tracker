import { useEffect, useState } from "react";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api.js";

const CountryPicker = ({ onCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCountries(controller.signal)
      .then(setCountries)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <select className={styles.select} defaultValue="" onChange={(e) => onCountryChange(e.target.value)}>
      <option value="">Global</option>
      {countries.map((country) => (
        <option value={country} key={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryPicker;
