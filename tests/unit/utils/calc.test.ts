// @ts-ignore
import { reversePolish } from "../../../src/utils/calc";

describe("reversePolish() return the right value", function () {
  it("1 3 5 * - => -14", function () {
    const result = reversePolish("1 3 5 * -");
    expect(result).toEqual([-14.0]);
  });

  it("5 5 5 8 + + - => -13", function () {
    const result = reversePolish("5 5 5 8 + + -");
    expect(result).toEqual([-13.0]);
  });

  it("-3 -2 * 5 + => 11", function () {
    expect(reversePolish("-3 -2 *")).toEqual([6]);
    expect(reversePolish("-3 -2 * 5 +")).toEqual([11.0]);
  });

  it("5 9.0 1 - / => 0.625", function () {
    expect(reversePolish("5 9.0 1 - /")).toEqual([0.625]);
  });
});

describe("reversePolish() handle unfinished/wrong data", function () {
  it("1 3 5 should return same array", function () {
    expect(reversePolish("1 3 5")).toEqual([1, 3, 5]);
  });

  it("1 3 5 + => [1 8]", function () {
    expect(reversePolish("1 3 5 +")).toEqual([1, 8]);
  });

  it ('1 + => [NaN]', function () {
    expect(reversePolish("1 +")).toEqual([NaN]);
  })

  it ('1 2 + - => [Nan]', function () {
    expect(reversePolish("1 2 + -")).toEqual([NaN]);
  })

  it('+ => [NaN]', function () {
    expect(reversePolish("+")).toEqual([NaN]);
  })

  it('+ - => [NaN]', function () {
    expect(reversePolish("+ -")).toEqual([NaN]);
  })
});

