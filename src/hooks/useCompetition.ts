import { getList } from '@/api/competition'

export default () => {
  const list = ref<Competition[]>([])
  const isLoading = ref(false)
  onMounted(async () => {
    isLoading.value = true
    const { data } = await getList({})
    list.value = data.list
    isLoading.value = false
  })

  return { list, isLoading }
}
