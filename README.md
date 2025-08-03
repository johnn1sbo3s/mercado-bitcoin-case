
# Desafio Técnico – Formulário Multi-Step (Vue + Express)

## Como rodar o projeto

1. Clone este repositório na sua máquina:
   ```bash
   git clone <url-do-repo>
   ```
2. Entre no diretório do projeto:
   ```bash
   cd <nome-do-diretório>
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Faça o build do frontend:
   ```bash
   npm run build
   ```
5. Inicie o servidor Express:
   ```bash
   node server.js
   ```
6. Acesse o projeto em [http://localhost:3000/registration](http://localhost:3000/registration).

---

## Estrutura do Projeto

O projeto foi desenvolvido utilizando **Vue** no frontend e **Express** no backend, seguindo uma arquitetura modular (module base architecture). Busquei utilizar ao máximo funções nativas do JavaScript, evitando bibliotecas de terceiros para lógica e manipulação de dados.

Abaixo, uma representação da estrutura de diretórios:

```
src/
  css/
    main.css
  js/
    core/
      components/
        BaseInput.vue
        FormButton.vue
        RadioButton.vue
        ToastAlert.vue
    features/
      registration/
        components/
          StepOne.vue
          StepTwo.vue
          StepThree.vue
          StepFour.vue
        pages/
          RegisterPage.vue
        sanitizers/
          formSanitizer.js
    utils/
      __tests__/
      composables/
      formatters/
      validators/
  App.vue
  main.js
  sass/
```

### Organização e Lógica

- **RegisterPage.vue**: Wrapper do formulário de cadastro, responsável por coordenar os passos, controlar a navegação, validação, requisições e reset do formulário.
- **Steps (StepOne.vue, StepTwo.vue, etc.)**: Cada passo do formulário é um componente independente, responsável por sua própria validação e por informar ao componente pai (RegisterPage) se está válido para avançar.
- **Componentes base**: Criei componentes reutilizáveis como `BaseInput`, `FormButton`, `RadioButton` e `ToastAlert`, centralizando estilos e lógicas comuns de formatação, interação e feedback ao usuário.
- **Sanitizers, formatters, validators**: Funções utilitárias para sanitização, formatação e validação dos dados do formulário, organizadas em pastas específicas para facilitar manutenção e escalabilidade.
- **ToastAlert**: Componente de feedback visual para o usuário, exibindo mensagens de sucesso ou erro após as requisições.

A ideia foi manter o projeto organizado, modular e fácil de escalar, separando responsabilidades e facilitando a manutenção e testes.
