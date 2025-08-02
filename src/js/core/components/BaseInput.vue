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

    <div
      v-if="errorMessage"
      class="base-input__error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { formatCpf } from '../../utils/formatters/cpf';
import { formatCnpj } from '../../utils/formatters/cnpj';
import { formatEmail } from '../../utils/formatters/email';
import { formatDate } from '../../utils/formatters/date';
import { formatPhone } from '../../utils/formatters/phone';

const model = defineModel({
  type: String,
  required: true
});

const props = defineProps({
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
  },
  formatter: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

watch(model, (newValue) => {
  if (!props.formatter) return;

  runValidation(newValue);
});

function runValidation(value) {
  if (!props.formatter) return true;

  if (props.formatter === 'cpf') {
    model.value = formatCpf(value);

    return;
  }

  if (props.formatter === 'email') {
    model.value = value.replace(' ', '');
    model.value = formatEmail(model.value);
    return;
  }

  if (props.formatter === 'date') {
    model.value = formatDate(value);
    return;
  }

  if (props.formatter === 'phone') {
    model.value = formatPhone(value);
    return;
  }

  if (props.formatter === 'cnpj') {
    model.value = formatCnpj(value);
    return;
  }
}

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

  &__error {
    font-size: 12px;
    font-weight: 550;
    color: var(--color-error);
  }
}

</style>
