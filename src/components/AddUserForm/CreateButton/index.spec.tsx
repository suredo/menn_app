import { shallow } from "enzyme";
import Button from "./index";

describe("Button component", () => {
  it("Button should render wit CREATE text in it", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find("button").text()).toEqual("CREATE");
  });
});
