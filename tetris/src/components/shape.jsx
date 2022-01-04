export const ROW_SIZE = 8;
export const COL_SIZE = 15;
export const DEFAULT_VALUE = -1;

export const emptyBoard = () => [...Array(ROW_SIZE * COL_SIZE)].map( _ => DEFAULT_VALUE)