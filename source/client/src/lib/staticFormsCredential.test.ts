import { describe, expect, it } from "vitest";

const endpoint = "https://api.staticforms.dev/submit";

describe("Static Forms public submission key", () => {
  it("is accepted by the public submit endpoint without sending PII", async () => {
    const apiKey = process.env.VITE_STATIC_FORMS_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_STATIC_FORMS_API_KEY is not available in the secure test environment");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ apiKey, honeypot: "technical-key-validation-only" }),
    });

    // The non-empty honeypot prevents this probe from being a valid lead. A 401
    // would specifically mean the supplied key was rejected by the provider.
    expect(response.status).not.toBe(401);
  }, 20_000);
});
