<template>
  <div class="step-one">
    <BaseInput
      v-model="data.email"
      label="Endereço de e-mail"
      type="email"
      placeholder="nome@exemplo.com"
      formatter="email"
      :error-message="emailErrorMsg"
      required
    />

    <RadioButton
      v-model="data.accountType"
      :options="accountOptions"
    />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, computed, onMounted } from 'vue';
import BaseInput from '@/js/core/components/BaseInput.vue';
import RadioButton from '@/js/core/components/RadioButton.vue';
import { validateEmail } from '@/js/utils/validators/email';

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

const data = ref({
  email: model.value['step-one']?.email || '',
  accountType: model.value['step-one']?.accountType || '',
})

const emailErrorMsg = ref('');

const isStepValid = computed(() => {
  return validateEmail(data.value.email)
    && accountOptions.map(({ id }) => id).includes(data.value.accountType);
});

onMounted(() => {
  if (!model.value['step-one']) {
    model.value['step-one'] = {};
  }
});

watch(() => data.value.accountType, (newValue, oldValue) => {
  if (newValue === oldValue) return;

  model.value['step-two'] = {};
  model.value['step-three'] = {};
});

watchEffect(() => {
  emailErrorMsg.value = data.value.email?.length && !validateEmail(data.value.email)
    ? 'Endereço de e-mail inválido'
    : '';
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

watchEffect(() => {
  if (!model.value['step-one']) return;

  model.value['step-one'].email = data.value.email.trim();
  model.value['step-one'].accountType = data.value.accountType;
});
</script>

<style lang="scss" scoped>

.step-one {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
