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
    class="flex flex-col items-start justify-center w-full"
    name="register-form"
    method="POST"
    enctype="multipart/form-data"
    @submit.prevent="sendForm"
  >
    <div
      class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
    >
      <Dropdown
        :title="'Filipino?'"
        :items="defaultItems"
        :hasOption="false"
        @selected-type="selectedFilipinoAction"
        v-model="filipinoActionSelected"
      />
    </div>
    <div
      class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      v-if="filipinoActionSelected === 'Yes'"
    >
      <Dropdown
        :title="'Have you submitted your child’s birth certificate?'"
        :items="defaultItems"
        :hasOption="false"
        @selected-type="selectedBirthCertAction"
        v-model="birthCertActionSelected"
      />
    </div>
    <div
      class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      v-if="
        birthCertActionSelected === 'No' && filipinoActionSelected === 'Yes'
      "
    >
      <UploadFile
        :title="'Upload Birth Certificate'"
        @uploadFile="birthCertUploadData"
        :refName="'uploadBirthCert'"
        @clear-file="clearFile('birthCertFile')"
      />
    </div>
    <div
      class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      v-if="
        birthCertActionSelected != 'Select' && filipinoActionSelected === 'Yes'
      "
    >
      <Dropdown
        :title="'Does your child have a Philippine Passport?'"
        :items="defaultItems"
        :hasOption="false"
        @selected-type="selectedPhPassportAction"
        v-model="phPassportActionSelected"
      />
    </div>

    <div
      class="flex flex-col w-full mb-4 gap-1"
      v-if="
        birthCertActionSelected != 'Select' &&
        filipinoActionSelected === 'Yes' &&
        phPassportActionSelected === 'Yes'
      "
    >
      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="passportNumber"
          :title="'Philippine Passport Number'"
          :placeholder="'Philippine Passport Number'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'passportNumber'"
          :value="passportNumber"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="passportDate"
          :title="'Passport Expiration Date'"
          :placeholder="'Passport Expiration Date'"
          v-on:change="inputChange"
          :type="'date'"
          :name="'passportDate'"
          :value="passportDate"
        />
      </div>
      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <UploadFile
          :title="'Upload Philippine Passport'"
          @uploadFile="uploadPassport"
          :refName="'uploadPassport'"
          @clear-file="clearFile('passportFile')"
        />
      </div>
    </div>

    <div
      class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      v-if="filipinoActionSelected === 'No'"
    >
      <div class="w-full flex flex-col mb-4 items-start">
        <Dropdown
          :title="'Country'"
          :items="countries"
          :hasOption="true"
          @selected-type="selectedCountry"
          v-model="countrySelected"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        v-if="countrySelected === 'Other'"
      >
        <InputText
          v-model="otherCountry"
          :title="'Other'"
          :placeholder="'Other'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'otherCountry'"
          :value="otherCountry"
        />
      </div>
      <div class="w-full flex flex-col mb-4 items-start">
        <Dropdown
          :title="'Nationality'"
          :items="nationalities"
          :hasOption="true"
          @selected-type="selectedNationality"
          v-model="nationalitySelected"
        />
      </div>
      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        v-if="nationalitySelected === 'Other'"
      >
        <InputText
          v-model="otherNationality"
          :title="'Other'"
          :placeholder="'Other'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'otherNationality'"
          :value="otherNationality"
        />
      </div>
      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="surName"
          :title="'Surname'"
          :placeholder="'Surname'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'surName'"
          :value="surName"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="firstName"
          :title="'First Name'"
          :placeholder="'First Name'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'firstName'"
          :value="firstName"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="middleName"
          :title="'Middle Name'"
          :placeholder="'First Name'"
          v-on:change="inputChange"
          :description="'If you don’t have one, just type “none”'"
          :type="'text'"
          :name="'middleName'"
          :value="middleName"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="birthPlace"
          :title="'Birth Place'"
          :placeholder="'Birth Place'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'birthPlace'"
          :value="birthPlace"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="dateOfBirth"
          :title="'Date of Birth'"
          :placeholder="'Date of Birth'"
          v-on:change="inputChange"
          :type="'date'"
          :name="'dateOfBirth'"
          :value="dateOfBirth"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="passportNumber"
          :title="'Passport Number'"
          :placeholder="'Passport Number'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'passportNumber'"
          :value="passportNumber"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="passportDate"
          :title="'Passport Expiration Date'"
          :placeholder="'Passport Expiration Date'"
          v-on:change="inputChange"
          :type="'date'"
          :name="'passportDate'"
          :value="passportDate"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <InputText
          v-model="issuingAuthority"
          :title="'Issuing Authority'"
          :placeholder="'Issuing Authority'"
          v-on:change="inputChange"
          :type="'text'"
          :name="'issuingAuthority'"
          :value="issuingAuthority"
        />
      </div>

      <div
        class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
      >
        <UploadFile
          :title="'Upload Passport Bio Page'"
          @uploadFile="uploadPassportBio"
          :refName="'uploadPassportBio'"
          @clear-file="clearFile('passportBioFile')"
        />
      </div>

      <div class="w-full flex flex-col mb-4 items-start">
        <Dropdown
          :title="'Is your child currently in the Philippines?'"
          :items="defaultItems"
          :hasOption="false"
          @selected-type="selectedChildCurrentlyInPh"
          v-model="childCurrentlyInPhSelected"
        />
      </div>

      <div
        class="flex flex-col items-start w-full"
        v-if="childCurrentlyInPhSelected !== 'Select'"
      >
        <div
          class="flex flex-col items-start w-full"
          v-if="childCurrentlyInPhSelected === 'Yes'"
        >
          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <InputText
              v-model="dateOfArrival"
              :title="'Date of Arrival'"
              :placeholder="'Date of Arrival'"
              v-on:change="inputChange"
              :type="'date'"
              :name="'dateOfArrival'"
              :value="dateOfArrival"
            />
          </div>

          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <InputText
              v-model="dateOfAuthorizedStay"
              :title="'Date of Authorized Stay'"
              :placeholder="'Date of Authorized Stay'"
              v-on:change="inputChange"
              :type="'date'"
              :name="'dateOfAuthorizedStay'"
              :value="dateOfAuthorizedStay"
            />
          </div>

          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <UploadFile
              :title="'Upload Arrival Stamp'"
              @uploadFile="uploadArrivalStamp"
              :refName="'uploadArrivalStamp'"
              @clear-file="clearFile('arrivalStampFile')"
            />
          </div>
        </div>

        <div
          class="flex flex-col w-full items-start"
          v-if="childCurrentlyInPhSelected === 'No'"
        >
          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <InputText
              v-model="anticipatedArrivalDate"
              :title="'Anticipated Date of Arrival'"
              :placeholder="'Anticipated Date of Arrival'"
              v-on:change="inputChange"
              :type="'date'"
              :name="'anticipatedArrivalDate'"
              :value="anticipatedArrivalDate"
            />
          </div>
        </div>

        <div class="w-full flex flex-col mb-4 items-start">
          <Dropdown
            :title="'How did/will your child enter the Philippines?'"
            :items="childEnterReasonItems"
            :hasOption="false"
            @selected-type="selectedChildEnterReason"
            v-model="childEnterReasonSelected"
            :isObjectArray="true"
          />
        </div>

        <div
          class="w-full flex flex-col mb-4 items-start"
          v-if="
            childEnterReasonSelected === 'balikbayan-visa' ||
            childEnterReasonSelected === 'visa-granted' ||
            childEnterReasonSelected === 'visa-free'
          "
        >
          <Dropdown
            :title="'Does your child need a visa to study in the Philippines?'"
            :items="childVisaItems"
            :hasOption="false"
            @selected-type="selectedChildVisa"
            v-model="childVisaSelected"
            :isObjectArray="true"
          />
        </div>

        <div
          class="w-full flex flex-col mb-4 items-start rounded-2xl bg-[#F0F7FE] justify-center"
          style="padding: 16px 24px"
          v-if="
            childEnterReasonSelected != 'ph-visa' &&
            childEnterReasonSelected != 'visa-holder' &&
            childVisaSelected != 'Select'
          "
        >
          <div
            class="flex flex-col w-full items-start justify-center gap-2"
            v-if="
              childVisaSelected === 'fa-a2-visa' ||
              childVisaSelected === 'balikbayan-visa-fa'
            "
          >
            <span class="text-sm font-medium text-[#1C355E]"
              >Apply for 47(a)(2) Visa</span
            >

            <div class="w-full flex flex-col items-start px-2 gap-2">
              <span class="text-xs font-normal"
                >We will prepare your child's application. Expect instructions
                to be sent to you via email.Please turnover your passport
                immediately to the Visa Office at Faith Academy or as soon as
                you arrive in the country</span
              >

              <span class="text-xs font-normal"
                >For more information please email
                g.visaoffice@faith.edu.ph</span
              >
            </div>
          </div>
          <div
            class="flex flex-col w-full items-start justify-center gap-2"
            v-if="
              childVisaSelected === 'fix-balikbayan-visa' ||
              childVisaSelected === 'fix-ph-visa'
            "
          >
            <span class="text-sm font-medium text-[#1C355E]"
              >Apply for SSP</span
            >

            <div class="w-full flex flex-col items-start px-2 gap-2">
              <span class="text-xs font-normal"
                >We will prepare your child's application. Expect instructions
                to be sent to you via email.Please turnover your passport
                immediately to the Visa Office at Faith Academy or as soon as
                you arrive in the country</span
              >

              <span class="text-xs font-normal"
                >For more information please email
                g.visaoffice@faith.edu.ph</span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-start w-full"
        v-if="childEnterReasonSelected === 'ph-visa'"
      >
        <div
          class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        >
          <InputText
            v-model="typeOfPhVisa"
            :title="'Type of Philippine Visa'"
            :placeholder="'Type of Philippine Visa'"
            v-on:change="inputChange"
            :type="'text'"
            :name="'typeOfPhVisa'"
            :value="typeOfPhVisa"
          />
        </div>

        <div
          class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        >
          <InputText
            v-model="phVisaExpDate"
            :title="'Expiration Date of Visa'"
            :placeholder="'Expiration Date of Visa'"
            v-on:change="inputChange"
            :type="'date'"
            :name="'phVisaExpDate'"
            :disabled="inDefinite ? true : false"
            :value="phVisaExpDate"
          />

          <div class="flex flex-row items-center justify-start mt-2 gap-1">
            <input
              type="checkbox"
              name="inDefinite"
              id="inDefinite"
              v-model="inDefinite"
              class="rounded-lg"
              @input="inputChange"
            />
            <span class="text-xs font-bold">Indefinite</span>
          </div>
        </div>

        <div
          class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        >
          <UploadFile
            :title="`Upload your child's visa page`"
            @uploadFile="uploadChildsVisaPage"
            :refName="'uploadChildsVisaPage'"
            @clear-file="clearFile('childsVisaPageFile')"
          />
        </div>

        <div
          class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
        >
          <Dropdown
            :title="'Do you have an ACR I-card or Philippine Retirement Authority (PRA) Card?'"
            :items="defaultItems"
            :hasOption="false"
            @selected-type="selectedAcrCardAction"
            v-model="acrCardActionSelected"
          />
        </div>
        <div
          class="flex flex-col items-start w-full"
          v-if="acrCardActionSelected === 'Yes'"
        >
          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <InputText
              v-model="acrCardExpDate"
              :title="'Expiration Date of ACR I-card Philippine Retirement Authority (PRA) Card'"
              :placeholder="'Expiration Date of ACR I-card Philippine Retirement Authority (PRA) Card'"
              v-on:change="inputChange"
              :type="'date'"
              :name="'acrCardExpDate'"
              :value="acrCardExpDate"
            />
          </div>
          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <UploadFile
              :title="`Upload your child's valid card, front ACR I-card or Philippine Retirement Authority (PRA) Card`"
              @uploadFile="uploadAcrCardFront"
              :refName="'uploadAcrCardFront'"
              @clear-file="clearFile('acrCardFileFront')"
            />
          </div>

          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <UploadFile
              :title="`Upload your child's valid card, back ACR I-card or Philippine Retirement Authority (PRA) Card`"
              @uploadFile="uploadAcrCardBack"
              :refName="'uploadAcrCardBack'"
              @clear-file="clearFile('acrCardFileBack')"
            />
          </div>
        </div>
        <div
          class="flex flex-col items-start w-full"
          v-if="acrCardActionSelected === 'No'"
        >
          <div
            class="flex flex-col items-start w-full gap-1 mb-4 fade-up-enter-active"
          >
            <InputText
              v-model="acrCardNoReason"
              :title="'Indicate reason why you don’t have an ACR I-Card or Philippine Retirement Authority (PRA) Card'"
              :placeholder="'Indicate reason why you don’t have an ACR I-Card or Philippine Retirement Authority (PRA) Card'"
              v-on:change="inputChange"
              :type="'text'"
              :name="'acrCardNoReason'"
              :value="acrCardNoReason"
            />
          </div>
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

