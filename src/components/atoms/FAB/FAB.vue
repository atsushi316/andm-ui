<template>
  <button
    :class="fabClasses"
    :disabled="props.disabled"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled"
    :tabindex="props.disabled ? -1 : 0"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
    <span class="andm-fab__content">
      <span v-if="$slots.icon || props.iconName" class="andm-fab__icon">
        <slot name="icon">
          <Icon v-if="props.iconName" :name="props.iconName" />
        </slot>
      </span>
      <span v-if="props.label" class="andm-fab__label">{{ props.label }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiFAB",
});
import { computed, ref } from "vue";
import Icon from "@/components/atoms/Icon/Icon.vue";

interface Props {
  variant?: "surface" | "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  label?: string;
  iconName?: string;
  disabled?: boolean;
  lowered?: boolean;
  ariaLabel: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  lowered: false,
});

const isPressed = ref(false);

const handleMouseDown = () => {
  if (!props.disabled) {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  isPressed.value = false;
};

const handleMouseLeave = () => {
  isPressed.value = false;
};

const fabClasses = computed(() => {
  return [
    "andm-fab",
    `andm-fab--${props.variant}`,
    `andm-fab--${props.size}`,
    props.label ? "andm-fab--extended" : "",
    props.lowered ? "andm-fab--lowered" : "",
    isPressed.value ? "andm-fab--pressed" : "",
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

