import { shallow } from "enzyme";
import Input from "./index";

describe("User Input", () => {
  const props = {
    input: "",
    setInput: () => {},
  };
  it("Input should have type='text' attribute", () => {
    const wrapper = shallow(
      <Input input={props.input} setInput={props.setInput} />
    );
    expect(wrapper.find("[type='text']")).toHaveLength(1);
  });
  it("Input should have required attribute", () => {
    const wrapper = shallow(
      <Input input={props.input} setInput={props.setInput} />
    );
    expect(wrapper.find("[required]")).toHaveLength(1);
  });
  it("Input value should be an empty string", () => {
    const wrapper = shallow(
      <Input input={props.input} setInput={props.setInput} />
    );
    expect(wrapper.find("input").get(0).props.value).toEqual("");
  });
});
