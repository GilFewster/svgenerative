type IncrementorProps = {
  startValue: number;
  incrementor: IncrementingFunction;
};

type RisingIncrementorProps = IncrementorProps & {
  maxValue: number;
};

type FallingIncrementorProps = IncrementorProps & {
  minValue: number;
};

function* ValueLooper<T>(values: T[]): Generator<T> {
  let index = 0;
  while (values) {
    yield values[index++];
    index = index >= values.length ? 0 : index;
  }
}

function* IncrementingLooper(
  props: RisingIncrementorProps | FallingIncrementorProps
) {
  let value = props.startValue;
  while (true) {
    yield value;
    const newValue = props.incrementor(value);
    if ("maxValue" in props) {
      value = newValue > props.maxValue ? props.startValue : newValue;
    } else {
      value = newValue < props.minValue ? props.startValue : newValue;
    }
  }
}

export type IncrementingFunction = (current: number) => number;

export function useValueLooper<Type>(values: Type[]): Generator<Type> {
  return ValueLooper([...values]);
}

export function useIncrementingLooper(
  props: RisingIncrementorProps | FallingIncrementorProps
): Generator<number> {
  return IncrementingLooper(props);
}
