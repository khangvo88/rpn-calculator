// @ts-ignore
import Terminal from "@App/components/Terminal.vue";

import { shallowMount } from "@vue/test-utils";

describe("Terminal component", function () {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = shallowMount(Terminal, {
      props: {
        title: "Test Calcator",
      },
    });
  });

  it("should render", function () {
    // expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.html()).toContain("Test Calcator");
  });
});
