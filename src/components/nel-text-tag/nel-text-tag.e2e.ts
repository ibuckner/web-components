import { E2EElement, newE2EPage } from "@stencil/core/testing";

describe("nel-text-tag", () => {
  it("renders", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-text-tag></nel-text-tag>");
        const element: E2EElement = await page.find("nel-text-tag");
        expect(element).toHaveClass("hydrated");
      });
  });

  it("renders changes to data", async () => {
    await newE2EPage()
      .then(async page => {
        await page.setContent("<nel-text-tag color='red' label='Mammal'>Fox</nel-text-tag>");
        const component: E2EElement = await page.find("nel-text-tag");
        const element: E2EElement = await page.find("nel-text-tag >>> mark");
        const elementLabel: E2EElement = await page.find("nel-text-tag >>> mark > span");

        expect(elementLabel.textContent).toEqual(" Mammal");
        element.getComputedStyle()
          .then(style => {
            expect(style.backgroundColor).toEqual("rgb(255, 0, 0)");
            expect(style.color).toEqual("rgb(255, 255, 255)");
          });

        component.setProperty("label", "Fish");
        await page.waitForChanges();
        expect(elementLabel.textContent).toEqual(" Fish");
      });
  });
});
