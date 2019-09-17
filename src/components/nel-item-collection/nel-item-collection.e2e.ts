import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-item-collection", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-item-collection></nel-item-collection>");
        const element: E2EElement = await page.find("nel-item-collection");
        expect(element).toHaveClass("hydrated");
      });
  });
});
