import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-on-off", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-on-off></nel-on-off>");
        const element: E2EElement = await page.find("nel-on-off");
        expect(element).toHaveClass("hydrated");
      });
  });
});