<script>
import Dropdown from "../common/Dropdown.vue";
import UploadFile from "../common/UploadFile.vue";
import InputText from "../common/InputText.vue";
import { VueRecaptcha } from "vue-recaptcha";
import axios from "axios";
import envConfig from "~/configs/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { uploadFileService } from "../service/uploadService";
import { validateRegisterKey } from "../service/validateRegisterKeyService";
export default {
  components: { Dropdown, UploadFile, InputText, VueRecaptcha, Loading },
  data() {
    return {
      phPassportActionSelected: "Select",
      filipinoActionSelected: "Select",
      birthCertActionSelected: "Select",
      passportDate: "",
      isLoading: false,
      fullPage: true,
      jsonRequest: [],
      fileUpload: [],
      defaultItems: ["Yes", "No"],
      childEnterReasonItems: [
        {
          name: "My child is a Faith Academy visa holder",
          value: "visa-holder",
          link: false,
        },
        {
          name: "My child belongs to a Visa-free Entry Country",
          value: "visa-free",
          link: "https://www.philippineconsulatela.org/no-visa-entry-countries-for-30-day-stay-under-e-o-408",
        },
        {
          name: "My child will use/apply (9a-2) visa granted by the Philippine Embassy/Consulate",
          value: "visa-granted",
          link: false,
        },
        {
          name: "My child will be granted a one year Balikbayan visa",
          value: "balikbayan-visa",
          link: false,
        },
        {
          name: "Our family has a Philippine visa (e.g. 13a, 9g, under mission organization/company, SRRV)",
          value: "ph-visa",
          link: false,
        },
      ],
      childVisaItems: [
        {
          name: `Yes, my child needs Faith Academy's 47(a)(2) visa`,
          value: "fa-a2-visa",
          link: false,
        },
        {
          name: `Yes, convert my child's Balikbayan visa to Faith Academy's 47(a)(2) visa`,
          value: "balikbayan-visa-fa",
          link: false,
        },
        {
          name: `No, my child will remain on a Balikbayan visa`,
          value: "fix-balikbayan-visa",
          link: false,
        },
        {
          name: `No, our mission organization/company will apply for our family's Philippine visa`,
          value: "fix-ph-visa",
          link: false,
        },
      ],
      passportNumber: "",
      otherCountry: "",
      otherNationality: "",
      surName: "",
      firstName: "",
      middleName: "",
      birthPlace: "",
      dateOfBirth: "",
      issuingAuthority: "",
      countrySelected: "Select",
      dateOfArrival: "",
      dateOfAuthorizedStay: "",
      nationalitySelected: "Select",
      childCurrentlyInPhSelected: "Select",
      childEnterReasonSelected: "Select",
      childVisaSelected: "Select",
      inDefinite: false,
      typeOfPhVisa: "",
      phVisaExpDate: "",
      acrCardActionSelected: "Select",
      acrCardExpDate: "",
      acrCardNoReason: "",
      anticipatedArrivalDate: "",
      filipinoActionMenu: false,
      birthCertActionMenu: false,
      phPassportActionMenu: false,
      submitState: false,
      birthCertFile: null,
      passportFile: null,
      countries: [],
      nationalities: [],
      nationalityMenu: false,
      passportBioFile: null,
      countryMenu: false,
      childCurrentlyInPhMenu: false,
      childVisaMenu: false,
      acrCardActionMenu: false,
      childEnterReasonMenu: false,
      arrivalStampFile: null,
      childsVisaPageFile: null,
      acrCardFileFront: null,
      acrCardFileBack: null,
      recaptchaToken: null,
      flowFormat: null,
      formData: JSON.parse(localStorage.getItem("form-data")) || [],
    };
  },
  emits: ["backToOptions", "failedKey"],
  mounted() {
    this.getFormValues();
    this.getCountryList();
    this.getNationalityList();
    validateRegisterKey(
      localStorage.getItem("registerKey"),
      this.validateKeyCallback
    );
    document.body.addEventListener("click", this.closeDropDown);
  },
  updated() {
    this.submitStateValidate();
    if (this.inDefinite) {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.inDefinite = this.inDefinite;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    } else {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          delete value.inDefinite;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    }
  },
  methods: {
    clearFile(fileName) {
      if (fileName === "birthCertFile") {
        this.birthCertFile = null;
      }
      if (fileName === "passportFile") {
        this.passportFile = null;
      }
      if (fileName === "passportBioFile") {
        this.passportBioFile = null;
      }
      if (fileName === "arrivalStampFile") {
        this.arrivalStampFile = null;
      }
      if (fileName === "childVisaPageFile") {
        this.childVisaPageFile = null;
      }
      if (fileName === "acrCardFileFront") {
        this.acrCardFileFront = null;
      }
      if (fileName === "acrCardFileBack") {
        this.acrCardFileBack = null;
      }
      this.submitStateValidate();
    },
    validateKeyCallback(result) {
      if (result === "fail") {
        this.$emit("failedKey");
      }
    },
    getCountryList() {
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
    getNationalityList() {
      axios
        .get(
          `${envConfig.baseUrl}/api/method/faith_academy.endpoint.registration.registration.nationality_list`
        )
        .then((res) => {
          console.log(res);

          if (res.data) {
            this.nationalities = res.data.data;
          }
        })
        .catch((err) => {});
    },
    getStarted() {
      localStorage.removeItem("form-data");
      this.$emit("backToOptions");
    },
    getFormValues() {
      if (this.formData) {
        this.formData.forEach((element) => {
          this.filipinoActionSelected = element.filipinoAction || "Select";
          this.birthCertActionSelected = element.birthCertAction || "Select";
          this.phPassportActionSelected = element.phPassportAction || "Select";
          this.passportDate = element.passportDate || "";
          this.passportNumber = element.passportNumber || "";
          this.countrySelected = element.country || "Select";
          this.nationalitySelected = element.nationality || "Select";
          this.surName = element.surName || "";
          this.firstName = element.firstName || "";
          this.birthPlace = element.birthPlace || "";
          this.middleName = element.middleName || "";
          this.childCurrentlyInPhSelected =
            element.childCurrentlyInPh || "Select";
          this.issuingAuthority = element.issuingAuthority || "";
          this.dateOfBirth = element.dateOfBirth || "";
          this.otherCountry = element.otherCountry;
          this.otherNationality = element.otherNationality;
          this.dateOfArrival = element.dateOfArrival || "";
          this.dateOfAuthorizedStay = element.dateOfAuthorizedStay || "";
          this.childCurrentlyInPhSelected = element.childCurrentlyInPh;
          this.childEnterReasonSelected = element.childEnterReason;
          this.childVisaSelected = element.childVisa || "Select";
          this.inDefinite = element.inDefinite === "on" ? "on" : true;
          this.typeOfPhVisa = element.typeOfPhVisa;
          this.phVisaExpDate = element.phVisaExpDate;
          this.acrCardActionSelected = element.acrCard;
          this.acrCardExpDate = element.acrCardExpDate;
          this.acrCardNoReason = element.acrCardNoReason;
          this.anticipatedArrivalDate = element.anticipatedArrivalDate;
        });
      }
    },

    selectedFilipinoAction() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.filipinoAction = this.filipinoActionSelected;
        });
        if (this.filipinoActionSelected === "No") {
          this.formData.forEach((element) => {
            delete element.birthCertAction;
            delete element.phPassportAction;
            delete element.passportDate;
            delete element.passportNumber;
            this.birthCertActionSelected = "Select";
            this.phPassportActionSelected = "Select";
          });
        }
        if (this.filipinoActionSelected === "Yes") {
          this.formData.forEach((element) => {
            delete element.country;
            delete element.passportDate;
            delete element.passportNumber;
            delete element.country;
            delete element.nationality;
            delete element.surName;
            delete element.firstName;
            delete element.birthPlace;
            delete element.middleName;
            delete element.childCurrentlyInPh;
            delete element.issuingAuthority;
            delete element.dateOfBirth;
            delete element.otherCountry;
            delete element.otherNationality;
            delete element.dateOfArrival;
            delete element.dateOfAuthorizedStay;
            delete element.childCurrentlyInPh;
            delete element.childEnterReason;
            delete element.childVisa;
            delete element.inDefinite;
            delete element.typeOfPhVisa;
            delete element.phVisaExpDate;
            delete element.acrCard;
            delete element.acrCardExpDate;
            delete element.acrCardNoReason;
            delete element.anticipatedArrivalDate;
          });
        }
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      } else {
        this.formData.push({ filipinoAction: this.filipinoActionSelected });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    },
    showFilipinoActionOption() {
      this.filipinoActionMenu = !this.filipinoActionMenu;
    },
    showBirthCertActionOption() {
      this.birthCertActionMenu = !this.birthCertActionMenu;
    },
    selectedBirthCertAction() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.birthCertAction = this.birthCertActionSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    },
    showCountryMenu() {
      this.countryMenu = !this.countryMenu;
    },
    inputChange(e) {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value[e.target.name] = e.target.value;
        });
        console.log(e);
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    },
    selectedCountry() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.country = this.countrySelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    },
    showPhPassportActionOption() {
      this.phPassportActionMenu = !this.phPassportActionMenu;
    },
    selectedPhPassportAction() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.phPassportAction = this.phPassportActionSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
      this.phPassportActionMenu = false;
    },
    showNationalityMenu() {
      this.nationalityMenu = !this.nationalityMenu;
    },
    selectedNationality() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.nationality = this.nationalitySelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
      this.nationalityMenu = false;
    },
    showChildCurrentlyInPhMenu() {
      this.childCurrentlyInPhMenu = !this.childCurrentlyInPhMenu;
    },
    selectedChildCurrentlyInPh() {
      if (this.childCurrentlyInPhSelected === "Yes") {
        this.arrivalStampFile = null;
      }
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.childCurrentlyInPh = this.childCurrentlyInPhSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
    },
    showChildEnterReason() {
      this.childEnterReasonMenu = !this.childEnterReasonMenu;
    },
    selectedChildEnterReason() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.childEnterReason = this.childEnterReasonSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
      this.childEnterReasonMenu = false;
    },
    showChildVisa() {
      this.childVisaMenu = !this.childVisaMenu;
    },
    selectedChildVisa() {
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.childVisa = this.childVisaSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
      this.childVisaMenu = false;
    },
    showAcrCardOption() {
      this.acrCardActionMenu = !this.acrCardActionMenu;
    },
    selectedAcrCardAction() {
      if (this.acrCardActionSelected === "No") {
        this.acrCardFileBack = null;
        this.acrCardFileFront = null;
      }
      if (this.formData.length > 0) {
        this.formData.map((value) => {
          value.acrCard = this.acrCardActionSelected;
        });
        localStorage.setItem("form-data", JSON.stringify(this.formData));
      }
      this.acrCardActionMenu = false;
    },
    closeDropDown($event) {
      if (!$event || !this.$el.contains($event.target) || !$event.target.id) {
        this.birthCertActionMenu = false;
        this.filipinoActionMenu = false;
        this.phPassportActionMenu = false;
        this.countryMenu = false;
        this.nationalityMenu = false;
        this.childCurrentlyInPhMenu = false;
        this.childVisaMenu = false;
        this.acrCardActionMenu = false;
        this.childEnterReasonMenu = false;
      }
    },
    submitStateValidate() {
      if (
        this.phPassportActionSelected === "No" &&
        this.birthCertActionSelected === "Yes" &&
        this.filipinoActionSelected === "Yes" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-1";
        this.submitState = true;
      } else if (
        this.phPassportActionSelected === "No" &&
        this.birthCertActionSelected === "No" &&
        this.birthCertFile != null &&
        this.filipinoActionSelected === "Yes" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-2";
        this.submitState = true;
      } else if (
        this.phPassportActionSelected === "Yes" &&
        this.birthCertActionSelected === "No" &&
        this.filipinoActionSelected === "Yes" &&
        this.passportNumber &&
        this.passportDate &&
        this.passportFile != null &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-3";
        this.submitState = true;
      } else if (
        this.phPassportActionSelected === "Yes" &&
        this.birthCertActionSelected === "Yes" &&
        this.filipinoActionSelected === "Yes" &&
        this.passportNumber &&
        this.passportDate &&
        this.passportFile != null &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-4";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "No" &&
        this.anticipatedArrivalDate &&
        this.childEnterReasonSelected === "visa-holder" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-5";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "No" &&
        this.anticipatedArrivalDate &&
        (this.childEnterReasonSelected === "visa-granted" ||
          this.childEnterReasonSelected === "visa-free" ||
          this.childEnterReasonSelected === "balikbayan-visa") &&
        this.childVisaSelected != "Select" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-6";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "No" &&
        this.anticipatedArrivalDate &&
        this.childEnterReasonSelected === "ph-visa" &&
        this.typeOfPhVisa &&
        (this.phVisaExpDate || this.inDefinite) &&
        this.childsVisaPageFile != null &&
        this.acrCardActionSelected === "No" &&
        this.acrCardNoReason &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-7";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "No" &&
        this.dateOfArrival &&
        this.dateOfAuthorizedStay &&
        this.arrivalStampFile != null &&
        this.childEnterReasonSelected === "ph-visa" &&
        this.typeOfPhVisa &&
        (this.phVisaExpDate || this.inDefinite) &&
        this.childsVisaPageFile != null &&
        this.acrCardActionSelected === "Yes" &&
        this.acrCardExpDate &&
        this.acrCardFileFront != null &&
        this.acrCardFileBack != null &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-8";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "Yes" &&
        this.dateOfArrival &&
        this.dateOfAuthorizedStay &&
        this.arrivalStampFile != null &&
        this.childEnterReasonSelected === "visa-holder" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-9";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "Yes" &&
        this.dateOfArrival &&
        this.dateOfAuthorizedStay &&
        this.arrivalStampFile != null &&
        (this.childEnterReasonSelected === "visa-granted" ||
          this.childEnterReasonSelected === "visa-free" ||
          this.childEnterReasonSelected === "balikbayan-visa") &&
        this.childVisaSelected != "Select" &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-10";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "Yes" &&
        this.dateOfArrival &&
        this.dateOfAuthorizedStay &&
        this.arrivalStampFile != null &&
        this.childEnterReasonSelected === "ph-visa" &&
        this.typeOfPhVisa &&
        (this.phVisaExpDate || this.inDefinite) &&
        this.childsVisaPageFile != null &&
        this.acrCardActionSelected === "No" &&
        this.acrCardNoReason &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-11";
        this.submitState = true;
      } else if (
        this.filipinoActionSelected === "No" &&
        ((this.countrySelected != "Select" &&
          this.countrySelected != "Other") ||
          (this.countrySelected === "Other" && this.otherCountry)) &&
        ((this.nationalitySelected != "Select" &&
          this.nationalitySelected != "Other") ||
          (this.nationalitySelected === "Other" && this.otherNationality)) &&
        this.surName &&
        this.middleName &&
        this.firstName &&
        this.birthPlace &&
        this.dateOfBirth &&
        this.passportNumber &&
        this.passportDate &&
        this.issuingAuthority &&
        this.passportBioFile != null &&
        this.childCurrentlyInPhSelected === "Yes" &&
        this.dateOfArrival &&
        this.dateOfAuthorizedStay &&
        this.arrivalStampFile != null &&
        this.childEnterReasonSelected === "ph-visa" &&
        this.typeOfPhVisa &&
        (this.phVisaExpDate || this.inDefinite) &&
        this.childsVisaPageFile != null &&
        this.acrCardActionSelected === "Yes" &&
        this.acrCardExpDate &&
        this.acrCardFileFront != null &&
        this.acrCardFileBack != null &&
        this.recaptchaToken
      ) {
        this.flowFormat = "step-12";
        this.submitState = true;
      } else {
        this.submitState = false;
      }
    },
    uploadFileCallback(result, data) {
      if (result === "success") {
        if (data.message.birthCertFile) {
          this.birthCertFile = data.message.birthCertFile;
        }
        if (data.message.passportFile) {
          this.passportFile = data.message.passportFile;
        }
        if (data.message.passportBioFile) {
          this.passportBioFile = data.message.passportBioFile;
        }
        if (data.message.arrivalStampFile) {
          this.arrivalStampFile = data.message.arrivalStampFile;
        }
        if (data.message.childVisaPageFile) {
          this.childVisaPageFile = data.message.childVisaPageFile;
        }
        if (data.message.acrCardFileFront) {
          this.acrCardFileFront = data.message.acrCardFileFront;
        }
        if (data.message.acrCardFileBack) {
          this.acrCardFileBack = data.message.acrCardFileBack;
        }
        this.isLoading = false;
      } else {
        console.log("upload Failed", data);
        this.isLoading = false;
      }
    },
    birthCertUploadData(data) {
      this.isLoading = true;
      uploadFileService("birthCertFile", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadPassport(data) {
      this.isLoading = true;
      uploadFileService("passportFile", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadPassportBio(data) {
      this.isLoading = true;
      uploadFileService("passportBioFile", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadArrivalStamp(data) {
      this.isLoading = true;
      uploadFileService("arrivalStampFile", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadChildsVisaPage(data) {
      this.isLoading = true;
      uploadFileService("childsVisaPageFile", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadAcrCardFront(data) {
      this.isLoading = true;
      uploadFileService("acrCardFileFront", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    uploadAcrCardBack(data) {
      this.isLoading = true;
      uploadFileService("acrCardFileBack", data, this.uploadFileCallback);
      this.submitStateValidate();
    },
    onCaptchaVerified(response) {
      this.recaptchaToken = response;
      this.submitStateValidate();
    },
    expiredMethod() {
      this.recaptchaToken = null;
      this.submitStateValidate();
    },
    sendForm() {
      const formRequest = [];
      if (this.flowFormat === "step-1") {
        formRequest.push({
          phPassportAction: this.phPassportActionSelected,
          birthCertAction: this.birthCertActionSelected,
          filipinoAction: this.filipinoActionSelected,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-2") {
        formRequest.push({
          phPassportAction: this.phPassportActionSelected,
          birthCertAction: this.birthCertActionSelected,
          filipinoAction: this.filipinoActionSelected,
          birthCerFile: this.birthCertFile,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-3" || this.flowFormat === "step-4") {
        formRequest.push({
          phPassportAction: this.phPassportActionSelected,
          birthCertAction: this.birthCertActionSelected,
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-5") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          countrySelected: this.countrySelected,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          anticipatedArrivalDate: this.anticipatedArrivalDate,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          childVisaSelected: this.childVisaSelected,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-6") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          countrySelected: this.countrySelected,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          anticipatedArrivalDate: this.anticipatedArrivalDate,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          childVisaSelected: this.childVisaSelected,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-7") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          anticipatedArrivalDate: this.anticipatedArrivalDate,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          typeOfPhVisa: this.typeOfPhVisa,
          phVisaExpDate: this.phVisaExpDate,
          indefinite: this.inDefinite,
          acrCardAction: this.acrCardActionSelected,
          acrCardNoReason: this.acrCardNoReason,
          childsVisaPageFile: this.childsVisaPageFile,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-8") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          anticipatedArrivalDate: this.anticipatedArrivalDate,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          typeOfPhVisa: this.typeOfPhVisa,
          phVisaExpDate: this.phVisaExpDate,
          indefinite: this.inDefinite,
          acrCardAction: this.acrCardActionSelected,
          acrCardExpDate: this.acrCardExpDate,
          flowFormat: "flow-1",
          childsVisaPageFile: this.childsVisaPageFile,
          acrCardFileFront: this.acrCardFileFront,
          acrCardFileBack: this.acrCardFileBack,
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-9") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          authori: this.authori,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          flowFormat: "flow-1",
          childsVisaPageFile: this.childsVisaPageFile,
          acrCardFileFront: this.acrCardFileFront,
          acrCardFileBack: this.acrCardFileBack,
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-10") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          childVisaSelected: this.childVisaSelected,
          dateOfArrival: this.dateOfArrival,
          dateOfAuthorizedStay: this.dateOfAuthorizedStay,
          arrivalStampFile: this.arrivalStampFile,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-11") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          arrivalStampFile: this.arrivalStampFile,
          childsVisaPageFile: this.childsVisaPageFile,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          dateOfArrival: this.dateOfArrival,
          dateOfAuthorizedStay: this.dateOfAuthorizedStay,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          typeOfPhVisa: this.typeOfPhVisa,
          phVisaExpDate: this.phVisaExpDate,
          indefinite: this.inDefinite,
          acrCardAction: this.acrCardActionSelected,
          acrCardNoReason: this.acrCardNoReason,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("form-data")),
          recaptcha: this.recaptchaToken,
        });
      }
      if (this.flowFormat === "step-12") {
        formRequest.push({
          filipinoAction: this.filipinoActionSelected,
          passportNumber: this.passportNumber,
          passportDate: this.passportDate,
          passportFile: this.passportFile,
          passportBioFile: this.passportBioFile,
          arrivalStampFile: this.arrivalStampFile,
          childsVisaPageFile: this.childsVisaPageFile,
          acrCardFileFront: this.acrCardFileFront,
          acrCardFileBack: this.acrCardFileBack,
          countrySelected: this.countrySelected,
          otherCountry:
            this.countrySelected === "Other" ? this.otherCountry : null,
          nationality: this.nationalitySelected,
          otherNationality:
            this.countrySelected === "Other" ? this.otherNationality : null,
          surName: this.surName,
          middleName: this.middleName,
          firstName: this.firstName,
          birthPlace: this.birthPlace,
          dateOfBirth: this.dateOfBirth,
          issuingAuthority: this.issuingAuthority,
          dateOfArrival: this.dateOfArrival,
          dateOfAuthorizedStay: this.dateOfAuthorizedStay,
          childInPh: this.childCurrentlyInPhSelected,
          childEnterReason: this.childEnterReasonSelected,
          typeOfPhVisa: this.typeOfPhVisa,
          phVisaExpDate: this.phVisaExpDate,
          indefinite: this.inDefinite,
          childsVisaPageFile: this.childsVisaPageFile,
          acrCardAction: this.acrCardActionSelected,
          acrCardExpDate: this.acrCardExpDate,
          flowFormat: "flow-1",
          registerKey: JSON.parse(localStorage.getItem("registerKey")),
          recaptcha: this.recaptchaToken,
        });
      }
      this.isLoading = true;
      setTimeout(() => {
        console.log(formRequest[0]);
        this.isLoading = false;
      }, 2000);
    },
  },
  unmounted() {
    document.body.removeEventListener("click", this.closeDropDown);
  },
};
</script>
