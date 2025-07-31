<template>
  <div class="register-form">
    <div class="register-form__header">
      <div class="register-form__step-info">
        <p>Etapa</p>

        <p class="register-form__step-info--active">
          1
        </p>

        <p>de 4</p>
      </div>

      <h2>Seja bem vindo(a)</h2>

      <div class="register-form__step-content">
        <component
          :is="steps[currentStep].component"
          v-model="form"
        />
      </div>

      <FormButton />
    </div>
  </div>
  <pre>{{ form }}</pre>
</template>

<script setup>
import { ref } from 'vue';
import StepOne from './features/components/StepOne.vue';
import FormButton from './core/components/FormButton.vue';

const form = ref({});
const currentStep = ref(0);

const steps = [
  {
    title: 'Seja bem vindo(a)',
    component: StepOne,
  }
];

</script>

<style lang="scss" scoped>

.register-form {
  width: 350px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-height: 300px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__step-info {
    display: flex;
    align-items: flex-end;
    gap: 4px;

    &--active {
      color: #ff9900;
    }
  }

  &__step-content {
    margin: 16px 0;
    width: 100%;
    height: 100%;
  }
}

</style>
