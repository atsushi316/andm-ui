<template>
  <div :class="groupClasses" role="group">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiButtonGroup",
});
import { computed, provide, useSlots } from "vue";

interface Props {
  connected?: boolean;
  orientation?: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<Props>(), {
  connected: false,
  orientation: "horizontal",
});

const slots = useSlots();

const groupClasses = computed(() => {
  return [
    "andm-group",
    props.connected ? "andm-group--connected" : "",
    `andm-group--${props.orientation}`,
  ]
    .filter(Boolean)
    .join(" ");
});

// 子要素に位置情報を提供
provide("buttonGroupContext", {
  connected: props.connected,
  orientation: props.orientation,
});
</script>

