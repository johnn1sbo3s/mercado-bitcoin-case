<template>
  <div class="step-one">
    <BaseInput
      v-model="email"
      label="Endereço de e-mail"
      type="email"
      placeholder="nome@exemplo.com"
      formatter="email"
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
import { validateEmail } from '../../utils/validators/email';

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

const emailErrorMsg = ref('');

const isStepValid = computed(() => {
  return validateEmail(email.value)
    && accountOptions.map(({ id }) => id).includes(accountType.value);
});

onMounted(() => {
  if (!model.value['step-one']) {
    model.value['step-one'] = {};
  }
});

watchEffect(() => {
  if (email.value?.length) {
    emailErrorMsg.value = validateEmail ? 'Endereço de e-mail inválido' : '';
  } else emailErrorMsg.value = '';
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

watchEffect(() => {
  if (!model.value['step-one']) return;

  model.value['step-one'].email = email.value.trim();
  model.value['step-one'].accountType = accountType.value;
});

watchEffect(() => {
  if (accountType.value === 'pf') {
    delete model.value['step-pj'];
    return;
  }

  delete model.value['step-pf'];
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
