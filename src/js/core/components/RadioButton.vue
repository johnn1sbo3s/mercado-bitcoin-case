<template>
  <div class="radio-button">
    <div
      v-for="option in options"
      :key="option.id"
      class="radio-button__item"
      @click="handleClick(option.id)"
    >
      <input
        :id="`radio-${option.id}`"
        v-model="model"
        type="radio"
        :value="option.id"
        @change="handleChange"
      >
      <label
        :for="`radio-${option.id}`"
        class="radio-button__label"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup>

const model = defineModel({
  type: String,
  default: ''
});

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

function handleClick(value) {
  model.value = value;
}

function handleChange(event) {
  model.value = event.target.value;
}

</script>

<style lang="scss" scoped>

.radio-button {
    background: white;
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    &__item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-md);
      border: 1px solid #ccc;
      border-radius: var(--border-radius-md);
      width: 100%;
      cursor: pointer;
    }
}

input[type="radio"] {
  cursor: pointer;
  appearance: none;
  width: var(--spacing-lg);
  height: var(--spacing-lg);
  border: 1px solid #ccc;
  border-radius: 100%;
  position: relative;
  transition: border-color 0.2s ease;
}

input[type="radio"]:checked {
  accent-color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: white;
}

input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: var(--color-primary);
}

label {
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: pointer;
}

</style>
