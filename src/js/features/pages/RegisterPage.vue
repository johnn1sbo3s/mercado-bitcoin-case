<template>
  <main class="register-page">
    <div
      v-if="submitLoading"
      class="register-page__overlay"
    />

    <div class="register-page__header">
      <section class="register-page__step-info">
        <p>Etapa</p>

        <p class="register-page__step-info--active">
          {{ currentStep + 1 }}
        </p>

        <p>de {{ steps.length }}</p>
      </section>

      <h2>{{ steps[currentStep].title }}</h2>

      <section class="register-page__step-content">
        <component
          :is="steps[currentStep].component"
          v-model="form"
          @can-advance="handleCanAdvance"
        />
      </section>

      <section class="register-page__buttons">
        <FormButton
          v-if="currentStep !== 0"
          text="Voltar"
          secondary
          @click="handlePreviousClick"
        />

        <FormButton
          :text="advanceButtonText"
          :disabled="!canAdvance"
          :loading="submitLoading"
          @click="handleAdvanceClick"
          @disabled-click="handleDisabledClick"
        />
      </section>

      <div
        v-if="showErrorMessage"
        class="register-page__error"
      >
        Preencha o formulário corretamente para avançar.
      </div>

      <ToastAlert
        v-model="showToastAlert"
        :type="toastAlertType"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import StepOne from '@/js/features/components/StepOne.vue';
import StepTwo from '@/js/features/components/StepTwo.vue';
import StepThree from '@/js/features/components/StepThree.vue';
import StepFour from '@/js/features/components/StepFour.vue';
import FormButton from '@/js/core/components/FormButton.vue';
import ToastAlert from '@/js/core/components/ToastAlert.vue';
import { sanitizeForm } from '@/js/core/sanitizers/formSanitizer';
import { useSubmit } from '@/js/utils/composables/useSubmit';

const {
  loading: submitLoading,
  submit
} = useSubmit('http://localhost:3000/registration');

const form = ref({});
const currentStep = ref(0);
const canAdvance = ref(false);
const showErrorMessage = ref(false);
const showToastAlert = ref(true);
const toastAlertType = ref('error');

const advanceButtonText = computed(() => {
  return currentStep.value === steps.value.length - 1 ? 'Cadastrar' : 'Continuar';
});

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
      component: StepTwo,
    },
    {
      title: 'Senha de acesso',
      component: StepThree,
    },
    {
      title: 'Revise suas informações',
      component: StepFour,
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
  showErrorMessage.value = false;

  if (currentStep.value === steps.value.length - 1) {
    const sanitizedForm = sanitizeForm(form.value);
    submitForm(sanitizedForm);

    return;
  }

  currentStep.value++;
}

function submitForm(form) {
  submit(form)
    .then(() => {
      toastAlertType.value = 'success';
      showToastAlert.value = true;
      form.value = {};
      currentStep.value = 0;
    })
    .catch(() => {
      toastAlertType.value = 'error';
      showToastAlert.value = true;
    })
    .finally(() => {
      setTimeout(() => {
        showToastAlert.value = false;
      }, 3000);
    });
}

function handleCanAdvance(value) {
  canAdvance.value = value;
}

</script>

<style lang="scss" scoped>

.register-page {
  position: relative;
  margin-top: 100px;
  width: 350px;
  background: white;
  padding: var(--spacing-xxl) var(--spacing-xl);
  border-radius: var(--spacing-md);

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1000;
  }

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
    color: var(--color-error);
  }
}

@media (max-width: 768px) {
  .register-page {
    width: 80%;
  }
}

</style>
