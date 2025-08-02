<template>
  <div class="step-pf">
    <BaseInput
      v-model="name"
      label="Nome"
      type="text"
      placeholder="Seu nome completo"
      :error-message="errorMessages.name"
      required
    />

    <BaseInput
      v-model="identifier"
      label="CPF"
      placeholder="Apenas números"
      formatter="cpf"
      :error-message="errorMessages.identifier"
      required
    />

    <BaseInput
      v-model="referenceDate"
      label="Data de nascimento"
      placeholder="Ex.: 15/10/2000"
      formatter="date"
      :error-message="errorMessages.referenceDate"
      required
    />

    <BaseInput
      v-model="phone"
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
import { validateDate } from '../../utils/validators/date';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const name = ref(model.value['step-pf']?.name || '');
const identifier = ref(model.value['step-pf']?.identifier || '');
const referenceDate = ref(model.value['step-pf']?.referenceDate || '');
const phone = ref(model.value['step-pf']?.phone || '');

const errorMessages = ref({
  name: '',
  identifier: '',
  referenceDate: '',
  phone: '',
});

const isStepValid = computed(() => {
  return name.value.length > 3
    && validateCpf(identifier.value)
    && validateDate(referenceDate.value)
    && validatePhone(phone.value);
});

onMounted(() => {
  if (!model.value['step-pf']) {
    model.value['step-pf'] = {};
  }
});

watchEffect(() => {
  if (name.value?.length) {
    errorMessages.value.name = name.value.length < 3 ? 'Nome inválido' : '';
  } else errorMessages.value.name = '';

  if (identifier.value?.length) {
    errorMessages.value.identifier = validateCpf(identifier.value) ? '' : 'CPF inválido';
  } else errorMessages.value.identifier = '';

  if (referenceDate.value?.length) {
    errorMessages.value.referenceDate = validateDate(referenceDate.value) ? '' : 'Data inválida';
  } else errorMessages.value.referenceDate = '';

  if (phone.value?.length) {
    errorMessages.value.phone = validatePhone(phone.value) ? '' : 'Telefone inválido';
  } else errorMessages.value.phone = '';
});

watchEffect(() => {
  if (!model.value['step-pf']) return;

  model.value['step-pf'].name = name.value;
  model.value['step-pf'].identifier = identifier.value;
  model.value['step-pf'].referenceDate = referenceDate.value;
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
