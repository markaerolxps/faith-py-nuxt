<template>
  <div
    :class="`flex flex-col items-start w-full gap-1 ${classParentContainer}`"
  >
    <div class="flex-row items-start w-full gap-1">
      <label class="text-sm font-normal">{{ title }}</label>
      <span
        v-if="description != 'Indefinite' && $attrs.required"
        class="text-sm font-normal text-[#FF4D4F]"
        >*</span
      >

      <div v-if="description != 'Indefinite'">
        <small>{{ description }}</small>
      </div>
    </div>
    <div :class="description != 'Indefinite' ? 'w-full' : ''">
      <input
        v-bind="$attrs"
        :class="`border px-[12px] py-[8px] border-[#D9D9D9] bg-[#F5F5F5] rounded-lg w-full font-normal text-sm ${classInput} ${
          isError && 'border-2 border-red-400'
        }`"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
      default: "Select",
    },
    description: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    classInput: {
      type: String,
      required: false,
    },
    classParentContainer: {
      type: String,
      required: false,
    },
    isError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => {
    return {
      selectedFile: null,
      checkboxValue: false,
    };
  },
  methods: {
    updateValue(event) {
      if (this.$attrs.type === "checkbox") {
        this.checkbox = !this.checkbox;
        if (this.checkbox) {
          this.$emit("update:modelValue", "on");
        } else {
          this.$emit("update:modelValue", "off");
        }
      } else {
        this.$emit("update:modelValue", event.target.value);
      }
      // Emit an input event to update the value prop
    },
  },
};
</script>

<style scoped></style>
