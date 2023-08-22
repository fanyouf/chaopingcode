import { defineStore } from 'pinia'

import { getList } from '@/api/subject'
export default defineStore('subject', () => {
  const subjects = ref([])
  const getSubject = async () => {
    const res = await getList()

    subjects.value = res.data.list
  }

  return {
    subjects,
    getSubject,
  }
})
