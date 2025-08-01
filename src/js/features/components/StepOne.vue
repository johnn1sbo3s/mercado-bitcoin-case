<template>
  <div class="step-one">
    <BaseInput
      v-model="email"
      label="Endereço de e-mail"
      type="email"
      placeholder="nome@exemplo.com"
      required
    />

    <RadioButton
      v-model="accountType"
      :options="accountOptions"
      @change="handleOptionChange"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import RadioButton from '../../core/components/RadioButton.vue';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const accountOptions = [
  {
    label: 'Pessoa Física',
    id: 'pf'
  },
  {
    label: 'Pessoa Jurídica',
    id: 'pj'
  },
];

const email = ref(model.value['step-one']?.email || '');
const accountType = ref(model.value['step-one']?.accountType || '');

const emailIsValid = computed(() => {
  return email.value.length > 0
    && email.value.includes('@')
    && email.value.includes('.com');
});

const accountTypeIsValid = computed(() => {
  return accountType.value !== '';
});

const isStepValid = computed(() => {
  return emailIsValid.value && accountTypeIsValid.value;
});

onMounted(() => {
  if (!model.value['step-one']) {
    model.value['step-one'] = {};
  }
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

watchEffect(() => {
  if (!model.value['step-one']) return;

  model.value['step-one'].email = email.value.trim();
});

watchEffect(() => {
  if (!model.value['step-one']) return;

  model.value['step-one'].accountType = accountType.value;
});

function handleOptionChange(selectedOption) {
  accountType.value = selectedOption;
  model.value['step-one'].accountType = selectedOption;
}

</script>

<style lang="scss" scoped>

.step-one {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
