import axios from "axios";
import envConfig from "~/configs/api";
export const validateRegisterKey: any = (
  registerKey: string,
  callback: Function
) => {
  axios
    .post(
      `${envConfig.baseUrl}/method/faith_academy.endpoint.registration.registration.validate_unique_key`,
      { unique_key: registerKey }
    )
    .then((res) => {
      if (res.data) {
        callback("success");
      }
    })
    .catch((err) => {
      callback("fail");
      console.log(err);
    });
};
