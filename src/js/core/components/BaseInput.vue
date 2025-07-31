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
  gap: 4px;
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 550;

  &__label {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  &__required {
    color: #ff0000;
  }

  &__field {
    font-size: 15px;
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
  }
}

</style>
