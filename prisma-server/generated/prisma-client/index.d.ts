// Code generated by Prisma (prisma@1.17.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { makePrismaClientClass, BaseClientOptions } from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  todo: (where?: TodoWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export interface Fragmentable {
  $fragment<T>(fragment: string | Object): T;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;
  $getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;

  /**
   * Queries
   */

  todo: (where: TodoWhereUniqueInput) => Todo;
  todoes: (
    args?: {
      where?: TodoWhereInput;
      orderBy?: TodoOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<TodoNode>>;
  todoesConnection: (
    args?: {
      where?: TodoWhereInput;
      orderBy?: TodoOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => TodoConnection;
  user: (where: UserWhereUniqueInput) => User;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<UserNode>>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnection;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createTodo: (data: TodoCreateInput) => Todo;
  updateTodo: (
    args: { data: TodoUpdateInput; where: TodoWhereUniqueInput }
  ) => Todo;
  updateManyTodoes: (
    args: { data: TodoUpdateInput; where?: TodoWhereInput }
  ) => BatchPayload;
  upsertTodo: (
    args: {
      where: TodoWhereUniqueInput;
      create: TodoCreateInput;
      update: TodoUpdateInput;
    }
  ) => Todo;
  deleteTodo: (where: TodoWhereUniqueInput) => Todo;
  deleteManyTodoes: (where?: TodoWhereInput) => BatchPayload;
  createUser: (data: UserCreateInput) => User;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => User;
  updateManyUsers: (
    args: { data: UserUpdateInput; where?: UserWhereInput }
  ) => BatchPayload;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => User;
  deleteUser: (where: UserWhereUniqueInput) => User;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayload;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  todo: (
    where?: TodoSubscriptionWhereInput
  ) => TodoSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type TodoOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "description_ASC"
  | "description_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "auth0ID_ASC"
  | "auth0ID_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserCreateWithoutTodosInput {
  auth0ID: String;
}

export type TodoWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface UserUpdateOneWithoutTodosInput {
  create?: UserCreateWithoutTodosInput;
  update?: UserUpdateWithoutTodosDataInput;
  upsert?: UserUpsertWithoutTodosInput;
  delete?: Boolean;
  disconnect?: Boolean;
  connect?: UserWhereUniqueInput;
}

export interface TodoWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  title?: String;
  title_not?: String;
  title_in?: String[] | String;
  title_not_in?: String[] | String;
  title_lt?: String;
  title_lte?: String;
  title_gt?: String;
  title_gte?: String;
  title_contains?: String;
  title_not_contains?: String;
  title_starts_with?: String;
  title_not_starts_with?: String;
  title_ends_with?: String;
  title_not_ends_with?: String;
  description?: String;
  description_not?: String;
  description_in?: String[] | String;
  description_not_in?: String[] | String;
  description_lt?: String;
  description_lte?: String;
  description_gt?: String;
  description_gte?: String;
  description_contains?: String;
  description_not_contains?: String;
  description_starts_with?: String;
  description_not_starts_with?: String;
  description_ends_with?: String;
  description_not_ends_with?: String;
  author?: UserWhereInput;
  AND?: TodoWhereInput[] | TodoWhereInput;
  OR?: TodoWhereInput[] | TodoWhereInput;
  NOT?: TodoWhereInput[] | TodoWhereInput;
}

export interface TodoCreateWithoutAuthorInput {
  title: String;
  description: String;
}

export interface UserUpsertWithoutTodosInput {
  update: UserUpdateWithoutTodosDataInput;
  create: UserCreateWithoutTodosInput;
}

export interface TodoCreateManyWithoutAuthorInput {
  create?: TodoCreateWithoutAuthorInput[] | TodoCreateWithoutAuthorInput;
  connect?: TodoWhereUniqueInput[] | TodoWhereUniqueInput;
}

export interface UserUpdateWithoutTodosDataInput {
  auth0ID?: String;
}

export interface TodoSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: TodoWhereInput;
  AND?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput;
  OR?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput;
  NOT?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput;
}

export interface TodoUpdateWithoutAuthorDataInput {
  title?: String;
  description?: String;
}

export interface TodoCreateInput {
  title: String;
  description: String;
  author?: UserCreateOneWithoutTodosInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  auth0ID?: String;
}>;

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  auth0ID?: String;
  auth0ID_not?: String;
  auth0ID_in?: String[] | String;
  auth0ID_not_in?: String[] | String;
  auth0ID_lt?: String;
  auth0ID_lte?: String;
  auth0ID_gt?: String;
  auth0ID_gte?: String;
  auth0ID_contains?: String;
  auth0ID_not_contains?: String;
  auth0ID_starts_with?: String;
  auth0ID_not_starts_with?: String;
  auth0ID_ends_with?: String;
  auth0ID_not_ends_with?: String;
  todos_every?: TodoWhereInput;
  todos_some?: TodoWhereInput;
  todos_none?: TodoWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface TodoUpdateInput {
  title?: String;
  description?: String;
  author?: UserUpdateOneWithoutTodosInput;
}

export interface UserCreateInput {
  auth0ID: String;
  todos?: TodoCreateManyWithoutAuthorInput;
}

export interface UserCreateOneWithoutTodosInput {
  create?: UserCreateWithoutTodosInput;
  connect?: UserWhereUniqueInput;
}

export interface TodoUpdateManyWithoutAuthorInput {
  create?: TodoCreateWithoutAuthorInput[] | TodoCreateWithoutAuthorInput;
  delete?: TodoWhereUniqueInput[] | TodoWhereUniqueInput;
  connect?: TodoWhereUniqueInput[] | TodoWhereUniqueInput;
  disconnect?: TodoWhereUniqueInput[] | TodoWhereUniqueInput;
  update?:
    | TodoUpdateWithWhereUniqueWithoutAuthorInput[]
    | TodoUpdateWithWhereUniqueWithoutAuthorInput;
  upsert?:
    | TodoUpsertWithWhereUniqueWithoutAuthorInput[]
    | TodoUpsertWithWhereUniqueWithoutAuthorInput;
}

export interface TodoUpdateWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutAuthorDataInput;
}

