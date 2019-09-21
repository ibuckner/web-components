import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-viz-pie", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-viz-pie></nel-viz-pie>");
        const element: E2EElement = await page.find("nel-viz-pie");
        expect(element).toHaveClass("hydrated");
      });
  });
});
