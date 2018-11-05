module.exports = {
        typeDefs: /* GraphQL */ `type AggregateTodo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  updateManyTodoes(data: TodoUpdateInput!, where: TodoWhereInput): BatchPayload!
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  deleteManyTodoes(where: TodoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  todo(where: TodoWhereUniqueInput!): Todo
  todoes(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todoesConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Todo {
  id: ID!
  title: String!
  description: String!
  author: User
}

type TodoConnection {
  pageInfo: PageInfo!
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  title: String!
  description: String!
  author: UserCreateOneWithoutTodosInput
}

input TodoCreateManyWithoutAuthorInput {
  create: [TodoCreateWithoutAuthorInput!]
  connect: [TodoWhereUniqueInput!]
}

input TodoCreateWithoutAuthorInput {
  title: String!
  description: String!
}

type TodoEdge {
  node: Todo!
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TodoPreviousValues {
  id: ID!
  title: String!
  description: String!
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
  AND: [TodoSubscriptionWhereInput!]
  OR: [TodoSubscriptionWhereInput!]
  NOT: [TodoSubscriptionWhereInput!]
}

input TodoUpdateInput {
  title: String
  description: String
  author: UserUpdateOneWithoutTodosInput
}

input TodoUpdateManyWithoutAuthorInput {
  create: [TodoCreateWithoutAuthorInput!]
  delete: [TodoWhereUniqueInput!]
  connect: [TodoWhereUniqueInput!]
  disconnect: [TodoWhereUniqueInput!]
  update: [TodoUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [TodoUpsertWithWhereUniqueWithoutAuthorInput!]
}

input TodoUpdateWithoutAuthorDataInput {
  title: String
  description: String
}

input TodoUpdateWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput!
  data: TodoUpdateWithoutAuthorDataInput!
}

input TodoUpsertWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput!
  update: TodoUpdateWithoutAuthorDataInput!
  create: TodoCreateWithoutAuthorInput!
}

input TodoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  author: UserWhereInput
  AND: [TodoWhereInput!]
  OR: [TodoWhereInput!]
  NOT: [TodoWhereInput!]
}

input TodoWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  auth0ID: String!
  todos(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  auth0ID: String!
  todos: TodoCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTodosInput {
  auth0ID: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  auth0ID_ASC
  auth0ID_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  auth0ID: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  auth0ID: String
  todos: TodoUpdateManyWithoutAuthorInput
}

input UserUpdateOneWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  update: UserUpdateWithoutTodosDataInput
  upsert: UserUpsertWithoutTodosInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTodosDataInput {
  auth0ID: String
}

input UserUpsertWithoutTodosInput {
  update: UserUpdateWithoutTodosDataInput!
  create: UserCreateWithoutTodosInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  auth0ID: String
  auth0ID_not: String
  auth0ID_in: [String!]
  auth0ID_not_in: [String!]
  auth0ID_lt: String
  auth0ID_lte: String
  auth0ID_gt: String
  auth0ID_gte: String
  auth0ID_contains: String
  auth0ID_not_contains: String
  auth0ID_starts_with: String
  auth0ID_not_starts_with: String
  auth0ID_ends_with: String
  auth0ID_not_ends_with: String
  todos_every: TodoWhereInput
  todos_some: TodoWhereInput
  todos_none: TodoWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  auth0ID: String
}
`
      }
    