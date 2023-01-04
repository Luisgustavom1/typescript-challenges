import type { Equal, Expect } from '@type-challenges/utils'

// 00008 - Medium readonly 2
interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyReadonly2<O, K extends keyof O = keyof O> = Omit<O, K> & {
  readonly [T in K]: O[T]
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

// todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK

// 00020 - Medium Promise all
type PromiseAllType<P> = 
  P extends []
    ? []
    : P extends [Promise<infer T> | infer T, ...infer F]
      ? [T, ...PromiseAllType<F>]
      : never

declare function PromiseAll<P extends any[]>(args: readonly [...P]): Promise<PromiseAllType<P>>
  
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)

// 00599 - Medium merge
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}

type Merge<T, R> = {
  [K in (keyof T | keyof R)]: 
    K extends keyof T 
      ? T[K] 
      : K extends keyof R 
        ? R[K] 
        : never
}

export type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}

// 02946 - Medium Object entries
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

export type ModelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];

// 00612 - Medium kebabcase
type KebabCase<T extends string> = 
  T extends `${infer F}${infer R}`
    ? R extends Uncapitalize<R>
      ? `${Uncapitalize<F>}${KebabCase<R>}`
      : `${Uncapitalize<F>}-${KebabCase<R>}`
    : T

export type KebabCaseResult = KebabCase<'FooBarBaz'> //foo-bar-baz
// 00645 - Medium diff
type Diff<
  Obj1, 
  Obj2, 
  SameKeys extends keyof Obj1 = keyof Obj1 & keyof Obj2
> = Omit<{
  [K in (keyof Obj1 | keyof Obj2)]: 
    K extends keyof Obj1 
      ? Obj1[K] 
      : K extends keyof Obj2 
        ? Obj2[K] 
        : never
}, SameKeys>

// 4425 - Medium greater than - WORKING...
type GreaterThan<T, S> = 
  T extends number
    ? S extends number 
      ? T extends [infer H, ...infer R]
        ? S extends [infer H2, infer R2] 
          ? H > H2
          : false
        : false
      : false
    : false

type result1 = GreaterThan<2, 1> //should be true
type result2 = GreaterThan<1, 1> //should be false
type result3 = GreaterThan<10, 100> //should be false
type result4 = GreaterThan<111, 11> //should be true


