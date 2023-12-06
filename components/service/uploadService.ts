import axios from "axios";
import envConfig from "~/configs/api";
export const uploadFileService: any = (
  filename: string,
  file: any,
  callback: Function
) => {
  let formData = new FormData();
  formData.append(filename, file);
  axios
    .post(
      `${envConfig.baseUrl}/method/faith_academy.endpoint.registration.registration.upload_file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        callback("success", res.data);
      }
    })
    .catch((err) => {
      callback("failed", new Error("Upload File Failed"));
    });
};
