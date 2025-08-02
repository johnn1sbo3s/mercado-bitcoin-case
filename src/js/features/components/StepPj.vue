<template>
  <div class="step-pj">
    <BaseInput
      v-model="socialName"
      label="Razão social"
      type="text"
      placeholder="Razão social"
      :error-message="nameErrorMsg"
      required
    />

    <BaseInput
      v-model="cnpj"
      label="CNPJ"
      placeholder="Apenas números"
      formatter="cnpj"
      :error-message="cnpjErrorMsg"
      required
    />

    <BaseInput
      v-model="openingDate"
      label="Data de abertura"
      placeholder="Ex.: 15/10/2000"
      formatter="date"
      :error-message="openingDateErrorMsg"
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
import { validateCnpj } from '../../utils/validators/cnpj';
import { validateDate } from '../../utils/validators/date';
import { validatePhone } from '../../utils/validators/phone';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const socialName = ref(model.value['step-pj']?.socialName || '');
const cnpj = ref(model.value['step-pj']?.cnpj || '');
const openingDate = ref(model.value['step-pj']?.openingDate || '');
const phone = ref(model.value['step-pj']?.phone || '');

const socialNameErrorMsg = ref('');
const cnpjErrorMsg = ref('');
const openingDateErrorMsg = ref('');
const phoneErrorMsg = ref('');

const isStepValid = computed(() => {
  return socialName.value.length > 3
    && validateCnpj(cnpj.value)
    && validateDate(openingDate.value)
    && validatePhone(phone.value);
});

onMounted(() => {
  if (!model.value['step-pj']) {
    model.value['step-pj'] = {};
  }
});

watchEffect(() => {
  if (socialName.value?.length) {
    socialNameErrorMsg.value = socialName.value.length < 3 ? 'Nome inválido' : '';
  }else socialNameErrorMsg.value = '';

  if (cnpj.value?.length) {
    cnpjErrorMsg.value = validateCnpj(cnpj.value) ? '' : 'CNPJ inválido';
  } else cnpjErrorMsg.value = '';

  if (openingDate.value?.length) {
    openingDateErrorMsg.value = validateDate(openingDate.value) ? '' : 'Data inválida';
  } else openingDateErrorMsg.value = '';

  if (phone.value?.length) {
    phoneErrorMsg.value = validatePhone(phone.value) ? '' : 'Telefone inválido';
  } else phoneErrorMsg.value = '';
});

watchEffect(() => {
  if (!model.value['step-pj']) return;

  model.value['step-pj'].socialName = socialName.value;
  model.value['step-pj'].cnpj = cnpj.value;
  model.value['step-pj'].openingDate = openingDate.value;
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
