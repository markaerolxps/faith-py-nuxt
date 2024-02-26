<template>
  <div class="flex flex-col justify-center w-full h-screen">
    <CommonLayoutVue>
      <div
        class="flex flex-col w-[50rem] h-full justify-center items-center gap-[56px]"
      >
        <span class="font-bold text-[#1C355E] text-5xl"
          >Thank you for Submitting!</span
        >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="708"
          height="2"
          viewBox="0 0 708 2"
          fill="none"
        >
          <path d="M0.75 1H707.25" stroke="#595959" stroke-opacity="0.5" />
        </svg>

        <div
          class="flex flex-col w-[33.938rem] items-center justify-center px-3 gap-4"
        >
          <p class="text-sm font-normal text-center">
            If you have any questions or need assistance, please don’t hesitate
            to contact us at:.
          </p>

          <div class="flex flex-col">
            <p class="text-sm font-normal text-center">
              <span class="font-semibold">Mailing Address:</span> MCPO Box
              20160706 Makati City Philippines
            </p>
            <p class="text-sm font-normal text-center">
              <span class="font-semibold">Physical Address:</span> Penny Lane
              StreetValley Golf Subd., San Juan, Cainta, Rizal 1900
            </p>
            <p class="text-sm font-normal text-center">
              <span class="font-semibold">Phone & Fax:</span> Trunk/Landline:
              +63 2-8651-7100, Fax: +63 2-8857-2001
            </p>
            <p class="text-sm font-normal text-center">
              <span class="font-semibold">Email: </span>
              g.visaoffice@faith.edu.ph, registrar@faith.edu.ph
            </p>
          </div>
        </div>
      </div>
    </CommonLayoutVue>
  </div>
</template>

<script>
import CommonLayoutVue from "@/components/common/CommonLayout.vue";

export default {
  components: { CommonLayoutVue },
  mounted() {
    if (
      window.location.pathname.startsWith("/") &&
      !window.location.pathname.startsWith("/index.html")
    ) {
      // Update the URL path to remove "/assets/"
      const newPath = window.location.pathname.replace("/assets/", "/");
      window.history.replaceState({}, "", newPath);
    }
  },
};
</script>
