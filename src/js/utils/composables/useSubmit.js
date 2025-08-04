import { ref } from 'vue';

export function useSubmit(uri) {
  const data = ref(null);
  const loading = ref(false);
  const errorMsg = ref('');

  const apiUrlPath = 'http://localhost:3000';

  const submit = async (payload) => {
    loading.value = true;
    errorMsg.value = '';
    data.value = null;

    try {
      const response = await fetch(`${apiUrlPath}${uri}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Ocorreu um erro ao enviar os dados.');
      }

      data.value = await response.json();
      return data.value;
    } catch (err) {
      errorMsg.value = err.message;
      throw err;
    } finally {
        loading.value = false;
    }
  };

  return { data, loading, error: errorMsg, submit };
}
