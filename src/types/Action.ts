export interface Action<T> {
  type: T,
  payload: unknown,
}