// @ts-ignore
import { reversePolishNotion } from "../../../src/utils/calc";

describe("reversePolishNotion() return the right value", function () {
  it("1 3 5 * - => -14", function () {
    const result = reversePolishNotion("1 3 5 * -");
    expect(result).toEqual([-14.0]);
  });

  it("5 5 5 8 + + - => -13", function () {
    const result = reversePolishNotion("5 5 5 8 + + -");
    expect(result).toEqual([-13.0]);
  });

  it("-3 -2 * 5 + => 11", function () {
    expect(reversePolishNotion("-3 -2 *")).toEqual([6]);
    expect(reversePolishNotion("-3 -2 * 5 +")).toEqual([11.0]);
  });

  it("5 9.0 1 - / => 0.625", function () {
    expect(reversePolishNotion("5 9.0 1 - /")).toEqual([0.625]);
  });
});

describe("reversePolishNotion() handle unfinished/wrong data", function () {
  it("1 3 5 should return same array", function () {
    expect(reversePolishNotion("1 3 5")).toEqual([1, 3, 5]);
  });

  it("1 3 5 + => [1 8]", function () {
    expect(reversePolishNotion("1 3 5 +")).toEqual([1, 8]);
  });

  it("1 + => [NaN]", function () {
    expect(reversePolishNotion("1 +")).toEqual([NaN]);
  });

  it("1 2 + - => [Nan]", function () {
    expect(reversePolishNotion("1 2 + -")).toEqual([NaN]);
  });

  it("+ => [NaN]", function () {
    expect(reversePolishNotion("+")).toEqual([NaN]);
  });

  it("+ - => [NaN]", function () {
    expect(reversePolishNotion("+ -")).toEqual([NaN]);
  });
});
