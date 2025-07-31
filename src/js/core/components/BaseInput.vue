<template>
  <div class="base-input">
    <div class="base-input__label">
      <label for="base-input">
        {{ label || 'Label' }}
      </label>

      <p
        v-if="required"
        class="base-input__required"
      >
        *
      </p>
    </div>

    <input
      v-model="model"
      class="base-input__field"
      :placeholder="placeholder"
      :type="type"
      :required="required"
    >
  </div>
</template>

<script setup>

const model = defineModel({
  type: String,
  required: true
});

defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Insira a informação'
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  }
});

</script>

<style lang="scss" scoped>

.base-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 550;

  &__label {
    display: flex;
    gap: var(--spacing-xs);
    align-items: center;
  }

  &__required {
    color: var(--color-error);
  }

  &__field {
    font-size: 14px;
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    box-sizing: border-box;
  }
}

</style>
