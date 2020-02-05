import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-slicer", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-slicer></nel-slicer>");
        const element: E2EElement = await page.find("nel-slicer");
        expect(element).toHaveClass("hydrated");
      });
  });
});
