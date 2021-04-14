import { shallow } from "enzyme";
import Button from "./index";

describe("Button component", () => {
  it("Button should render with share text if there is no shortlink", () => {
    const wrapper = shallow(
      <Button handleDeepLink={async () => {}} link={""} />
    );
    expect(wrapper.find("button").text()).toEqual("SHARE");
  });
  it("Button shouldn't render if there is shortlink", () => {
    const wrapper = shallow(
      <Button handleDeepLink={async () => {}} link={"link"} />
    );
    expect(wrapper.find("button")).toHaveLength(0);
  });
});
