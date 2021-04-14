import { shallow } from "enzyme";

import Form from "./index";

describe("Form component", () => {
  it("Shoud render from", () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find("form")).toHaveLength(1);
  });
});
