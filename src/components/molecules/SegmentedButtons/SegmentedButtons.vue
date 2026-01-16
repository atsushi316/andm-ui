<template>
  <ButtonGroup
    :connected="true"
    role="group"
  >
    <template v-for="(option, index) in props.options" :key="option.value">
      <ToggleButton
        v-if="option.label"
        :variant="variant"
        :size="size"
        :pressed="isPressed(option.value)"
        :disabled="props.disabled"
        @click="handleClick(option.value)"
      >
        <template v-if="option.iconName" #icon>
          <Icon :name="option.iconName" aria-label="button icon" />
        </template>
        {{ option.label }}
      </ToggleButton>
      <ToggleIconButton
        v-else-if="option.iconName"
        :variant="variant"
        :size="size"
        :pressed="isPressed(option.value)"
        :disabled="props.disabled"
        :aria-label="option.value"
        :icon-name="option.iconName"
        @click="handleClick(option.value)"
      />
    </template>
  </ButtonGroup>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiSegmentedButtons",
});
import { computed } from "vue";
import ToggleButton from "@/components/atoms/ToggleButton/ToggleButton.vue";
import ToggleIconButton from "@/components/atoms/ToggleIconButton/ToggleIconButton.vue";
import ButtonGroup from "@/components/molecules/ButtonGroup/ButtonGroup.vue";
import Icon from "@/components/atoms/Icon/Icon.vue";

interface Option {
  value: string;
  label?: string;
  iconName?: string;
}

interface Props {
  mode?: "single" | "multiple";
  options: Option[];
  value?: string;
  values?: string[];
  variant?: "filled" | "tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "single",
  variant: "filled",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:value": [value: string];
  "update:values": [values: string[]];
  change: [value: string | string[]];
}>();

const isPressed = (optionValue: string): boolean => {
  if (props.mode === "single") {
    return props.value === optionValue;
  } else {
    return props.values?.includes(optionValue) ?? false;
  }
};

const handleClick = (optionValue: string) => {
  if (props.disabled) return;

  if (props.mode === "single") {
    emit("update:value", optionValue);
    emit("change", optionValue);
  } else {
    const currentValues = props.values ?? [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];
    emit("update:values", newValues);
    emit("change", newValues);
  }
};
</script>

