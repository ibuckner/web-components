import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-network-connection", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-network-connection></nel-network-connection>");
        const element: E2EElement = await page.find("nel-network-connection");
        expect(element).toHaveClass("hydrated");
      });
  });
});
