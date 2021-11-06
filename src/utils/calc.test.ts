import { reversePolish } from "./calc";

describe("calc", function () {
  it("1 3 5 * - => -14", function () {
    let result = reversePolish("1 3 5 * -");
    expect(result).toBe(-14.0);
  });

  it("5 5 5 8 + + - => -13", function () {
    let result = reversePolish("5 5 5 8 + + -");
    expect(result).toBe(-13.0);
  });
});
