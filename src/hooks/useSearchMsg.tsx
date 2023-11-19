import { ref } from 'vue'

export function useSearchMsg(initialSearchMsg: string = '') {
  const searchMsg = ref<string>(initialSearchMsg)
  const setMsg = (msg: string) => {
    searchMsg.value = msg
  }

  return { searchMsg, setMsg }
}
