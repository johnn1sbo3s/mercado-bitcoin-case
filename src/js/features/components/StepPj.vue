<template>
  <div class="step-pj">
    <BaseInput
      v-model="name"
      label="Razão social"
      type="text"
      placeholder="Razão social"
      :error-message="errorMessages.name"
      required
    />

    <BaseInput
      v-model="identifier"
      label="CNPJ"
      placeholder="Apenas números"
      formatter="cnpj"
      :error-message="errorMessages.identifier"
      required
    />

    <BaseInput
      v-model="referenceDate"
      label="Data de abertura"
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
import { validateCnpj } from '../../utils/validators/cnpj';
import { validateDate } from '../../utils/validators/date';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const name = ref(model.value['step-pj']?.name || '');
const identifier = ref(model.value['step-pj']?.identifier || '');
const referenceDate = ref(model.value['step-pj']?.referenceDate || '');
const phone = ref(model.value['step-pj']?.phone || '');

const errorMessages = ref({
  name: '',
  identifier: '',
  referenceDate: '',
  phone: '',
});

const isStepValid = computed(() => {
  return name.value.length > 3
    && validateCnpj(identifier.value)
    && validateDate(referenceDate.value)
    && validatePhone(phone.value);
});

onMounted(() => {
  if (!model.value['step-pj']) {
    model.value['step-pj'] = {};
  }
});

watchEffect(() => {
  if (name.value?.length) {
    errorMessages.value.name = name.value.length < 3 ? 'Nome inválido' : '';
  }else errorMessages.value.name = '';

  if (identifier.value?.length) {
    errorMessages.value.identifier = validateCnpj(identifier.value) ? '' : 'CNPJ inválido';
  } else errorMessages.value.identifier = '';

  if (referenceDate.value?.length) {
    errorMessages.value.referenceDate = validateDate(referenceDate.value) ? '' : 'Data inválida';
  } else errorMessages.value.referenceDate = '';

  if (phone.value?.length) {
    errorMessages.value.phone = validatePhone(phone.value) ? '' : 'Telefone inválido';
  } else errorMessages.value.phone = '';
});

watchEffect(() => {
  if (!model.value['step-pj']) return;

  model.value['step-pj'].name = name.value;
  model.value['step-pj'].identifier = identifier.value;
  model.value['step-pj'].referenceDate = referenceDate.value;
  model.value['step-pj'].phone = phone.value;
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

</script>

<style lang="scss" scoped>

.step-pj {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
