<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
    :aria-disabled="props.disabled"
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
  name: "UiButton",
});
import { computed, ref } from "vue";
import Icon from "@/components/atoms/Icon/Icon.vue";

interface Props {
  variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "filled",
  size: "md",
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

const buttonClasses = computed(() => {
  return [
    "andm-btn",
    `andm-btn--${props.variant}`,
    `andm-btn--${props.size}`,
    isPressed.value ? "andm-btn--pressed" : "",
  ]
    .filter(Boolean)
    .join(" ");
});
</script>
