import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-list-item", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-list-item></nel-list-item>");
        const element: E2EElement = await page.find("nel-list-item");
        expect(element).toHaveClass("hydrated");
      });
  });
});
