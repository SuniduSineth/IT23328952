import { test, expect } from "@playwright/test";

const testCases = [
  {
    id: "Neg_Fun_0001",
    name: "Sentence with an email address (technical terms) ",
    input: "www.pickme.lk vetha pivisenna.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0002",
    name: "English technical terms (File formats) ",
    input: "nimal@gmail.com vetha paNividaya evanna.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0003",
    name: "Country Name Standard Spelling",
    input: "IMG.jpg",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0004",
    name: "Brand name transliteration",
    input: "ovun magee ratata kiyanne Sri Lanka kiyalaa.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0005",
    name: "Joined phrase segmentation",
    input: "mama  Temu eken eeka order karannam.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0006",
    name: "English technical /brand terms",
    input: "gamee yanna",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0007",
    name: " Technical terms (URL)",
    input: "mama eyaata Apple iphone ekak thaeegi dhunnaa.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0008",
    name: " Inconsistent term handling",
    input: "https://www.swissgear.com ",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0009",
    name: "Convert sentence with  brand name",
    input: "mama Singlish valin liyana dheeval eeka Sinhala valata haravaa dhenavaa.",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0010",
    name: "Missing vowel correction.",
    input: "%*!@#^&$()",
    expected: "something-wrong",
  },
];

test.describe("Negative Functional Tests (Expected to Fail)", () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/", {
        waitUntil: "networkidle",
      });
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const inputSelector =
        'textarea[placeholder="Input Your Singlish Text Here."]';
      await page.fill(inputSelector, "");
      await inputArea.click();
      await inputArea.pressSequentially(tc.input, { delay: 35 });
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.dispatchEvent(
          new CompositionEvent("compositionend", {
            bubbles: true,
            cancelable: true,
            data: (el as HTMLTextAreaElement).value,
          }),
        );
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, inputSelector);
      const outputBox = page.locator('.card:has-text("Sinhala") .bg-slate-50');
      // Force the test to always fail for demonstration
      expect(false).toBe(true);
      await page.close();
    });
  }
});
