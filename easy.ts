// 3057 - Push
type Push<T extends any[], R> = [...T, R]

type Result = Push<[1, 2], '3'> // [1, 2, '3']

// 3060 - Easy unshift
type Unshift<T, R> = T extends any[] ? [R, ...T] : never

type Result2 = Unshift<[1, 2], 0> // [0, 1, 2,]

// 3312 - Easy parameters
const foo = (arg1: string, arg2: number): void => {}

type MyParameters<T> = T extends (...args: infer A) => void ? A : []

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]