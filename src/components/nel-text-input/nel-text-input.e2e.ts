import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-text-input", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-text-input></nel-text-input>");
        const element: E2EElement = await page.find("nel-text-input");
        expect(element).toHaveClass("hydrated");
      });
  });

  it("renders changes to data", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent(`<nel-text-input mask="[a-z]+"></nel-text-input>`);
        const component: E2EElement = await page.find("nel-text-input");
        const element: E2EElement = await page.find("nel-text-input >>> input");

        component.setProperty("value", "1ll3gal chars");
        await page.waitForChanges();
        expect((element as any).value).toEqual("");
      });
  });
});
