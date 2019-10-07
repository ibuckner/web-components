import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-status-badge", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-status-badge></nel-status-badge>");
        const element: E2EElement = await page.find("nel-status-badge");
        expect(element).toHaveClass("hydrated");
      });
  });
});
