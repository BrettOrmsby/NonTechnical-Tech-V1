import { ref } from "vue";
export function useFetch(link, returnType) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(false);

  fetch(link)
    .then((response) =>
      returnType === "text" ? response.text() : response.json()
    )
    .catch((error) => {
      console.log(`An error has occurred fetching ${link}: ${error}`);
      loading.value = false;
      error.value = true;
    })
    .then((result) => {
      data.value = result;
      loading.value = false;
    });

  return { data, loading, error };
}
