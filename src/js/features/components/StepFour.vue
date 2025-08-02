<template>
  <div class="step-four">
    <BaseInput
      v-model="data.email"
      label="Endereço de e-mail"
      type="text"
      placeholder="nome@exemplo.com"
      :error-message="errorMessages.email"
      required
    />

    <BaseInput
      v-model="data.name"
      type="text"
      :placeholder="selectedAccountType === 'pf' ? 'Nome completo' : 'Razão social'"
      :label="selectedAccountType === 'pf' ? 'Nome' : 'Razão social'"
      :error-message="errorMessages.name"
      required
    />

    <BaseInput
      v-model="data.identifier"
      type="text"
      formatter="cpf"
      placeholder="Apenas números"
      :label="selectedAccountType === 'pf' ? 'CPF' : 'CNPJ'"
      :error-message="errorMessages.identifier"
      required
    />

    <BaseInput
      v-model="data.referenceDate"
      type="date"
      placeholder="Ex.: 15/10/2000"
      :label="selectedAccountType === 'pf' ? 'Data de nascimento' : 'Data de abertura'"
      :error-message="errorMessages.referenceDate"
      required
    />

    <BaseInput
      v-model="data.phone"
      type="text"
      formatter="phone"
      placeholder="Apenas números (com DDD)"
      label="Telefone"
      :error-message="errorMessages.phone"
      required
    />

    <BaseInput
      v-model="data.password"
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
import { ref, computed, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import { validateEmail } from '../../utils/validators/email';
import { validateCpf } from '../../utils/validators/cpf';
import { validateCnpj } from '../../utils/validators/cnpj';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const selectedAccountType = computed(() => {
  return model.value['step-one']?.accountType;
});

const data = ref({
  email: model.value['step-one']?.email || '',
  password: model.value['step-three']?.password || '',
  name: model.value['step-two']?.name || '',
  identifier: model.value['step-two']?.identifier || '',
  referenceDate: model.value['step-two']?.referenceDate || '',
  phone: model.value['step-two']?.phone || '',
})

const errorMessages = ref({
  email: '',
  password: '',
  name: '',
  identifier: '',
  referenceDate: '',
  phone: '',
});

const isStepValid = computed(() => {
  return validateEmail(data.value.email)
    && data.value.name.length > 3
    && (selectedAccountType.value === 'pf' ? validateCpf : validateCnpj)(data.value.identifier)
    && validatePhone(data.value.phone)
    && data.value.password.length >= 8;
});

watchEffect(() => {
  if (data.value.email?.length) {
    errorMessages.value.email = validateEmail(data.value.email) ? '' : 'Endereço de e-mail inválido';
  } else errorMessages.value.email = '';

  if (data.value.name?.length) {
    errorMessages.value.name = data.value.name.length < 3 ? 'Nome inválido' : '';
  } else errorMessages.value.name = '';

  if (data.value.identifier?.length) {
    errorMessages.value.identifier = (selectedAccountType.value === 'pf' ? validateCpf : validateCnpj)(data.value.identifier)
      ? ''
      : selectedAccountType.value === 'pf' ? 'CPF inválido' : 'CNPJ inválido';
  } else errorMessages.value.identifier = '';

  if (data.value.phone?.length) {
    errorMessages.value.phone = validatePhone(data.value.phone) ? '' : 'Telefone inválido';
  } else errorMessages.value.phone = '';
});

watchEffect(() => {
  model.value['step-one'].email = data.value.email;
  model.value['step-two'].name = data.value.name;
  model.value['step-two'].identifier = data.value.identifier;
  model.value['step-two'].referenceDate = data.value.referenceDate;
  model.value['step-two'].phone = data.value.phone;
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

</script>

<style lang="scss" scoped>

.step-four {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
