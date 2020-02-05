import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-slicer-item", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-slicer-item></nel-slicer-item>");
        const element: E2EElement = await page.find("nel-slicer-item");
        expect(element).toHaveClass("hydrated");
      });
  });
});
