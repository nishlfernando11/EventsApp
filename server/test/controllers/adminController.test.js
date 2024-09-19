const { adminDetails } = require("../../controllers/adminController");
const Admin = require("../../models/admin");

describe("adminController", () => {
  test("adminDetails", async () => {
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
    jest.spyOn(Admin, "find").mockResolvedValueOnce(dummyData);
    await adminDetails(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });
});
