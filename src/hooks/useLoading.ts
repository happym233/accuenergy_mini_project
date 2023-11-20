import { ref } from 'vue'

export function useLoading(initialLoading: boolean = false) {
  const loading = ref<boolean>(initialLoading)
  const loadingOn = () => {
    loading.value = true
  }
  const loadingOff = () => {
    loading.value = false
  }
  return { loading, loadingOn, loadingOff }
}
