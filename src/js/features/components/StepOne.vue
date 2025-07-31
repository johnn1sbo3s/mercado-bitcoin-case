<template>
  <div class="step-one">
    <BaseInput
      v-model="email"
      label="Endereço de e-mail"
      type="email"
      placeholder="nome@exemplo.com"
      required
    />

    <RadioButton
      v-model="accountType"
      :options="accountOptions"
      @change="handleOptionChange"
    >
      Opção 1
    </RadioButton>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import BaseInput from '../../core/components/BaseInput.vue';
import RadioButton from '../../core/components/RadioButton.vue';

const model = defineModel({
  type: Object,
  required: true,
})

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

const email = ref('');
const accountType = ref('');

watchEffect(() => {
  if (model.value['step-one']) {
    model.value['step-one'].email = email.value;
  }
});

watchEffect(() => {
  if (model.value['step-one']) {
    model.value['step-one'].accountType = accountType.value;
  }
});

onMounted(() => {
  model.value['step-one'] = {};
});

function handleOptionChange(selectedOption) {
  model.value['step-one'].accountType = selectedOption;
}

</script>

<style lang="scss" scoped>

.step-one {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>
