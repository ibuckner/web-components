import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-expand-item", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-expand-item></nel-expand-item>");
        const element: E2EElement = await page.find("nel-expand-item");
        expect(element).toHaveClass("hydrated");
      });
  });
});
