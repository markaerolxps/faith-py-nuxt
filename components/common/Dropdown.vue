<template>
  <div class="flex flex-col items-start w-full gap-1 relative">
    <div class="flex-row items-start w-full gap-1">
      <label class="text-sm font-normal">{{ title }}</label>
      <span class="text-sm font-normal text-[#FF4D4F]">*</span>
    </div>
    <div
      :class="`bg-[#F5F5F5] rounded-lg w-full items-start flex flex-col justify-start relative ${
        isError && 'border-2 border-red-400'
      }`"
      id="fil-action"
      @click="openMenu"
    >
      <div
        :class="`flex flex-row justify-between w-full z-20`"
        style="padding: 8px 12px"
        id="fil-field"
      >
        <span
          v-if="!isObjectArray"
          class="font-normal text-sm"
          :class="modelValue !== 'Select' ? 'text-[#252525]' : 'text-[#b8b8b8]'"
          >{{ modelValue }}</span
        >

        <span
          v-if="isObjectArray"
          class="font-normal text-sm"
          id="text-reason"
          :class="modelValue !== 'Select' ? 'text-[#252525]' : 'text-[#b8b8b8]'"
          >{{ arrayTextName }}</span
        >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.38879 4.39578C4.33148 4.44763 4.28551 4.51015 4.25362 4.57962C4.22174 4.64909 4.2046 4.72409 4.20322 4.80013C4.20183 4.87617 4.21624 4.95171 4.24558 5.02223C4.27492 5.09275 4.31859 5.15681 4.37398 5.21059C4.42937 5.26437 4.49535 5.30676 4.56799 5.33525C4.64062 5.36373 4.71842 5.37772 4.79675 5.37638C4.87507 5.37503 4.95232 5.35839 5.02387 5.32744C5.09543 5.29648 5.15983 5.25185 5.21323 5.19621L7.71768 2.76471L10.2221 5.19621C10.3327 5.29625 10.479 5.35071 10.6301 5.34812C10.7812 5.34553 10.9254 5.2861 11.0323 5.18233C11.1391 5.07857 11.2004 4.93858 11.203 4.79186C11.2057 4.64514 11.1496 4.50314 11.0466 4.39578L8.1299 1.56407C8.02052 1.45801 7.87226 1.39844 7.71768 1.39844C7.56309 1.39844 7.41483 1.45801 7.30545 1.56407L4.38879 4.39578ZM11.0466 9.6011C11.1496 9.49374 11.2057 9.35174 11.203 9.20502C11.2004 9.0583 11.1391 8.91831 11.0323 8.81454C10.9254 8.71078 10.7812 8.65134 10.6301 8.64875C10.479 8.64616 10.3327 8.70063 10.2221 8.80067L7.71768 11.2322L5.21323 8.80067C5.10265 8.70063 4.95639 8.64616 4.80527 8.64875C4.65415 8.65134 4.50996 8.71078 4.40308 8.81454C4.2962 8.91831 4.23498 9.0583 4.23232 9.20502C4.22965 9.35174 4.28575 9.49374 4.38879 9.6011L7.30545 12.4328C7.41483 12.5389 7.56309 12.5984 7.71768 12.5984C7.87226 12.5984 8.02052 12.5389 8.1299 12.4328L11.0466 9.6011Z"
            fill="black"
            fill-opacity="0.45"
          />
        </svg>
      </div>
      <select
        class="absolute w-full h-[50%] z-10 pointer-events-none opacity-0"
        v-bind="$attrs"
      >
        <option
          v-for="(item, index) in items"
          :value="item?.value ? item?.value : item"
        >
          {{ item?.value ? item?.value : item }}
        </option>
      </select>
    </div>
    <div class="relative flex w-full z-50" v-if="showMenu">
      <div
        class="flex flex-col absolute w-full items-start overflow-x-auto gap-1"
        v-if="!isObjectArray"
        style="
          border-radius: 8px;
          border: 1px solid var(--neutral-5, #d9d9d9);
          background: #fff;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
          padding: 8px 0px 8px 1px;
        "
        :class="items.length > 10 ? 'h-[200px]' : 'h-fit'"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-col w-full"
        >
          <span
            class="text-xs font-normal px-2 w-full hover:bg-[#F5F5F5] cursor-pointer"
            @click="selectedType(item)"
            >{{ item }}</span
          >
        </div>
        <!-- <span v-if="hasOption" class="text-xs font-normal px-2 w-full hover:bg-[#F5F5F5] cursor-pointer"
                    @click="selectedType('Other')">Other</span> -->
      </div>
      <div
        class="flex flex-col absolute w-full items-start gap-1"
        v-if="isObjectArray"
        style="
          border-radius: 8px;
          border: 1px solid var(--neutral-5, #d9d9d9);
          background: #fff;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
          padding: 8px 0px 8px 1px;
        "
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-col w-full"
        >
          <span
            v-if="!item.link"
            class="text-xs font-normal px-2 w-full hover:bg-[#F5F5F5] cursor-pointer"
            @click="selectedType(item)"
            >{{ item.name }}</span
          >
          <div
            class="w-full flex flex-col hover:bg-[#F5F5F5] items-start"
            v-if="item.link"
          >
            <span
              class="text-xs font-normal px-2 w-full cursor-pointer"
              @click="selectedType(item)"
              >{{ item.name }}</span
            >
            <a
              class="text-xs font-bold px-2 w-full cursor-pointer"
              :href="item.link"
              target="__blank"
              >{{ item.link }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
      default: "Select",
    },
    title: {
      type: String,
      required: false,
      default: "Yes",
    },
    items: {
      type: Object,
      required: false,
    },
    hasOption: {
      type: Boolean,
      required: true,
      default: false,
    },
    isObjectArray: {
      type: Boolean,
      required: false,
    },
    isError: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["selectedType", "update:modelValue"],
  data() {
    return {
      showMenu: false,
      arrayTextName: "",
    };
  },
  mounted() {
    document.body.addEventListener("click", this.closeMenu);
    if (this.isObjectArray) {
      this.items.map((item) => {
        if (item.value === this.modelValue) {
          this.arrayTextName = item.name;
        }
      });
    }
  },
  methods: {
    openMenu() {
      if (!this.disabled) {
        this.showMenu = !this.showMenu;
      }
    },
    closeMenu($event) {
      if (!$event || !this.$el.contains($event.target)) {
        this.showMenu = false;
      }
    },
    selectedType(item) {
      if (this.isObjectArray) {
        this.arrayTextName = item.name;
        this.$emit("update:modelValue", item.value);
        this.$emit("selectedType", item.value);
        this.showMenu = false;
      } else {
        this.$emit("update:modelValue", item);
        this.$emit("selectedType", item);
        this.showMenu = false;
      }
    },
  },
  destroyed() {
    document.body.removeEventListener("click", this.closeMenu);
  },
};
</script>
