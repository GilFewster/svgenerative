/**
 * Hooks for creating generators that emit a range of values
 * and loop continuously, going back to the first value after
 * emitting the last value.
 *
 * Incrementing Looper emits number values only.
 * It takes a starting number, a min or max value and an incrementing function
 * to calculate each next value on request.
 *
 * Value Looper takes an array of values of any type, and iterates
 * each next value on request. After emitting the last value in the array,
 * the next value emitted will loop back to the first in the array.
 */

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
