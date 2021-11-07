// @ts-ignore
import TerminalCursor from "@App/components/TerminalCursor.vue";

import { shallowMount } from "@vue/test-utils";

describe("Cursor component", function () {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = shallowMount(TerminalCursor, { propsData: {} });
  });

  it("should render caret", function () {
    // expect(wrapper.element).toMatchSnapshot();

    const html = wrapper.html();
    expect(html).toContain("$");
  });
});
