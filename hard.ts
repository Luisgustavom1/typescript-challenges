// Simple vue
type SimpleVueParams<D, C, M> = {
  data: (this: unknown) => D,
  computed: C & ThisType<D & C>
  methods: M & ThisType<D & M & { [K in keyof C]: C[K] extends () => infer R ? R : never }>
}

declare function SimpleVue<
  D, C, M
>(params: SimpleVueParams<D, C, M>): SimpleVueParams<D, C, M>;
