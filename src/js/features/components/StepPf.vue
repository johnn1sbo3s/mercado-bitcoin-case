<template>
  <div class="step-two">
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
      type="text"
      placeholder="Apenas números"
      formatter="cpf"
      :error-message="cpfErrorMsg"
      required
    />

    <BaseInput
      v-model="birthDate"
      label="Data de nascimento"
      type="text"
      placeholder="Ex.: 15/10/2000"
      formatter="date"
      :error-message="birthDateErrorMsg"
      required
    />

    <BaseInput
      v-model="phone"
      label="Telefone"
      type="text"
      placeholder="Apenas números com DDD"
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
  return !nameErrorMsg.value.length
    && !cpfErrorMsg.value.length
    && !birthDateErrorMsg.value.length
    && !phoneErrorMsg.value.length;
});

onMounted(() => {
  if (!model.value['step-pf']) {
    model.value['step-pf'] = {};
  }
});

watchEffect(() => {
  if (name.value?.length) {
    nameErrorMsg.value = name.value.length < 3 ? 'Nome inválido' : '';
  }
  if (cpf.value?.length) {
    cpfErrorMsg.value = validateCpf(cpf.value) ? '' : 'CPF inválido';
  }
  if (birthDate.value?.length) {
    birthDateErrorMsg.value = validateDate(birthDate.value) ? '' : 'Data inválida';
  }
  if (phone.value?.length) {
    phoneErrorMsg.value = phone.value.length < 11 ? 'Telefone inválido' : '';
  }
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

.step-two {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
