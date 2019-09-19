import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-viz-container", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-viz-container></nel-viz-container>");
        const element: E2EElement = await page.find("nel-viz-container");
        expect(element).toHaveClass("hydrated");
      });
  });
});
