export const getCountries = async () => {
  const data =
    (await callApi("https://restcountries.com/v3.1/all?fields=name")) || [];
  return data.map((country) => country.name.common);
};

const callApi = async (url: string, init?: RequestInit | undefined) => {
  try {
    const res = await fetch(url, init);
    return res.json();
  } catch (error) {
    return null;
  }
};
