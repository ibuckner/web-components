import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-tip", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-tip></nel-tip>");
        const element: E2EElement = await page.find("nel-tip");
        expect(element).toHaveClass("hydrated");
      });
  });
});
