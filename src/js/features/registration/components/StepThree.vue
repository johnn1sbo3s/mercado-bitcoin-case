<template>
  <div class="step-three">
    <BaseInput
      v-model="data.password"
      label="Sua senha"
      type="password"
      placeholder="Mínimo de 8 caracteres"
      :error-message="errorMessages.password"
      required
    />

    <BaseInput
      v-model="data.passwordConfirmation"
      label="Confirme sua senha"
      type="password"
      placeholder="Informe a senha novamente"
      :error-message="errorMessages.passwordConfirmation"
      required
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import BaseInput from '@/js/core/components/BaseInput.vue';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const data = ref({
  password: model.value['step-three']?.password || '',
  passwordConfirmation: model.value['step-three']?.passwordConfirmation || '',
});

const errorMessages = ref({
  password: '',
  passwordConfirmation: '',
});

const isStepValid = computed(() => {
  return data.value.password.length > 7
    && data.value.password === data.value.passwordConfirmation;
});

onMounted(() => {
  if (!model.value['step-three']) {
    model.value['step-three'] = {};
  }
});

watchEffect(() => {
  errorMessages.value.password = data.value.password?.length && data.value.password.length < 8
    ? 'A senha deve ter no mínimo 8 caracteres'
    : '';

  errorMessages.value.passwordConfirmation = data.value.passwordConfirmation?.length && data.value.passwordConfirmation !== data.value.password
    ? 'As senhas não coincidem'
    : '';
});

watchEffect(() => {
  if (!model.value['step-three']) return;

  model.value['step-three'].password = data.value.password;
  model.value['step-three'].passwordConfirmation = data.value.passwordConfirmation;
});

watchEffect(() => {
  emit('can-advance', isStepValid.value);
});

</script>

<style lang="scss" scoped>

.step-three {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
