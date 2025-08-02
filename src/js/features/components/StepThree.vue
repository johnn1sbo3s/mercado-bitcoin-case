<template>
  <div class="step-three">
    <BaseInput
      v-model="password"
      label="Sua senha"
      type="password"
      placeholder="Mínimo de 8 caracteres"
      :error-message="passwordErrorMsg"
      required
    />

    <BaseInput
      v-model="passwordConfirmation"
      label="Confirme sua senha"
      type="password"
      placeholder="Informe a senha novamente"
      :error-message="passwordConfirmationErrorMsg"
      required
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['can-advance']);

const password = ref(model.value['step-three']?.password || '');
const passwordConfirmation = ref(model.value['step-three']?.passwordConfirmation || '');

const passwordErrorMsg = ref('');
const passwordConfirmationErrorMsg = ref('');

const isStepValid = computed(() => {
  return password.value.length >= 8
    && passwordConfirmation.value === password.value;
});

onMounted(() => {
  if (!model.value['step-three']) {
    model.value['step-three'] = {};
  }
});

watchEffect(() => {
  if (password.value?.length) {
    passwordErrorMsg.value = password.value.length < 8 ? 'A senha deve ter no mínimo 8 caracteres' : '';
  } else passwordErrorMsg.value = '';

  if (passwordConfirmation.value?.length) {
    passwordConfirmationErrorMsg.value = passwordConfirmation.value !== password.value ? 'As senhas não coincidem' : '';
  } else passwordConfirmationErrorMsg.value = '';
});

watchEffect(() => {
  if (!model.value['step-three']) return;

  model.value['step-three'].password = password.value;
  model.value['step-three'].passwordConfirmation = passwordConfirmation.value;
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
