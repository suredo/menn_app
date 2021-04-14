import { shallow } from "enzyme";
import Button from "./index";

describe("Button component", () => {
  it("Button should render wit ANDROID APPP text in it", () => {
    const wrapper = shallow(<Button device={"android"}>ANDROID APP</Button>);
    expect(wrapper.find("button").text()).toEqual("ANDROID APP");
  });
  it("Button should render wit IOS APPP text in it", () => {
    const wrapper = shallow(<Button device={"ios"}>IOS APP</Button>);
    expect(wrapper.find("button").text()).toEqual("IOS APP");
  });
});
