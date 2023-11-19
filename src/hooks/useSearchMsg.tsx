import { ref } from 'vue'

export function useSearchMsg(initialSearchMsg: string = '') {
  const searchMsg = ref<string>(initialSearchMsg)
  const handleMsgChange = (msg: string) => {
    searchMsg.value = msg
  }

  return { searchMsg, handleMsgChange }
}
