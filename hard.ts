// Simple vue
type SimpleVueParams<D, C, M> = {
  data: (this: unknown) => D,
  computed: C & ThisType<D & C>
  methods: M & ThisType<D & M & { [K in keyof C]: C[K] extends () => infer R ? R : never }>
}

declare function SimpleVue<
  D, C, M
>(params: SimpleVueParams<D, C, M>): SimpleVueParams<D, C, M>;

// 847 - String Join
type Join<
  Delimiter extends string, 
  T extends string[]
> = T extends [infer Head, ...infer Tail]
      ? Tail extends [] // Base Case
        ? Head
        : Tail extends string[]
          ? `${T[0]}${Delimiter}${Join<Delimiter, Tail>}`
          : ""
      : ""
      
declare function join<
  Delimiter extends string
>(delimiter: Delimiter): <T extends string[]>(...parts: T) => Join<Delimiter, T>