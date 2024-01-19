<template>
  <div v-if="isLoading">
    <loading
      v-model:active="isLoading"
      :is-full-page="fullPage"
      :loader="'spinner'"
      :color="'#1C355E'"
      :height="180"
      :width="180"
      :transition="'fade'"
    />
  </div>
  <form
    ref="formRef"
    class="flex flex-col items-start justify-center w-full"
    name="register-form"
    method="POST"
    enctype="multipart/form-data"
    @submit.prevent="sendForm"
  >
    <div v-for="(inputForm, index) in inputs" :key="index" class="w-full">
      <!-- NOTE -->
      <div
        v-if="inputForm?.note && isNoteVisible(inputForm?.note?.dependsOn)"
        class="bg-[#F0F7FE] text-[#1C355E] rounded-lg p-[1rem] mb-[1rem] fade-up-enter-active"
      >
        <p class="font-bold text-[1rem]">
          {{ inputForm.note?.content }}
        </p>
      </div>

      <div
        v-if="inputForm.id === 'preferredVisa' && isInputVisible(inputForm)"
        class="bg-[#F0F7FE] text-[#1C355E] rounded-lg p-[2rem] mb-[1rem] fade-up-enter-active"
      >
        <p class="font-bold text-[1rem]">
          You are not legally a DFC, here are your options to be BI Compliant
          Student in the PH.
        </p>

        <ul class="text-gray-800 text-sm list-disc px-[2rem] mt-[1rem]">
          <li>
            <small>Apply for FA 47(a)(2) Visa</small>
          </li>
          <li>
            <small>Apply for another PH Visa -> Apply for SSP</small>
          </li>
        </ul>
      </div>

      <div
        v-if="isInputVisible(inputForm)"
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <div
          class="flex flex-col w-full gap-4"
          v-if="inputForm.inputType === 'select'"
        >
          <Dropdown
            :required="inputForm?.required"
            :title="inputForm.title"
            :items="inputForm.id === 'country' ? countries : inputForm.items"
            :hasOption="inputForm.hasOption"
            v-model="inputForm.value"
            :value="inputForm.value"
            :isObjectArray="inputForm.itemsObjectArray"
          />

          <div
            v-if="inputForm.id === 'childFaVisa' && inputForm.value === 'Yes'"
            class="flex flex-col w-full gap-1 bg-[#F0F7FE] text-black items-start justify-center rounded-2xl"
            style="padding: 16px 24px"
          >
            <span class="font-bold text-base"
              >Your child need to apply for a 47(a)(2)</span
            >
          </div>
        </div>

        <div
          class="flex flex-col w-full gap-4"
          v-else-if="inputForm.inputType.split('-')[1] === 'file'"
        >
          <UploadFile
            :title="inputForm.title"
            @uploadFile="(file: any) => {
                        uploadFnc(inputs[inputForm.id].id,file)
                    }"
            @clear-file="clearFile(inputs[inputForm.id].id)"
            :refName="inputForm.id"
            :required="inputForm?.required"
          />

          <div
            v-if="inputForm.id === 'stampArrivalFile'"
            class="flex flex-col w-full gap-1 bg-[#F0F7FE] text-black items-start justify-center rounded-2xl"
            style="padding: 16px 24px"
          >
            <span class="font-bold text-base"
              >Passport used to enter the Philippines</span
            >
          </div>
        </div>
        <div class="flex flex-col w-full gap-4" v-else>
          <InputText
            v-model="inputForm.value"
            :title="inputForm.title"
            :placeholder="inputForm.placeholder"
            :description="inputForm.description"
            v-on:change="
              (e) => {
                this.updateLocalStorageFormData(inputForm.id, e.target.value);
              }
            "
            :type="inputForm.inputType.split('-')[1]"
            :value="inputForm.value"
            :required="inputForm?.required"
            :disabled="
              inputForm.id === 'phVisaExpDate' &&
              inputs?.['indefinite']?.value === 'on'
                ? true
                : false
            "
          />
          <div
            v-if="inputForm.id === 'anticipatedArrivalDate'"
            class="flex flex-col w-full gap-1 bg-[#F0F7FE] text-black items-start justify-center rounded-2xl"
            style="padding: 16px 24px"
          >
            <span class="font-bold text-base"
              >Passport used to enter the Philippines</span
            >
          </div>
        </div>
      </div>

      <div
        v-if="
          inputForm.value &&
          inputForm.id === 'preferredVisa' &&
          isInputVisible(inputForm)
        "
      >
        <div
          class="bg-[#F0F7FE] text-[#1C355E] rounded-lg p-[2rem] mb-[1rem] fade-up-enter-active"
        >
          <p
            v-if="inputForm.value === 'Apply for FA 47(a)(2) Visa'"
            class="font-bold text-[1rem]"
          >
            Apply for FA 47(a)(2) Visa
          </p>

          <p v-else class="font-bold text-[1rem]">Apply for SSP</p>

          <p class="text-gray-800 text-sm list-disc px-[1rem] mt-[1rem]">
            We will prepare your child's application. Expect instructions to be
            sent to you via email.Please turnover your passport immediately to
            the Visa Office at Faith Academy or as soon as you arrive in the
            country.
            <br />
            <br />
            For more information please email g.visaoffice@faith.edu.ph
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-end justify-end w-full mt-16">
      <vue-recaptcha
        ref="recaptcha"
        sitekey="6LdEI7cmAAAAAAtDpGiownF3Q-nQPUb43zm8vkim"
        :load-recaptcha-script="true"
        @verify="onCaptchaVerified"
        @expired="expiredMethod"
      >
      </vue-recaptcha>
      <button
        style="padding: 6.4px 15px"
        type="button"
        class="h-[2.5rem] w-[7.125rem] flex justify-center items-center text-base rounded-md text-[#1890FF] cursor-pointer"
        @click="getStarted"
      >
        Back
      </button>

      <button
        type="submit"
        style="padding: 6.4px 15px"
        class="h-[2.5rem] g-recaptcha w-[7.125rem] flex justify-center items-center rounded-md text-base cursor-pointer"
        :class="
          submitState
            ? 'bg-[#1890FF] text-white '
            : 'bg-[#F5F5F5] text-[#b8b8b8]'
        "
        :disabled="submitState ? false : true"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import UploadFile from "../common/UploadFile.vue";
