export type Bang<T> = T extends null | undefined ? never : T;
