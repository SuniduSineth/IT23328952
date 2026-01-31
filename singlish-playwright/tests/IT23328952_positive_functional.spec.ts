import { test, expect } from "@playwright/test";

// Increase navigation timeout for all tests in this file
test.use({ navigationTimeout: 60000 });

const testCases = [
  {
    id: "Pos_Fun_0001",
    name: "Sinmple sentence",
    input: "mama gamata yanavaa.",
    expected: "මම ගමට යනවා.",
  },
  {
    id: "Pos_Fun_0002",
    name: "Compound sentence",
    input: "oyaa naanna yanavanam api aedhum aran yamu.",
    expected: "සහෝ මට අද ඔයා නාන්න යනවනම් අපි ඇදුම් අරන් යමු.",
  },
  {
    id: "Pos_Fun_0003",
    name: " Complex sentence (Condition)",
    input: "oyaa gedhara enavaa nam api adha mehe navathimu.",
    expected: "ඔයා ගෙදර එනවා නම් අපි අද මෙහෙ නවතිමු.",
  },
  {
    id: "Pos_Fun_0004",
    name: "Interrogative (questions) form",
    input: "oyaa heta panthi enavaadha?",
    expected: "ඔයා හෙට පන්ති එනවාද?",
  },
  {
    id: "Pos_Fun_0005",
    name: "Imperative (commands) form",
    input: "basayata naginna.",
    expected: "වාහනයට නගින්න.",
  },
  {
    id: "Pos_Fun_0006",
    name: "Negative sentence form",
    input: "mama eeka karannee naehae.",
    expected: "මම ඒක කරන්නේ නැහැ.",
  },
  {
    id: "Pos_Fun_0007",
    name: "Tense variations(Past tense)",
    input: "mama iiye palli giyaa.",
    expected: "මම ඊයෙ පල්ලි ගියා.",
  },
  {
    id: "Pos_Fun_0008",
    name: "Tense variations(Future tense)",
    input: "api heta paasal yamu.",
    expected: "අපි හෙට පාසල් යමු.",
  },
  {
    id: "Pos_Fun_0009",
    name: "Plural usage",
    input: "sathun kaeema karanavaa.",
    expected: "සතුන් කෑම කරනවා.",
  },
  {
    id: "Pos_Fun_0010",
    name: " Repeated word expressions",
    input: "uu ikmanin ikmanin giyaa.",
    expected: "ඌ ඉක්මනින් ඉක්මනින් ගියා.",
  },
  {
    id: "Pos_Fun_0011",
    name: " Multi-word Expressions",
    input: "ikmanata ennam.",
    expected: "ඉක්මනට එන්නම්.",
  },
  {
    id: "Pos_Fun_0012",
    name: " Polite phrasing",
    input: "karuNaakaralaa eeka naevatha raegena",
    expected: "කරුණාකරලා ඒක නැවත රැගෙන",
  },
  {
    id: "Pos_Fun_0013",
    name: "Informal Slang Phrasing",
    input: "adoo eeka patta aathal ban!",
    expected: "අඩෝ ඒක පට්ට ආතල් බන්!",
  },
  {
    id: "Pos_Fun_0014",
    name: "Inputs containing punctuation marks",
    input: "anee! oyaa kaeema genaavadha?",
    expected: "අනේ! ඔයා කෑම ගෙනාවද?",
  },
  {
    id: "Pos_Fun_0015",
    name: "Currency format",
    input: "mama oyaata Rs:1000k dhennam.",
    expected: "මම ඔයාට Rs:1000ක් දෙන්නම්.",
  },
  {
    id: "Pos_Fun_0016",
    name: "English abbreviations and short forms ",
    input: "mama CDM ekata salli dhaanavaa.",
    expected: "මම CDM එකට සල්ලි දානවා.",
  },
  {
    id: "Pos_Fun_0017",
    name: " Line breaks (multi-line input) ",
    input: "mama dhaen kanavaa. api passe kathaakaramu.",
    expected: "මම දැන් කනවා. අපි පස්සෙ කතාකරමු.",
  },
  {
    id: "Pos_Fun_0018",
    name: "Places and common English words",
    input: "mama Chilaw yadhdhi thamayi oyaa mata call kalee.",
    expected: "මම Chilaw යද්දි තමයි ඔයා මට call කලේ.",
  },
  {
    id: "Pos_Fun_0019",
    name: "Frequently used day-to-day expressions",
    input: "obata puluvan nam maava aeralavanna.",
    expected: "ඔබට පුලුවන් නම් මාව ඇරලවන්න",
  },
  {
    id: "Pos_Fun_0020",
    name: "Common greeting phrase",
    input: "mata adha tikak kammaeliyi.",
    expected: "මට අද ටිකක් කම්මැලියි.",
  },
  {
    id: "Pos_Fun_0021",
    name: "Short input validation",
    input: "karuNakaralaa arinna",
    expected: "කරුණකරලා අරින්න",
  },
  {
    id: "Pos_Fun_0022",
    name: "Medium input validation",
    input: "suBha upandhinayak veevaa!",
    expected: "සුභ උපන්දිනයක් වේවා!",
  },
  {
    id: "Pos_Fun_0023",
    name: "Long input validation",
    input: "mata dhaen veedhanayi",
    expected: "මට දැන් වේදනයි",
  },
  {
    id: "Pos_Fun_0024",
    name: "Unit of measurement",
    input: "mama heta udheema naegitalaa paadam tika okkoma karanna patangannavaa.",
    expected: "මම හෙට උදේම නැගිටලා පාඩම් ටික ඔක්කොම කරන්න පටන්ගන්නවා.",
  },
];

test.describe("Positive Functional Tests", () => {
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
      await expect(outputBox).toContainText(tc.expected, { timeout: 10000 });
      const output = await outputBox.textContent();
      expect(output).toContain(tc.expected);
      await page.close();
    });
  }
});
