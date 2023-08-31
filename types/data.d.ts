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
  cover: string
  remark: string
  order: number
  type: string
  id: number
  productGroups: ProductGroup[] | null
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
  id: number
  title: string
  summary: string
  logo: string
  site: string
  intro: string
  order: number
  state: boolean
  remark: string
}

// 赛事 属性
interface Label {
  id: number
  title: string
  order: number
  state: boolean
  remark: string
  entityType: string
  entityID: number
}

// 赛事 属性值
interface LabelValue {
  val: string
  labelID: number
  order: number
  id: number
  state: boolean
}

// 作品
interface WorkCate {
  id: number
  title: string
  intro: string
  cover: string
  remark: string
  order: number
  state: boolean
  subjectID: number
}

interface Work {
  id: number
  title: string
  no: string
  intro: string
  highlight: string
  cover: string
  codeBasic: string
  codeReference: string
  codeLineNum: number
  demoAddress: string
  level: string
  note: string
  remark: string
  order: number
  state: boolean
  productGroupIDs: number[]
  directiveIDs: number[]
  knowledgeIDs: number[]
  subjectIDs: number[]
  withProductGroup: boolean
  withDirective: boolean
  withKnowledge: boolean
  withSubject: boolean
}

// 练习题
interface Exercise {
  title: string
  no: string
  intro: string
  level: string
  type: string
  competitionID: number
  body: string
  cover: string
  explainText: string
  explainVideo: string
  remark: string
  order: number
  state: boolean
  directiveIDs: number[]
  knowledgeIDs: number[]
  labelValueIDs: number[]
  withCompetition: boolean
  withDirective: boolean
  withKnowledge: boolean
  withLabelValue: boolean
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
  | '属性'
  | '属性值'

type OPType = '添加' | '删除' | '修改'
