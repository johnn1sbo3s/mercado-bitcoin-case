<template>
  <div class="step-pf">
    <BaseInput
      v-model="name"
      label="Nome"
      type="text"
      placeholder="Seu nome completo"
      :error-message="nameErrorMsg"
      required
    />

    <BaseInput
      v-model="cpf"
      label="CPF"
      placeholder="Apenas números"
      formatter="cpf"
      :error-message="cpfErrorMsg"
      required
    />

    <BaseInput
      v-model="birthDate"
      label="Data de nascimento"
      placeholder="Ex.: 15/10/2000"
      formatter="date"
      :error-message="birthDateErrorMsg"
      required
    />

    <BaseInput
      v-model="phone"
      label="Telefone"
      placeholder="Apenas números (com DDD)"
      formatter="phone"
      :error-message="phoneErrorMsg"
      required
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import { validateCpf } from '../../utils/validators/cpf';
import { validateDate } from '../../utils/validators/date';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const name = ref(model.value['step-pf']?.name || '');
const cpf = ref(model.value['step-pf']?.cpf || '');
const birthDate = ref(model.value['step-pf']?.birthDate || '');
const phone = ref(model.value['step-pf']?.phone || '');

const nameErrorMsg = ref('');
const cpfErrorMsg = ref('');
const birthDateErrorMsg = ref('');
const phoneErrorMsg = ref('');

const isStepValid = computed(() => {
  return name.value.length > 3
    && validateCpf(cpf.value)
    && validateDate(birthDate.value)
    && validatePhone(phone.value);
});

onMounted(() => {
  if (!model.value['step-pf']) {
    model.value['step-pf'] = {};
  }
});

watchEffect(() => {
  if (name.value?.length) {
    nameErrorMsg.value = name.value.length < 3 ? 'Nome inválido' : '';
  } else nameErrorMsg.value = '';

  if (cpf.value?.length) {
    cpfErrorMsg.value = validateCpf(cpf.value) ? '' : 'CPF inválido';
  } else cpfErrorMsg.value = '';

  if (birthDate.value?.length) {
    birthDateErrorMsg.value = validateDate(birthDate.value) ? '' : 'Data inválida';
  } else birthDateErrorMsg.value = '';

  if (phone.value?.length) {
    phoneErrorMsg.value = validatePhone(phone.value) ? '' : 'Telefone inválido';
  } else phoneErrorMsg.value = '';
});

watchEffect(() => {
  if (!model.value['step-pf']) return;

  model.value['step-pf'].name = name.value;
  model.value['step-pf'].cpf = cpf.value;
  model.value['step-pf'].birthDate = birthDate.value;
  model.value['step-pf'].phone = phone.value;
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
