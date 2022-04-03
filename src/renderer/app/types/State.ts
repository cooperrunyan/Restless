export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export type State<T> = [T, Setter<T>];
