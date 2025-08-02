<template>
  <div class="register-form">
    <div class="register-form__header">
      <div class="register-form__step-info">
        <p>Etapa</p>

        <p class="register-form__step-info--active">
          {{ currentStep + 1 }}
        </p>

        <p>de {{ steps.length }}</p>
      </div>

      <h2>{{ steps[currentStep].title }}</h2>

      <div class="register-form__step-content">
        <component
          :is="steps[currentStep].component"
          v-model="form"
          @can-advance="handleCanAdvance"
        />
      </div>

      <div class="register-form__buttons">
        <FormButton
          v-if="currentStep !== 0"
          text="Voltar"
          secondary
          @click="handlePreviousClick"
        />

        <FormButton
          text="Avançar"
          :disabled="!canAdvance"
          @click="handleAdvanceClick"
          @disabled-click="handleDisabledClick"
        />
      </div>
      {{ canAdvance }}
      <span
        v-if="showErrorMessage"
        class="register-form__error"
      >
        Preencha o formulário corretamente para avançar
      </span>
    </div>
  </div>
  <pre>{{ form }}</pre>
</template>

<script setup>
import { ref, computed } from 'vue';
import StepOne from './features/components/StepOne.vue';
import StepPf from './features/components/StepPf.vue';
import StepPj from './features/components/StepPj.vue';
import FormButton from './core/components/FormButton.vue';

const form = ref({});
const currentStep = ref(0);
const canAdvance = ref(false);
const showErrorMessage = ref(false);

const selectedAccountType = computed(() => {
  if (!form.value['step-one']) return '';

  return form.value['step-one'].accountType;
});

const steps = computed(() => {
  return [
    {
      title: 'Seja bem vindo(a)',
      component: StepOne,
    },
    {
      title: selectedAccountType.value === 'pf'
        ? 'Pessoa Física'
        : 'Pessoa Jurídica',
      component: selectedAccountType.value === 'pf'
        ? StepPf
        : StepPj,
    }
  ];
});

function handleDisabledClick() {
  showErrorMessage.value = true;

  setTimeout(() => {
    showErrorMessage.value = false;
  }, 3000);
}

function handlePreviousClick() {
  currentStep.value--;
}

function handleAdvanceClick() {
  currentStep.value++;
  canAdvance.value = false;
}

function handleCanAdvance(value) {
  canAdvance.value = value;
}

</script>

<style lang="scss" scoped>

.register-form {
  margin-top: 20%;
  width: 350px;
  background: white;
  padding: var(--spacing-xxl) var(--spacing-xl);
  border-radius: var(--spacing-md);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__step-info {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-xs);

    &--active {
      color: var(--color-primary);
    }
  }

  &__step-content {
    margin: var(--spacing-lg) 0;
    width: 100%;
    height: 100%;
  }

  &__buttons {
    width: 100%;
    display: flex;
    gap: var(--spacing-md);
  }

  &__error {
    padding: var(--spacing-sm);
    margin-top: var(--spacing-sm);
    background-color: #ffeeee;
    border: 1px solid #ffbbbb;
    border-radius: var(--border-radius-md);
    font-size: 12px;
    color: #d82b2b;
  }
}

</style>
