import { getList } from '@/api/course'

// const fetchData = async () => {
//   state.listLoading = true
//   state.list = data.list
//   state.listLoading = false
// }

export default (params = {}) => {
  const list = ref<Subject[]>([])
  const isLoading = ref(false)
  onMounted(async () => {
    isLoading.value = true
    const { data } = await getList(params)
    list.value = data.list
    isLoading.value = false
  })

  return { list, isLoading }
}
