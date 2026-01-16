<template>
  <ButtonGroup
    :connected="true"
    role="group"
  >
    <template v-for="(option, index) in props.options" :key="option.value">
      <Button
        v-if="option.label"
        :variant="variant"
        :size="size"
        :aria-pressed="isPressed(option.value)"
        :disabled="props.disabled"
        :class="{ 'andm-toggle-btn--selected': isPressed(option.value) }"
        @click="handleClick(option.value)"
      >
        <template v-if="option.iconName" #icon>
          <Icon :name="option.iconName" aria-label="button icon" />
        </template>
        {{ option.label }}
      </Button>
      <IconButton
        v-else-if="option.iconName"
        :variant="variant === 'text' ? 'standard' : variant"
        :size="size"
        :aria-label="option.value"
        :aria-pressed="isPressed(option.value)"
        :disabled="props.disabled"
        :icon-name="option.iconName"
        :class="{ 'andm-toggle-btn--selected': isPressed(option.value) }"
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
import Button from "@/components/atoms/Button/Button.vue";
import IconButton from "@/components/atoms/IconButton/IconButton.vue";
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

