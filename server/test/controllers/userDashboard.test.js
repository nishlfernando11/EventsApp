const { userDetails } = require("../../controllers/userDashboard");
const User = require("../../models/user");

describe("userDashboard", () => {
  test("userDetails", async () => {
    const mockRequest = {
      body: {
        admin_id: 1,
      },
    };
    const mockSend = {
      send: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn(() => mockSend),
    };
    const dummyData = { docs: [] };
    jest.spyOn(User, "find").mockResolvedValueOnce(dummyData);
    await userDetails(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });
});
