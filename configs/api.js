const config = {
  dev: `${
    typeof window !== "undefined"
      ? window.origin
      : "https://faithacademy-xurpas-sandbox.frappe.cloud"
  }`,
  prod: "",
};

let _baseUrl = () => {
  if (import.meta.env.MODE === "development" || !import.meta.env.MODE) {
    return config.dev;
  }
  if (import.meta.env.MODE === "production") {
    return config.prod;
  }
};

const envConfig = {
  baseUrl: _baseUrl(),
};

export default envConfig;
