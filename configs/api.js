const config = {
    dev: "https://faithacademy-xurpas-sandbox.frappe.cloud/api",
    prod: "",
  };
  
  let _baseUrl = () => {
    if (import.meta.env.MODE === "development" || !import.meta.env.MODE) {
      return config.dev;
    }
    if (import.meta.env.MODE === "production") {
      return config.prod;
    }
  }
  
  const envConfig = {
    baseUrl: _baseUrl(),
  };
  
  export default envConfig