import { shallow } from "enzyme";
import Header from "./index";

describe("Header", () => {
  it("Should have text with 'This page is for {user}' if there is a user", () => {
    const username = "sled";
    const wrapper = shallow(<Header username={username} />);
    expect(wrapper.find("p").text()).toEqual("This page is for " + username);
  });
  it("Should have text with 'This user doesn't exist!' if there is no user", () => {
    const username = "";
    const wrapper = shallow(<Header username={username} />);
    expect(wrapper.find("h3").text()).toEqual("This user doesn't exist!");
  });
});
