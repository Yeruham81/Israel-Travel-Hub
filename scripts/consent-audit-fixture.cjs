/** Editorial map audits exercise maps after an explicit category choice.
 * The independent cookie audit verifies that defaults and Necessary only block them.
 */
exports.allowEditorialMaps = async (page) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "ith:cookie-consent:v1",
      JSON.stringify({
        version: 1,
        categories: { analytics: false, external: true, marketing: false },
        expiresAt: Date.now() + 86400000,
      }),
    );
  });
};
