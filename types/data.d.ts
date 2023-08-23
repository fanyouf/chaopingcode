interface Res<T> {
  data: T
  code: number
  message: string
}
interface DateTime {
  create_at: number
  update_at: number
  deleted_at: number
}

// 课程
interface Subject extends DateTime {
  title: string
  intro: string
  logo: string
  remark: string
  order: number
  type: string
  id: number
}

// 知识点组-目录
interface KnowGroup extends DateTime {
  title: string
  intro: string
  order: number
  logo: string
  type: string
  subject_id: number
  id: number
}

// 知识点组-目录
interface Knowledge extends DateTime {
  title: string
  knowledge_group_id: string
  remark: string
  order: number
  id: number
}

interface KnowledgeGroup {
  title: string
  intro: string
  logo: string
  remark: string
  order: number
  state: boolean
  suject_id: number
}

// declare enum OPObject {
//   '知识点' = '知识点',
//   '目录' = '目录',
//   '科目' = '科目',
// }

// declare enum OPType {
//   '添加' = '添加',
//   '删除' = '删除',
//   '修改' = '修改',
// }

type OPObject =
  | '知识点'
  | '目录'
  | '科目'
  | '赛事'
  | '指令'
  | '指令分类'
  | '作品'
  | '作品分类'
type OPType = '添加' | '删除' | '修改'
