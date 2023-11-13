export const parsedFormData = {
  getAll: () => {
    try {
      if (localStorage.getItem("form-data")) {
        return JSON.parse(localStorage.getItem("form-data")!);
      }
      return {};
    } catch (error) {
      return {};
    }
  },
  set: (key: string, value: any) => {
    try {
      const formData = parsedFormData.getAll();
      formData[key] = value;
      localStorage.setItem("form-data", JSON.stringify(formData));
    } catch (error) {
      // throw new Error(error);
    }
  },

  get: (key: string) => {
    try {
      const formData = parsedFormData.getAll();
      return formData[key];
    } catch (error) {
      return null;
    }
  },
  updateAll(formData: any) {
    try {
      localStorage.setItem("form-data", JSON.stringify(formData));
    } catch (error) {
      // throw new Error(error);
    }
  },
};

export const localStorageBrowser = {
  setItem: (key: any, value: any) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  },

  getItem: (key: any) => {
    if (typeof localStorage !== "undefined") {
      localStorage.getItem(key);
    }
  },
  removeItem: (key: any) => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};
