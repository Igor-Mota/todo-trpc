export interface ITodoList {
  name: string;
  todos: ITodo[];
}

export interface ITodo {
  title: string;
  status: string;
}

export type ITodoListActions = { type: "ADD"; todoList: ITodoList } | { type: "REMOVE"; index: number } | { type: "UPDATE"; index: number; todoList: ITodoList };
