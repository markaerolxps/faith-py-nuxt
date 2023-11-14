import type { IDualCitizenYesInputs } from "~/components/form-dc-yes-flow/data";

export const mapObjectValues = (inputObject: any, ignoreFile: boolean) => {
  const result: any = {};

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key) && !!inputObject[key].value) {
      if (inputObject[key].inputType === "input-file") {
        if (!ignoreFile) {
          result[key] = inputObject[key].value;
        }
      } else {
        result[key] = inputObject[key].value;
      }
    }
  }

  return result;
};

export const removeValueExcept = (
  objectInputs: {
    [key: string | number]: IDualCitizenYesInputs;
  },
  except: string[]
) => {
  for (const key in objectInputs) {
    if (objectInputs.hasOwnProperty(key) && !except.includes(key)) {
      objectInputs[key].value = "";
    }
  }

  return objectInputs;
};

export const stringWithoutFirstChar = (originalString: string) =>
  originalString.split("").slice(1).join("");

export const redirect = (url: string) =>
  `/assets/faith_academy/registration${url}`;
