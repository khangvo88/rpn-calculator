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

    const res_ab = parseFloat((float_b * float_a).toPrecision(12));

    newResult.push(res_ab);

    return newResult;
  }
}