export interface TodoUpsertWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutAuthorDataInput;
  create: TodoCreateWithoutAuthorInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface UserUpdateInput {
  auth0ID?: String;
  todos?: TodoUpdateManyWithoutAuthorInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValuesNode {
  id: ID_Output;
  auth0ID: String;
}

export interface UserPreviousValues
  extends Promise<UserPreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  auth0ID: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  auth0ID: () => Promise<AsyncIterator<String>>;
}

export interface TodoEdgeNode {
  cursor: String;
}

export interface TodoEdge extends Promise<TodoEdgeNode>, Fragmentable {
  node: <T = Todo>() => T;
  cursor: () => Promise<String>;
}

export interface TodoEdgeSubscription
  extends Promise<AsyncIterator<TodoEdgeNode>>,
    Fragmentable {
  node: <T = TodoSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserNode {
  id: ID_Output;
  auth0ID: String;
}

export interface User extends Promise<UserNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  auth0ID: () => Promise<String>;
  todos: <T = Promise<Array<TodoNode>>>(
    args?: {
      where?: TodoWhereInput;
      orderBy?: TodoOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<UserNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  auth0ID: () => Promise<AsyncIterator<String>>;
  todos: <T = Promise<AsyncIterator<Array<TodoSubscription>>>>(
    args?: {
      where?: TodoWhereInput;
      orderBy?: TodoOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface BatchPayloadNode {
  count: Long;
}

export interface BatchPayload extends Promise<BatchPayloadNode>, Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayloadNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface TodoPreviousValuesNode {
  id: ID_Output;
  title: String;
  description: String;
}

export interface TodoPreviousValues
  extends Promise<TodoPreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  description: () => Promise<String>;
}

export interface TodoPreviousValuesSubscription
  extends Promise<AsyncIterator<TodoPreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
}

export interface TodoSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface TodoSubscriptionPayload
  extends Promise<TodoSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = Todo>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TodoPreviousValues>() => T;
}

export interface TodoSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TodoSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TodoSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TodoPreviousValuesSubscription>() => T;
}

export interface TodoNode {
  id: ID_Output;
  title: String;
  description: String;
}

export interface Todo extends Promise<TodoNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  author: <T = User>() => T;
}

export interface TodoSubscription
  extends Promise<AsyncIterator<TodoNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  author: <T = UserSubscription>() => T;
}

export interface PageInfoNode {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfo extends Promise<PageInfoNode>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfoNode>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface TodoConnectionNode {}

export interface TodoConnection
  extends Promise<TodoConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<TodoEdgeNode>>>() => T;
  aggregate: <T = AggregateTodo>() => T;
}

export interface TodoConnectionSubscription
  extends Promise<AsyncIterator<TodoConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<TodoEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateTodoSubscription>() => T;
}

export interface AggregateUserNode {
  count: Int;
}

export interface AggregateUser
  extends Promise<AggregateUserNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUserNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AggregateTodoNode {
  count: Int;
}

export interface AggregateTodo
  extends Promise<AggregateTodoNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTodoSubscription
  extends Promise<AsyncIterator<AggregateTodoNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface UserSubscriptionPayload
  extends Promise<UserSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = User>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValues>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserConnectionNode {}

export interface UserConnection
  extends Promise<UserConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<UserEdgeNode>>>() => T;
  aggregate: <T = AggregateUser>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<UserEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdgeNode {
  cursor: String;
}

export interface UserEdge extends Promise<UserEdgeNode>, Fragmentable {
  node: <T = User>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdgeNode>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/**
 * Type Defs
 */

export const prisma: Prisma;
