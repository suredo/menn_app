import Home from "../pages/index";
import { mount, render } from "enzyme";

const data = [{ _id: "1", username: "sled" }];

describe("Mount Home page", () => {
  const wrapper = render(<Home users={data} />);
  it("Should have an input field", () => {
    expect(wrapper.find("input")).toHaveLength(1);
  });
  it("Should have a button", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("Should render list if there's data", () => {
    expect(wrapper.find("li")).toHaveLength(1);
  });
  it("Shouldn't render list if there's no data", () => {
    const noData = [];
    const wrapper = render(<Home users={noData} />);
    expect(wrapper.find("li")).toHaveLength(0);
  });
});
