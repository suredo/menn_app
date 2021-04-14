import { render } from "enzyme";
import Username from "../../../pages/download/ios/[username]";

const user = { _id: "1", username: "sled" };

describe("/username", () => {
  const wrapper = render(<Username user={user} />);
  it("Should have a paragraph", () => {
    expect(wrapper.find("p")).toHaveLength(1);
  });
  it("Should have a button if there is a user", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("Should print username if there is one", () => {
    expect(wrapper.find("span")).toHaveLength(1);
  });
  it("Shouldn't have a button if there is no user", () => {
    const noUser = null;
    const wrapper = render(<Username user={noUser} />);
    expect(wrapper.find("button")).toHaveLength(0);
  });
});
