<template>
  <div class="flex flex-col justify-center w-full">
    <Header />
    <div class="flex flex-col w-full h-full justify-center items-center py-20">
      <div
        class="main flex flex-col items-center gap-[3.5rem] w-[40rem]"
        v-if="step !== 'step-2'"
      >
        <div class="flex flex-col items-center gap-[2rem]">
          <h1
            class="text-[#1C355E] text-center text-[3rem] font-bold leading-[3.5rem]"
          >
            Students Bureau of Immigration Compliance
          </h1>

          <span
            style="font-family: 'Roboto', sans-serif"
            class="text-black text-center text-sm font-normal px-16"
            >Foreign National Students (FNS) including Dual Filipino Citizens
            (DFC) must comply with the Bureau of Immigration’s requirements to
            be permitted to attend class at Faith Academy, Inc. Filipino (having
            only one citizenship) students need only to submit a scanned copy of
            their Philippine Statistics Authority (PSA) Certificate of Live
            Birth.</span
          >
        </div>
        <!-- first Step -->
        <div
          class="step-1 w-full flex flex-col items-center gap-[1rem]"
          v-if="step === 'step-1'"
        >
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
          <div class="flex flex-col w-[33.563rem] items-start">
            <InputText
              v-model="registerKey"
              :title="'Register Key'"
              :placeholder="'Register Key'"
              @input="inputChange"
              :type="'text'"
              :name="'registerKey'"
              :value="registerKey"
            />
            <span v-if="error" class="font-bold text-sm text-red-400">{{
              errorText
            }}</span>
          </div>
          <div
            style="padding: 22px"
            class="w-[33.563rem] flex flex-col justify-center items-center rounded-2xl gap-[0.625rem]"
            :class="
              getStartedState && registerKey
                ? 'bg-[#C2E5FF] text-black  cursor-pointer '
                : 'bg-[#D9D9D9] text-[#343541]'
            "
            @click="getStarted"
          >
            <span>Let’s Gets Started →</span>
          </div>
          <div
            class="flex flex-row items-start justify-center gap-1"
            style="padding: 22px 60px"
          >
            <input
              type="checkbox"
              name="accept"
              id="accept"
              v-model="accept"
              class="rounded-lg"
              style="margin-top: 2px"
            />
            <span class="text-xs font-normal text-center"
              >By proceeding, I agree that Faith Academy can collect, use and
              disclose the information provided by me in accordance with the
              <nuxt-link
                :href="redirect('/privacy-policy')"
                target="_blank"
                class="underline"
                >Privacy Policy</nuxt-link
              >
              and I fully comply with the
              <nuxt-link
                class="underline"
                :href="redirect('/terms-and-condition')"
                target="_blank"
                >Terms & Conditions</nuxt-link
              >
              which I have read and understand.
            </span>
          </div>
        </div>
        <div
          class="dual-citizen-no w-[33.563rem] flex flex-col items-start gap-[1rem]"
          v-if="step === 'dual-citizen-no'"
        >
          <RegistrationForm @back-to-options="getStarted" />
        </div>
        <div
          class="dual-citizen-yes w-[33.563rem] flex flex-col items-start gap-[1rem]"
          v-else-if="step === 'dual-citizen-yes'"
        >
          <RegistrationDCYesForm @back-to-options="getStarted" />
        </div>
      </div>
      <div
        class="step-2 flex flex-col items-center gap-[3.5rem] w-[40rem]"
        v-if="step === 'step-2'"
      >
        <div class="flex flex-col items-center gap-[2rem] w-[33.563rem]">
          <h1
            style="font-family: 'Roboto', sans-serif"
            class="text-[#1C355E] text-center text-[3rem] font-bold leading-[3.5rem]"
          >
            Dual Citizen?
          </h1>
        </div>

        <div class="w-full flex flex-col items-center gap-[1rem]">
          <div
            style="padding: 22px 152px"
            class="cursor-pointer w-[33.563rem] flex flex-col justify-center items-center rounded-2xl bg-[#C2E5FF] gap-[0.625rem]"
            @click="yesAction"
          >
            <span>Yes →</span>
          </div>

          <div
            style="padding: 22px 152px"
            class="cursor-pointer w-[33.563rem] flex flex-col justify-center items-center rounded-2xl bg-[#C2E5FF] gap-[0.625rem]"
            @click="noAction"
          >
            <span>No →</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { redirect } from "~/components/common/utils/object";
import Header from "../components/common/Header.vue";
import RegistrationForm from "../components/form-dc-no-flow/RegistrationForm.vue";
import RegistrationDCYesForm from "../components/form-dc-yes-flow/RegistrationDCYesForm.vue";
import InputText from "~/components/common/InputText.vue";
import envConfig from "~/configs/api";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  components: {
    Header,
    RegistrationForm,
    RegistrationDCYesForm,
    InputText,
    Loading,
  },
  data() {
    return {
      step: "step-1",
      process: process.browser ? localStorage.getItem("process") : "",
      accept: false,
      registerKey: "",
      error: false,
      errorText: "",
      isLoading: false,
      fullPage: true,
      getStartedState: false,
    };
  },
  mounted() {
    this.getFormValues();
    console.log(this.process);
  },
  updated() {
    if (this.accept) {
      this.getStartedState = true;
    } else {
      this.getStartedState = false;
    }
  },
  methods: {
    inputChange(e) {
      localStorage.setItem(
        "form-data",
        JSON.stringify([{ registerKey: e.target.value }])
      );
    },
    redirect(url: string) {
      return redirect(url);
    },
    getFormValues() {
      if (process.browser) {
        localStorage.setItem(
          "register-path",
          this.$router.currentRoute.value.path
        );
      }
      if (this.process) {
        this.step = this.process;
      }
    },

    getStarted() {
      if (this.registerKey != "") {
        this.error = false;
        this.errorText = "";
        this.isLoading = true;
        axios
          .post(
            `${envConfig.baseUrl}/method/faith_academy.endpoint.registration.registration.validate_unique_key`,
            { unique_key: this.registerKey }
          )
          .then((res) => {
            console.log(res);

            if (res.data) {
              this.isLoading = false;
              this.step = "step-2";
              localStorage.setItem("process", this.step);
            }
          })
          .catch((err) => {
            this.error = true;
            if (err.response.data) {
              this.errorText = err.response.data.message;
            }
            this.isLoading = false;
            console.log(err);
          });
      }
    },
    noAction() {
      this.step = "dual-citizen-no";
      localStorage.setItem("process", this.step);
    },
    yesAction() {
      this.step = "dual-citizen-yes";
      localStorage.setItem("process", this.step);
    },
  },
};
</script>
