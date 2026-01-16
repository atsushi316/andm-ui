<template>
  <ButtonGroup :connected="true">
    <Button
      :variant="props.variant"
      :size="props.size"
      :disabled="props.disabled"
      @click="handlePrimaryClick"
    >
      {{ props.label }}
    </Button>
    <IconButton
      :variant="iconButtonVariant"
      :size="props.size"
      :disabled="props.disabled"
      :aria-label="`${props.label} menu`"
      :aria-expanded="props.menuExpanded"
      aria-haspopup="menu"
      @click="handleMenuClick"
    >
      <template #icon>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </template>
    </IconButton>
  </ButtonGroup>
</template>

<script setup lang="ts">
defineOptions({
  name: "UiSplitButton",
});
import { computed } from "vue";
import Button from "@/components/atoms/Button/Button.vue";
import IconButton from "@/components/atoms/IconButton/IconButton.vue";
import ButtonGroup from "@/components/molecules/ButtonGroup/ButtonGroup.vue";

interface Props {
  variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label: string;
  menuExpanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "filled",
  size: "md",
  disabled: false,
  menuExpanded: false,
});

const emit = defineEmits<{
  click: [];
  menuClick: [];
}>();

// IconButtonのvariantをマッピング
// filled/tonal/outlined は同名、elevated/text は standard にマッピング
const iconButtonVariant = computed<"standard" | "filled" | "tonal" | "outlined">(() => {
  if (props.variant === "filled" || props.variant === "tonal" || props.variant === "outlined") {
    return props.variant;
  }
  return "standard";
});

const handlePrimaryClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};

const handleMenuClick = () => {
  if (!props.disabled) {
    emit("menuClick");
  }
};
</script>

