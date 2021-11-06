/**
 *
 * @param newExpr
 * @returns {number}
 */
export const reversePolish = function (newExpr: string): number | string {
  let expr = newExpr.split(" ");
  let stack: Array<number> = [];

  if (expr.length === 0) {
    return 0;
  }

  for (let i = 0; i < expr.length; i++) {
    const val = expr[i];
    if (!isNaN(Number(val)) && isFinite(Number(val))) {
      // TODO: validate type and input correct one
      stack.push(Number(val));
    } else {
      let a = stack.pop();
      let b = stack.pop();
      // @ts-ignore
      const float_a = parseFloat(a);
      // @ts-ignore
      const float_b = parseFloat(b);

      switch (val) {
        case "+":
          stack.push(float_a + float_b);
          break;
        case "-":
          stack.push(float_b - float_a);
          break;
        case "*":
          stack.push(float_b * float_a);
          break;
        case "/":
          // TODO: handle divide by zero
          stack.push(float_b / float_a);
          break;
      }
    }
  }

  // TODO: handle results when input is not finished yet.
  if (stack.length > 1) {
    return "";
  } else {
    return stack[0];
  }
};
