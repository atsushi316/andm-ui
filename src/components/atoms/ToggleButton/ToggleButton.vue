<template>
  <button
    :class="toggleButtonClasses"
    v-bind="$attrs"
    :disabled="props.disabled"
    :aria-disabled="props.disabled"
    :aria-pressed="props.pressed"
    :tabindex="props.disabled ? -1 : 0"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
    <span v-if="$slots.icon || resolvedIconName" class="andm-btn__icon">
      <slot name="icon">
        <Icon
          v-if="resolvedIconName"
          :name="resolvedIconName"
          aria-label="button icon"
        />
      </slot>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiToggleButton",
});
import { computed, ref } from "vue";
import Icon from "@/components/atoms/Icon/Icon.vue";

interface Props {
  variant?: "filled" | "tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  pressed?: boolean;
  disabled?: boolean;
  iconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "filled",
  size: "md",
  pressed: false,
  disabled: false,
});

const isPressed = ref(false);
const resolvedIconName = computed(() => props.iconName);

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

const toggleButtonClasses = computed(() => {
  return [
    "andm-btn",
    `andm-btn--${props.variant}`,
    `andm-btn--${props.size}`,
    props.pressed ? "andm-toggle-btn--selected" : "",
    isPressed.value ? "andm-btn--pressed" : "",
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