import InputText from "../common/InputText.vue";
import Dropdown from "../common/Dropdown.vue";
import { localStorageBrowser, parsedFormData } from "../common/utils/cache";
import {
  mapObjectValues,
  removeValueExcept,
  stringWithoutFirstChar,
} from "../common/utils/object";
import {
  REGISTRATION_DF_YES_INPUTS,
  defaultItems,
  type IDualCitizenYesInputs,
  countries,
} from "./data";

import { REGISTRATION_DF_NO_INPUTS } from "./data-flow-3";
import { VueRecaptcha } from "vue-recaptcha";
import axios from "axios";
import envConfig from "~/configs/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { validateRegisterKey } from "../service/validateRegisterKeyService";
import { uploadFileService } from "../service/uploadService";
export const defaultObjData = {
  dualFilipino: {
    id: "dualFilipino",
    value: parsedFormData.get("dualFilipino"),
    title: "Dual Filipino?",
    items: defaultItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  isInPH: {
    id: "isInPH",
    value: parsedFormData.get("isInPH"),
    title: "Is your child currently in the Philippines?",
    dependsOnExpectValue: [["dualFilipino-Any"]], // Key-Value
    items: defaultItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
};
export default {
  components: { Dropdown, InputText, UploadFile, VueRecaptcha, Loading },
  data: () => ({
    inputs: {
      dualFilipino: {
        id: "dualFilipino",
        value: parsedFormData.get("dualFilipino"),
        title: "Dual Filipino?",
        items: defaultItems,
        inputType: "select",
        required: true,
      } as IDualCitizenYesInputs,
      isInPH: {
        id: "isInPH",
        value: parsedFormData.get("isInPH"),
        title: "Is your child currently in the Philippines?",
        dependsOnExpectValue: [["dualFilipino-Any"]], // Key-Value
        items: defaultItems,
        inputType: "select",
        required: true,
      } as IDualCitizenYesInputs,
    },
    submitState: false,
    countries: [] as string[],
    recaptchaToken: false,
    formData: parsedFormData.getAll(),
    isLoading: false,
    fullPage: true,
    validatedSteps: [
      [
        "dualFilipino-Yes",
        "isUsePhPassport-Yes",
        "hasBICert-Any",
        "hasAnotherPassport-Any",
      ],
      [
        "dualFilipino-Yes",
        "isUsePhPassport-No",
        "hasPHPassport-Yes",
        "hasBICert2-Yes",
      ],
      [
        "dualFilipino-Yes",
        "isUsePhPassport-No",
        "hasPHPassport-Yes",
        "hasBICert2-No",
        "preferredVisa-Any",
      ],
      [
        "dualFilipino-Yes",
        "isUsePhPassport-No",
        "hasPHPassport-No",
        "hasBICert-Yes",
      ],
      [
        "dualFilipino-Yes",
        "isUsePhPassport-No",
        "hasPHPassport-No",
        "hasBICert-No",
        "preferredVisa-Any",
      ],
      // ['dualFilipino-No', 'isInPH-Yes', 'dateOfArrival-Any', 'stampArrivalFile-Any', 'country-Any',],
      ["validateCountryField"],
    ],
  }),
  created() {},
  async mounted() {
    this.getCountries();
    if (parsedFormData.get("dualFilipino")) {
      if (parsedFormData.get("dualFilipino") === "No") {
        this.inputs = { ...REGISTRATION_DF_NO_INPUTS };
      } else {
        this.inputs = { ...REGISTRATION_DF_YES_INPUTS };
      }
    }
    validateRegisterKey(
      localStorage.getItem("registerKey"),
      this.validateKeyCallback
    );
  },
  emits: ["backToOptions", "failedKey"],
  methods: {
    clearFile(fileName: string) {
      this.inputs[fileName].value = null;
      this.validateAllSteps();
    },
    uploadFileCallback(result: string, data: any) {
      if (result === "success") {
        console.log(data.message);
        const key = Object.keys(data.message)[0];
        const value = data.message[key];
        this.inputs[key].value = value;
        this.isLoading = false;
      } else {
        console.log("upload Failed", data);
        this.isLoading = false;
      }
    },
    uploadFnc(fileName: string, file: any): void {
      this.isLoading = true;
      uploadFileService(fileName, file, this.uploadFileCallback);
    },
    validateKeyCallback(result: string): void {
      if (result === "fail") {
        this.$emit("failedKey");
      }
    },
    getCountries() {
      axios
        .get(
          `${envConfig.baseUrl}/api/method/faith_academy.endpoint.registration.registration.country_list`
        )
        .then((res) => {
          console.log(res);

          if (res.data) {
            this.countries = res.data.data;
          }
        })
        .catch((err) => {});
    },
    getStarted() {
      localStorageBrowser.removeItem("form-data");
      this.$emit("backToOptions");
    },
    redirectToSuccess() {
      axios
        .post(
          `${envConfig.baseUrl}/api/method/faith_academy.endpoint.registration.registration.unique_key_change_status`,
          { unique_key: localStorage.getItem("registerKey") }
        )
        .then((res) => {
          if (res) {
            localStorage.removeItem("form-data");
            localStorage.removeItem("registerKey");
            localStorage.removeItem("process");
            window.location.href = `${envConfig.basePath}/success`;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    sendForm(e: any) {
      let formData: any = mapObjectValues(this.inputs, true);
      formData.recaptcha = this.recaptchaToken;

      const isFlow2 =
        this.inputs?.dualFilipino?.value === "Yes" &&
        !!this.inputs?.isInPH?.value;
      formData.flow = isFlow2 && "flow-2";
      axios
        .post(
          `${envConfig.baseUrl}/api/method/faith_academy.endpoint.registration.registration.student_registration`,
          formData
        )
        .then((res) => {
          console.log(res);

          if (res.data) {
            this.isLoading = false;
            this.redirectToSuccess();
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    submitValidateForm() {},
    isNoteVisible(noteDependsOn: string[]) {
      return noteDependsOn.every((keyVal) => {
        if (noteDependsOn.length === 0) return false;

        const dependsOn =
          keyVal[0] === "!"
            ? stringWithoutFirstChar(keyVal.split("-")[0])
            : keyVal.split("-")[0];
        const expectValue: string[] = keyVal.split("-")[1]?.split("||");

        if (expectValue.length >= 2) {
          const orStatement = expectValue.some(
            (orValue: string) => orValue === this.inputs[dependsOn]?.value
          );
          return keyVal[0] === "!" ? !orStatement : orStatement;
        }

        // Any value, but should select first the depend input
        if (expectValue[0] === "Any" && !!this.inputs[dependsOn]?.value) {
          return true;
        }

        return keyVal[0] === "!"
          ? expectValue[0] !== this.inputs[dependsOn]?.value
          : expectValue[0] === this.inputs[dependsOn]?.value;
      });
    },
    isInputVisible(inputForm: IDualCitizenYesInputs) {
      const isVisible: any =
        !inputForm.dependsOnExpectValue?.length ||
        (inputForm.dependsOnExpectValue.length > 0 &&
          inputForm.dependsOnExpectValue?.some((and: string[]) =>
            and.every((keyVal) => {
              if (and.length === 0) return false;

              const dependsOn =
                keyVal[0] === "!"
                  ? stringWithoutFirstChar(keyVal.split("-")[0])
                  : keyVal.split("-")[0];
              const expectValue: string[] = keyVal.split("-")[1]?.split("||");

              if (expectValue.length >= 2) {
                const orStatement = expectValue.some(
                  (orValue: string) => orValue === this.inputs[dependsOn]?.value
                );
                return keyVal[0] === "!" ? !orStatement : orStatement;
              }

              if (expectValue[0] === "Visible" && this.inputs[dependsOn]) {
                return this.isInputVisible(this.inputs[dependsOn]);
              }

              // Any value, but should select first the depend input
              if (expectValue[0] === "Any" && !!this.inputs[dependsOn]?.value) {
                return true;
              }

              return keyVal[0] === "!"
                ? expectValue[0] !== this.inputs[dependsOn]?.value
                : expectValue[0] === this.inputs[dependsOn]?.value;
            })
          ));

      if (!isVisible && this.inputs[inputForm.id]) {
        // to hide again the other inputs
        this.inputs[inputForm.id].value = "";
      }

      return isVisible;
    },
    updateLocalStorageFormData(key: string, value: any) {
      console.log("key", key, value);
      parsedFormData.set(key, value);
    },
    validateCountryField() {
      if (
        this.inputs.dualFilipino.value === "No" &&
        this.inputs.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName?.value &&
        this.inputs?.firstName?.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace?.value &&
        this.inputs?.dateOfBirth?.value &&
        this.inputs?.passportNumber?.value &&
        this.inputs?.passportExpirationDate?.value &&
        this.inputs?.issuingAuthority?.value &&
        this.inputs?.bioPageFile?.value &&
        this.inputs.childEnterReason.value === "visaHolder" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs.dualFilipino.value === "No" &&
        this.inputs.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "Yes" &&
        this.inputs?.childAnotherPassport?.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "Yes" &&
        this.inputs?.childAnotherPassport?.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "No" &&
        this.inputs?.nameOfMission?.value &&
        this.inputs?.contactName?.value &&
        this.inputs?.contactNumber?.value &&
        this.inputs?.contactEmail.value &&
        this.inputs?.childAnotherPassport.value &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "No" &&
        this.inputs?.nameOfMission?.value &&
        this.inputs?.contactName?.value &&
        this.inputs?.contactNumber?.value &&
        this.inputs?.contactEmail.value &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "No" &&
        this.inputs?.reasonDontHaveACRCard.value &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "No" &&
        this.inputs?.reasonDontHaveACRCard.value &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "Yes" &&
        this.inputs?.expirationDateACRCard.value &&
        this.inputs?.childFrontACRCardFile.value &&
        this.inputs?.childBackACRCardFile &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "Yes" &&
        this.inputs?.dateOfArrival?.value &&
        this.inputs?.dateOfAuthorizedStay?.value &&
        this.inputs?.stampArrivalFile?.value != null &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "Yes" &&
        this.inputs?.expirationDateACRCard.value &&
        this.inputs?.childFrontACRCardFile.value &&
        this.inputs?.childBackACRCardFile &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName?.value &&
        this.inputs?.firstName?.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace?.value &&
        this.inputs?.dateOfBirth?.value &&
        this.inputs?.passportNumber?.value &&
        this.inputs?.passportExpirationDate?.value &&
        this.inputs?.issuingAuthority?.value &&
        this.inputs?.bioPageFile?.value &&
        this.inputs?.childEnterReason.value === "visaHolder" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "Yes" &&
        this.inputs?.childAnotherPassport?.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "Yes" &&
        this.inputs?.childAnotherPassport?.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "No" &&
        this.inputs?.nameOfMission?.value &&
        this.inputs?.contactName?.value &&
        this.inputs?.contactNumber?.value &&
        this.inputs?.contactEmail.value &&
        this.inputs?.childAnotherPassport.value &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        (this.inputs?.childEnterReason.value === "visaFree" ||
          this.inputs?.childEnterReason.value === "visaGranted") &&
        this.inputs?.childFaVisa.value === "No" &&
        this.inputs?.nameOfMission?.value &&
        this.inputs?.contactName?.value &&
        this.inputs?.contactNumber?.value &&
        this.inputs?.contactEmail.value &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "No" &&
        this.inputs?.reasonDontHaveACRCard.value &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "No" &&
        this.inputs?.reasonDontHaveACRCard.value &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "Yes" &&
        this.inputs?.expirationDateACRCard.value &&
        this.inputs?.childFrontACRCardFile.value &&
        this.inputs?.childBackACRCardFile &&
        this.inputs?.childAnotherPassport.value === "Yes" &&
        ((this.inputs?.child2ndCountry.value &&
          this.inputs?.child2ndCountry.value != "Other") ||
          (this.inputs?.child2ndCountry.value === "Other" &&
            this.inputs?.secondOtherCountry.value)) &&
        this.inputs?.secondPassportNumber.value &&
        this.inputs?.secondPassportExpirationDate.value &&
        this.inputs?.secondBioPageFile.value &&
        this.recaptchaToken
      ) {
        return true;
      } else if (
        this.inputs?.dualFilipino.value === "No" &&
        this.inputs?.isInPH.value === "No" &&
        this.inputs?.anticipatedArrivalDate.value &&
        ((this.inputs?.country?.value &&
          this.inputs?.country?.value != "Other") ||
          (this.inputs?.country?.value === "Other" &&
            this.inputs?.otherCountry?.value)) &&
        this.inputs?.surName.value &&
        this.inputs?.firstName.value &&
        this.inputs?.gender.value &&
        this.inputs?.birthPlace.value &&
        this.inputs?.dateOfBirth.value &&
        this.inputs?.passportNumber.value &&
        this.inputs?.passportExpirationDate.value &&
        this.inputs?.issuingAuthority.value &&
        this.inputs?.bioPageFile.value &&
        this.inputs?.childEnterReason.value === "phVisa" &&
        this.inputs?.typeOfPhVisa.value &&
        (this.inputs?.phVisaExpDate.value ||
          this.inputs?.indefinite.value === "on") &&
        this.inputs?.visaPageFile.value &&
        this.inputs?.acrCardOption.value === "Yes" &&
        this.inputs?.expirationDateACRCard.value &&
        this.inputs?.childFrontACRCardFile.value &&
        this.inputs?.childBackACRCardFile &&
        this.inputs?.childAnotherPassport.value === "No" &&
        this.recaptchaToken
      ) {
        return true;
      } else {
        return false;
      }
    },
    expiredMethod() {
      this.recaptchaToken = null;
      this.validateAllSteps();
    },
    onCaptchaVerified(response) {
      this.recaptchaToken = response;
      this.validateAllSteps();
    },
    validateAllSteps() {
      const otherInputsVisibleRequired = Object.values(this.inputs)
        .filter((input) => this.isInputVisible(input) && input?.required)
        .map((input: any) => input.id + "-Any");
      const isValid =
        this.validatedSteps.length > 0 &&
        this.validatedSteps?.some((and: string[]) => {
          if (and[0] === "validateCountryField") {
            return this.validateCountryField();
          }

          const otherInputs = otherInputsVisibleRequired.filter(
            (visibleInput) => !and.includes(visibleInput)
          );
          return [...otherInputs, ...and].every((keyVal) => {
            if (and.length === 0) return false;

            const dependsOn =
              keyVal[0] === "!"
                ? stringWithoutFirstChar(keyVal.split("-")[0])
                : keyVal.split("-")[0];
            const expectValue: string[] = keyVal.split("-")[1]?.split("||");

            if (!expectValue?.[0]) {
              return false;
            }

            if (expectValue.length >= 2) {
              const orStatement = expectValue.some(
                (orValue: string) => orValue === this.inputs[dependsOn]?.value
              );
              return keyVal[0] === "!" ? !orStatement : orStatement;
            }

            // Any value, but should select first the depend input
            if (expectValue[0] === "Any" && !!this.inputs[dependsOn]?.value) {
              return true;
            }

            return keyVal[0] === "!"
              ? expectValue[0] !== this.inputs[dependsOn]?.value
              : expectValue[0] === this.inputs[dependsOn]?.value;
          });
        });
      this.submitState = this.recaptchaToken && isValid === true;
      return isValid;
    },
  },
  updated() {
    parsedFormData.updateAll(mapObjectValues(this.inputs, true));
    if (this.inputs?.child2ndCountry) {
      this.inputs.child2ndCountry.items = this.countries;
    }
    if (this.inputs?.country) {
      this.inputs.country.items = this.countries;
    }
    if (this.inputs?.country2) {
      this.inputs.country2.items = this.countries;
    }
    this.validateAllSteps();
  },
  watch: {
    "inputs.isUsePhPassport.value"(newValue: string) {
      if (this.inputs["arrivalStampFile"]) {
        this.inputs["arrivalStampFile"].title =
          "Upload Arrival Stamp " +
          (newValue === "Yes" || newValue === "No" ? "(if in PH)" : "");
      }

      if (
        this.inputs["passportNumber"] &&
        this.inputs["passportExpirationDate"]
      ) {
        this.inputs["passportNumber"].title = `${
          newValue === "No" ? "Foreign National " : ""
        }Passport Number`;
        this.inputs["passportExpirationDate"].title = `${
          newValue === "No" ? "Foreign National " : ""
        }Passport Expiration Date`;
      }
    },
    "inputs.dualFilipino.value"(newValue: string) {
      if (newValue === "No") {
        this.inputs = { ...defaultObjData, ...REGISTRATION_DF_NO_INPUTS };
      } else {
        this.inputs = { ...defaultObjData, ...REGISTRATION_DF_YES_INPUTS };
      }
    },
  },
};
</script>
