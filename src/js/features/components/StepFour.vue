<template>
  <div class="step-four">
    <BaseInput
      v-model="email"
      label="Endereço de e-mail"
      type="text"
      placeholder="nome@exemplo.com"
      :error-message="errorMessages.email"
      required
    />

    <BaseInput
      v-model="name"
      type="text"
      :placeholder="stepTwoKey === 'step-pf' ? 'Nome completo' : 'Razão social'"
      :label="stepTwoKey === 'step-pf' ? 'Nome' : 'Razão social'"
      :error-message="errorMessages.name"
      required
    />

    <BaseInput
      v-model="identifier"
      type="text"
      formatter="cpf"
      placeholder="Apenas números"
      :label="stepTwoKey === 'step-pf' ? 'CPF' : 'CNPJ'"
      :error-message="errorMessages.identifier"
      required
    />

    <BaseInput
      v-model="referenceDate"
      type="text"
      formatter="date"
      placeholder="Ex.: 15/10/2000"
      :label="stepTwoKey === 'step-pf' ? 'Data de nascimento' : 'Data de abertura'"
      :error-message="errorMessages.referenceDate"
      required
    />

    <BaseInput
      v-model="phone"
      type="text"
      formatter="phone"
      placeholder="Apenas números (com DDD)"
      label="Telefone"
      :error-message="errorMessages.phone"
      required
    />

    <BaseInput
      v-model="password"
      label="Sua senha"
      type="password"
      placeholder="Mínimo de 8 caracteres"
      :error-message="errorMessages.password"
      required
      disabled
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import { validateEmail } from '../../utils/validators/email';
import { validateCpf } from '../../utils/validators/cpf';
import { validateCnpj } from '../../utils/validators/cnpj';
import { validatePhone } from '../../utils/validators/phone';
import { validateDate } from '../../utils/validators/date';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const stepTwoKey = ref(findStepTwoKey());

const email = ref(model.value['step-one']?.email || '');
const password = ref(model.value['step-three']?.password || '');
const name = ref(model.value[stepTwoKey.value]?.name || '');
const identifier = ref(model.value[stepTwoKey.value]?.identifier || '');
const referenceDate = ref(model.value[stepTwoKey.value]?.referenceDate || '');
const phone = ref(model.value[stepTwoKey.value]?.phone || '');

const errorMessages = ref({
  email: '',
  password: '',
  name: '',
  identifier: '',
  referenceDate: '',
  phone: '',
});

const isStepValid = computed(() => {
  return validateEmail(email.value)
    && name.value.length > 3
    && (stepTwoKey.value === 'step-pf' ? validateCpf : validateCnpj)(identifier.value)
    && validateDate(referenceDate.value)
    && validatePhone(phone.value)
    && password.value.length >= 8;
});

watchEffect(() => {
  if (email.value?.length) {
    errorMessages.value.email = validateEmail(email.value) ? '' : 'Endereço de e-mail inválido';
  } else errorMessages.value.email = '';

  if (name.value?.length) {
    errorMessages.value.name = name.value.length < 3 ? 'Nome inválido' : '';
  } else errorMessages.value.name = '';

  if (identifier.value?.length) {
    errorMessages.value.identifier = (stepTwoKey.value === 'step-pf' ? validateCpf : validateCnpj)(identifier.value)
      ? ''
      : stepTwoKey.value === 'step-pf' ? 'CPF inválido' : 'CNPJ inválido';
  } else errorMessages.value.identifier = '';

  if (referenceDate.value?.length) {
    errorMessages.value.referenceDate = validateDate(referenceDate.value) ? '' : 'Data inválida';
  } else errorMessages.value.referenceDate = '';

  if (phone.value?.length) {
    errorMessages.value.phone = validatePhone(phone.value) ? '' : 'Telefone inválido';
  } else errorMessages.value.phone = '';

  if (password.value?.length) {
    errorMessages.value.password = password.value.length < 8 ? 'A senha deve ter no mínimo 8 caracteres' : '';
  } else errorMessages.value.password = '';
});

watchEffect(() => {
  model.value['step-one'].email = email.value;
  model.value[stepTwoKey.value].name = name.value;
  model.value[stepTwoKey.value].identifier = identifier.value;
  model.value[stepTwoKey.value].referenceDate = referenceDate.value;
  model.value[stepTwoKey.value].phone = phone.value;
  model.value['step-three'].password = password.value;
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

function findStepTwoKey() {
  if (model.value['step-one']?.accountType === 'pf') {
    return 'step-pf';
  }

  return 'step-pj';
}

</script>

<style lang="scss" scoped>

.step-four {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
