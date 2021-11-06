// @ts-ignore
import { reversePolish } from "../../../src/utils/calc";

describe("reversePolish() return the right value", function () {
  it("1 3 5 * - => -14", function () {
    const result = reversePolish("1 3 5 * -");
    expect(result).toBe(-14.0);
  });

  it("5 5 5 8 + + - => -13", function () {
    const result = reversePolish("5 5 5 8 + + -");
    expect(result).toBe(-13.0);
  });

  it("-3 -2 * 5 + => 11", function () {
    expect(reversePolish("-3 -2 *")).toBe(6);
    expect(reversePolish("-3 -2 * 5 +")).toBe(11.0);
  });

  it("5 9.0 1 - / => 0.625", function () {
    expect(reversePolish("5 9.0 1 - /")).toBe(0.625);
  });
});

describe("reversePolish() handle wrong data", function () {
  it("1 3 5 should return empty text", function () {
    expect(reversePolish("1 3 5")).toBe("");
  });
});
