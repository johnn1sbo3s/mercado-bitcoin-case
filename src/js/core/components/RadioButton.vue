<template>
  <div class="radio-button">
    <div
      v-for="option in options"
      :key="option"
      class="radio-button__item"
      @click="handleClick(option.id)"
    >
      <input
        type="radio"
        :value="option.id"
        :checked="selectedOption === option.id"
      >

      <label class="radio-button__label">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['change']);

const selectedOption = ref('');

function handleClick(value) {
  selectedOption.value = value;
  emit('change', selectedOption.value);
}

</script>

<style lang="scss" scoped>

.radio-button {
    background: white;
    display: flex;
    align-items: center;
    gap: 12px;

    &__item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      width: 100%;
      cursor: pointer;
    }
}

input[type="radio"] {
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 100%;
  position: relative;
  transition: border-color 0.2s ease;
}

input[type="radio"]:checked {
  accent-color: #ff9900;
  border-color: #ff9900;
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
  background-color: #ff9900;
}

label {
  font-size: 14px;
  color: #2e2e2e;
  cursor: pointer;
}

</style>
