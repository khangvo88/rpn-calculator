import { IOperator } from "@App/types/Operator";

import OperatorPlus from "@App/utils/calculator/operators/OperatorPlus";
import OperatorMinus from "@App/utils/calculator/operators/OperatorMinus";
import OperatorMultiply from "@App/utils/calculator/operators/OperatorMultiply";
import OperatorDivide from "@App/utils/calculator/operators/OperatorDivide";

export class RpnCalculator {
  operators: {
    [op: string]: IOperator;
  };

  constructor() {
    this.operators = {};
  }

  /**
   * register Operator
   * @param operator
   */
  registerOperation(operator: IOperator) {
    if (!(operator.op in operator)) {
      this.operators[operator.op] = operator;
    } else {
      console.warn(`This operator ${operator.op} was already registered.`);
    }
  }

  getAllowedOperators() {
    return Object.keys(this.operators);
  }

  process(newExpr: string): Array<number | string> {
    const allowedOperators = this.getAllowedOperators();

    let expr = newExpr.trim().split(" ");
    let stack: Array<number | string> = [];

    if (expr.length === 0) {
      return [];
    }

    for (let i = 0; i < expr.length; i++) {
      const val = expr[i];

      if (!isNaN(Number(val)) && isFinite(Number(val))) {
        // TODO: validate type and input correct one
        stack.push(Number(val));
      } else {
        if (!(val in this.operators)) {
          console.warn(
            `${val} is not allowed. Allowed: ${this.getAllowedOperators().join(
              " "
            )}`
          );

          return [NaN]; // return error
        }

        const operation = this.operators[val];
        stack = operation.process(stack);
      }
    }

    return stack;
  }
}

const rpnCalculator = new RpnCalculator();
rpnCalculator.registerOperation(new OperatorPlus());
rpnCalculator.registerOperation(new OperatorMinus());
rpnCalculator.registerOperation(new OperatorMultiply());
rpnCalculator.registerOperation(new OperatorDivide());

export default rpnCalculator;
