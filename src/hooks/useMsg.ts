import { ref } from 'vue'

export function useMsg(initialMsg: string = '') {
  const msg = ref<string>(initialMsg)
  const setMsg = (newMsg: string) => {
    msg.value = newMsg
  }

  return { msg, setMsg }
}
