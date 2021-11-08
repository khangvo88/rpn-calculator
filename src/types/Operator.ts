export interface IOperator {
  op: string;
  process(items: Array<number | string>): Array<number | string>;
}
