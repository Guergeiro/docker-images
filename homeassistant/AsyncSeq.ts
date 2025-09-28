export class AsyncSeq<I> implements AsyncIterable<I> {
  #iter: AsyncIterable<I>;

  private constructor(
    iter: AsyncIterable<I>,
  ) {
    this.#iter = iter;
  }

  public static from<T>(src: AsyncIterable<T>): AsyncSeq<T> {
    return new AsyncSeq(src);
  }

  [Symbol.asyncIterator](): AsyncIterator<I> {
    return this.#iter[Symbol.asyncIterator]();
  }

  public map<O>(mapFn: (value: I) => O): AsyncSeq<O> {
    return this.wrap(async function* (src) {
      for await (const v of src) {
        yield mapFn(v);
      }
    });
  }

  public filter(
    filterFn: (value: I) => boolean,
  ): AsyncSeq<I> {
    return this.wrap(async function* (src) {
      for await (const v of src) {
        if (filterFn(v)) yield v;
      }
    });
  }

  public flatten<O>(fn: (value: I) => Iterable<O>): AsyncSeq<O> {
    return this.wrap(async function* (src) {
      for await (const v of src) {
        const inner = fn(v);
        for (const value of inner) {
          yield value;
        }
      }
    });
  }

  public async consume(): Promise<I[]> {
    return await Array.fromAsync(this.#iter);
  }

  public async take(amount: number): Promise<I[]> {
    let count = 0;
    const output: I[] = [];
    for await (const v of this.#iter) {
      output.push(v);
      count += 1;
      if (count >= amount) {
        break;
      }
    }
    return output;
  }

  private wrap<O>(
    gen: (src: AsyncIterable<I>) => AsyncIterable<O>,
  ): AsyncSeq<O> {
    return new AsyncSeq(gen(this.#iter));
  }
}
