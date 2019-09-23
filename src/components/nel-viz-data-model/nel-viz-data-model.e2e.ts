import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-viz-data-model", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-viz-data-model></nel-viz-data-model>");
        const element: E2EElement = await page.find("nel-viz-data-model");
        expect(element).toHaveClass("hydrated");
      });
  });
});
