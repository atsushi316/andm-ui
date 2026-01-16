<template>
  <button
    :class="toggleIconButtonClasses"
    v-bind="$attrs"
    :disabled="props.disabled"
    :aria-disabled="props.disabled"
    :aria-pressed="props.pressed"
    :aria-label="props.ariaLabel"
    :tabindex="props.disabled ? -1 : 0"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
    <slot name="icon">
      <Icon
        v-if="resolvedIconName"
        :name="resolvedIconName"
        :size="props.size"
        :aria-label="props.ariaLabel"
      />
    </slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiToggleIconButton",
});
import { computed, ref } from "vue";
import Icon from "@/components/atoms/Icon/Icon.vue";

interface Props {
  variant?: "standard" | "filled" | "tonal" | "outlined";
  size?: "sm" | "md" | "lg";
  pressed?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  iconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "standard",
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

const toggleIconButtonClasses = computed(() => {
  return [
    "andm-btn",
    "andm-btn--icon",
    "andm-icon-btn",
    `andm-icon-btn--${props.variant}`,
    `andm-icon-btn--${props.size}`,
    props.pressed ? "andm-toggle-btn--selected" : "",
    isPressed.value ? "andm-btn--pressed" : "",
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

