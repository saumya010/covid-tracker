const BASE_URL = "https://disease.sh/v3/covid-19";

async function getJson(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchData(country, signal) {
  const url = country ? `${BASE_URL}/countries/${country}` : `${BASE_URL}/all`;
  const data = await getJson(url, signal);
  return {
    confirmed: data.cases,
    recovered: data.recovered,
    deaths: data.deaths,
    lastUpdate: data.updated,
  };
}

export async function fetchDailyData(signal) {
  const data = await getJson(`${BASE_URL}/historical/all?lastdays=30`, signal);
  return Object.keys(data.cases).map((date) => ({
    date,
    confirmed: data.cases[date],
    deaths: data.deaths[date],
  }));
}

export async function fetchCountries(signal) {
  const data = await getJson(`${BASE_URL}/countries`, signal);
  return data.map((country) => country.country).sort();
}
