<template>
  <div class="step-pf">
    <BaseInput
      v-model="data.name"
      type="text"
      :label="selectedAccountType === 'pf' ? 'Nome completo' : 'Razão social'"
      :placeholder="selectedAccountType === 'pf' ? 'Seu nome completo' : 'Razão social'"
      :error-message="errorMessages.name"
      required
    />

    <BaseInput
      v-model="data.identifier"
      placeholder="Apenas números"
      :label="selectedAccountType === 'pf' ? 'CPF' : 'CNPJ'"
      :formatter="selectedAccountType === 'pf' ? 'cpf' : 'cnpj'"
      :error-message="errorMessages.identifier"
      required
    />

    <BaseInput
      v-model="data.referenceDate"
      placeholder="Ex.: 15/10/2000"
      type="date"
      :label="selectedAccountType === 'pf' ? 'Data de nascimento' : 'Data de abertura'"
      :error-message="errorMessages.referenceDate"
      required
    />

    <BaseInput
      v-model="data.phone"
      label="Telefone"
      placeholder="Apenas números (com DDD)"
      formatter="phone"
      :error-message="errorMessages.phone"
      required
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import { validateCpf } from '../../utils/validators/cpf';
import { validateCnpj } from '../../utils/validators/cnpj';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const data = ref({
  name: model.value['step-two']?.name || '',
  identifier: model.value['step-two']?.identifier || '',
  referenceDate: model.value['step-two']?.referenceDate || '',
  phone: model.value['step-two']?.phone || '',
})

const errorMessages = ref({
  name: '',
  identifier: '',
  referenceDate: '',
  phone: '',
});

const selectedAccountType = computed(() => {
  return model.value['step-one']?.accountType;
});

const isStepValid = computed(() => {
  return data.value.name.length > 3
    && (selectedAccountType.value === 'pf' ? validateCpf : validateCnpj)(data.value.identifier)
    && validatePhone(data.value.phone);
});

onMounted(() => {
  if (!model.value['step-two']) {
    model.value['step-two'] = {};
  }
});

watchEffect(() => {
  errorMessages.value.name = data.value.name?.length && data.value.name.length < 3
    ? 'Nome inválido'
    : '';

  if (data.value.identifier?.length) {
    errorMessages.value.identifier = (selectedAccountType.value === 'pf' ? validateCpf : validateCnpj)(data.value.identifier)
      ? ''
      : selectedAccountType.value === 'pf' ? 'CPF inválido' : 'CNPJ inválido';
  } else errorMessages.value.identifier = '';

  errorMessages.value.phone = data.value.phone?.length && !validatePhone(data.value.phone)
    ? 'Telefone inválido'
    : '';
});

watchEffect(() => {
  if (!model.value['step-two']) return;

  if (!data.value) return;

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

.step-pf {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
