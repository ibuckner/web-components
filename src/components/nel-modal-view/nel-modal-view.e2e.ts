import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-modal-view", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-modal-view></nel-modal-view>");
        const element: E2EElement = await page.find("nel-modal-view");
        expect(element).toHaveClass("hydrated");
      });
  });
});
