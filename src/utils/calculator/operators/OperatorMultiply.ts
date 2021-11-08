import { IOperator } from "@App/types/Operator";

export default class OperatorMultiply implements IOperator {
  op: string;

  constructor() {
    this.op = "*";
  }

  process(items: Array<number | string>): Array<number | string> {
    let newResult = [...items];

    const a = newResult.pop();
    const b = newResult.pop();

    // @ts-ignore
    const float_a = parseFloat(a);
    // @ts-ignore
    const float_b = parseFloat(b);

    newResult.push(float_a * float_b);

    return newResult;
  }
}
