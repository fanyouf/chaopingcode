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
// 知识点
interface Knowledge extends DateTime {
  title: string
  intro: strinUseToNumberOptions
  logo: string
  remark: string
  order: number
  state: boolean
  subject_id: number
  knowledge_group_id: string
  id: number
}
// 知识点组-目录

interface KnowledgeGroup {
  title: string
  intro: string
  logo: string
  remark: string
  order: number
  state: boolean
  suject_id: number
}

interface Directive {
  title: string
  intro: string
  logo: string
  order: number
  state: boolean
  remark: string
  directive_group_id: number
}

// 指令-分组
interface DirectiveGroup {
  title: string
  intro: string
  type: 'image' | 'text'
  image: string
  remark: string
  order: number
  state: boolean
  suject_id: number
}

// 赛事
interface Competition {
  title: string
  summary: string
  logo: string
  site: string
  intro: string
  order: number
  state: boolean
  remark: string
}

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
