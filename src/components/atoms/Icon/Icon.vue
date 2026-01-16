<script setup lang="ts">
import { computed } from "vue";
import { icons, isValidIconName } from "@/assets/icons";

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  ariaLabel: "",
});

const iconSize = computed(() => {
  if (props.size === "sm") return 16;
  if (props.size === "lg") return 24;
  return 20;
});

// アイコンデータを取得
const iconData = computed(() => {
  if (isValidIconName(props.name)) {
    return icons[props.name];
  }
  return null;
});

// アイコンが実装されているか
const hasIcon = computed(() => iconData.value !== null);

// パスデータを配列に統一
const iconPaths = computed(() => {
  if (!iconData.value) return [];
  return Array.isArray(iconData.value) ? iconData.value : [iconData.value];
});
</script>

<template>
  <span class="andm-icon" :data-icon="name" :data-size="size">
    <svg
      v-if="hasIcon"
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      role="img"
      :aria-label="ariaLabel || undefined"
      :aria-hidden="ariaLabel ? undefined : 'true'"
    >
      <path v-for="(path, index) in iconPaths" :key="index" :d="path" />
    </svg>
    <span
      v-else
      class="andm-icon__fallback"
      :aria-hidden="ariaLabel ? undefined : 'true'"
    >
      {{ name }}
    </span>
  </span>
</template>
