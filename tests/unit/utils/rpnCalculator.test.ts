// @ts-ignore
import { IOperator } from "@App/types/Operator";
// @ts-ignore
import OperatorPlus from "@App/utils/calculator/operators/OperatorPlus";
// @ts-ignore
import OperatorMinus from "@App/utils/calculator/operators/OperatorMinus";
// @ts-ignore
import OperatorMultiply from "@App/utils/calculator/operators/OperatorMultiply";
// @ts-ignore
import OperatorDivide from "@App/utils/calculator/operators/OperatorDivide";
// @ts-ignore
import rpnCalculator from "@App/utils/calculator/RpnCalculator";

describe("operators", function () {
  it("should calculate right plus operator", function () {
    const operator = new OperatorPlus();
    expect(operator.process([3, 1, 2])).toEqual([3, 3]);
    expect(operator.process([1, 2])).toEqual([3]);

    expect(operator.process([1])).toEqual([NaN]);
  });

  it("should calculate right minus operator", function () {
    const operator = new OperatorMinus();
    expect(operator.process([3, 1, 2])).toEqual([3, -1]);
    expect(operator.process([1, 2])).toEqual([-1]);

    expect(operator.process([1])).toEqual([NaN]);
  });

  it("should calculate right multiply operator", function () {
    const operator = new OperatorMultiply();
    expect(operator.process([3, 1, 2])).toEqual([3, 2]);
    expect(operator.process([3, 2])).toEqual([6]);

    expect(operator.process([1])).toEqual([NaN]);
  });

  it("should calculate right divide operator", function () {
    const operator = new OperatorDivide();
    expect(operator.process([3, 1, 2])).toEqual([3, 0.5]);
    expect(operator.process([3, 2])).toEqual([1.5]);

    expect(operator.process([1])).toEqual([NaN]);
  });
});

describe("rpnCalculator instance", function () {
  it("should allow + - * / operator", function () {
    expect(rpnCalculator.getAllowedOperators()).toEqual(["+", "-", "*", "/"]);
  });

  it("1 3 5 * - => -14", function () {
    const result = rpnCalculator.process("1 3 5 * -");
    expect(result).toEqual([-14.0]);
  });

  it("5 5 5 8 + + - => -13", function () {
    const result = rpnCalculator.process("5 5 5 8 + + -");
    expect(result).toEqual([-13.0]);
  });

  it("-3 -2 * 5 + => 11", function () {
    expect(rpnCalculator.process("-3 -2 *")).toEqual([6]);
    expect(rpnCalculator.process("-3 -2 * 5 +")).toEqual([11.0]);
  });

  it("5 9.0 1 - / => 0.625", function () {
    expect(rpnCalculator.process("5 9.0 1 - /")).toEqual([0.625]);
  });
});

describe("rpnCalculator() handle unfinished/wrong data", function () {
  it("1 3 5 should return same array", function () {
    expect(rpnCalculator.process("1 3 5")).toEqual([1, 3, 5]);
  });

  it("1 3 5 + => [1 8]", function () {
    expect(rpnCalculator.process("1 3 5 +")).toEqual([1, 8]);
  });

  it("1 + => [NaN]", function () {
    expect(rpnCalculator.process("1 +")).toEqual([NaN]);
  });

  it("1 2 + - => [Nan]", function () {
    expect(rpnCalculator.process("1 2 + -")).toEqual([NaN]);
  });

  it("+ => [NaN]", function () {
    expect(rpnCalculator.process("+")).toEqual([NaN]);
  });

  it("+ - => [NaN]", function () {
    expect(rpnCalculator.process("+ -")).toEqual([NaN]);
  });
});
