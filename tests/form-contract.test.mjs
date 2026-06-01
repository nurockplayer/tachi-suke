import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertContains(source, pattern, message) {
  assert.match(source, pattern, message);
}

function assertNoProviderUrl(source, label) {
  assert.doesNotMatch(
    source,
    /https?:\/\/(?:[^"'\s{}]*formspree|[^"'\s{}]*netlify|docs\.google\.com\/forms|[^"'\s{}]*workers\.dev)/i,
    `${label} must not hard-code an external form provider URL`
  );
}

function assertRequiredControl(source, controlName) {
  assertContains(
    source,
    new RegExp(`<(?:input|select|textarea)[^>]*name="${controlName}"[^>]*required|<(?:input|select|textarea)[^>]*required[^>]*name="${controlName}"`),
    `${controlName} should be required`
  );
}

describe("static form contracts", () => {
  it("documents provider-agnostic form endpoint environment variables", () => {
    const envExample = read(".env.example");

    assertContains(envExample, /^PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT=/m, ".env.example should include submit-place endpoint");
    assertContains(envExample, /^PUBLIC_CONTACT_FORM_ENDPOINT=/m, ".env.example should include contact endpoint");
  });

  it("keeps submit-place static, provider-agnostic, moderated, and preview-safe", () => {
    const source = read("src/components/pages/SubmitPlacePage.astro");

    assertContains(source, /PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT/, "submit-place should read its endpoint from env");
    assertContains(source, /method="POST"\s+action=\{formEndpoint\}/, "submit-place should POST to configured endpoint");
    assertContains(source, /disabled=\{!formEndpoint\}/, "submit-place should disable submit in preview mode");
    assertContains(source, /preview mode/i, "submit-place should explain preview mode");
    assertNoProviderUrl(source, "submit-place");

    for (const [name, value] of [
      ["formName", "submit-place"],
      ["source", "tachi-suke"],
      ["moderationRequired", "true"],
      ["publishDirectly", "false"]
    ]) {
      assertContains(source, new RegExp(`name="${name}"\\s+value="${value}"`), `submit-place should include hidden ${name}`);
    }
    assertContains(source, /name="locale"\s+value=\{locale\}/, "submit-place should include current locale");
    assertContains(source, /name="redirectUrl"\s+value=\{thanksUrl\}/, "submit-place should include provider-agnostic redirect URL");

    assertContains(source, /class="honeypot-field"\s+aria-hidden="true"/, "submit-place honeypot should be visually hidden");
    assertContains(source, /name="website"[^>]*tabindex="-1"[^>]*autocomplete="off"/, "submit-place honeypot should avoid normal focus and autocomplete");

    for (const controlName of [
      "submissionLanguage",
      "placeName",
      "category",
      "prefecture",
      "city",
      "googleMapUrl",
      "recommendationReason"
    ]) {
      assertRequiredControl(source, controlName);
    }

    assertContains(source, /name="googleMapUrl"\s+type="url"|type="url"\s+[^>]*name="googleMapUrl"/, "Google Maps URL should use type=url");
    assertContains(source, /name="officialUrl"\s+type="url"|type="url"\s+[^>]*name="officialUrl"/, "official URL should use type=url");
    assertContains(source, /name="submitterEmail"\s+type="email"|type="email"\s+[^>]*name="submitterEmail"/, "submitter email should use type=email");
  });

  it("keeps contact static, provider-agnostic, private, and preview-safe", () => {
    const source = read("src/components/pages/ContactPage.astro");

    assertContains(source, /PUBLIC_CONTACT_FORM_ENDPOINT/, "contact should read its endpoint from env");
    assertContains(source, /method="POST"\s+action=\{formEndpoint\}/, "contact should POST to configured endpoint");
    assertContains(source, /disabled=\{!formEndpoint\}/, "contact should disable submit in preview mode");
    assertContains(source, /preview mode/i, "contact should explain preview mode");
    assertNoProviderUrl(source, "contact");

    for (const [name, value] of [
      ["formName", "contact-corrections"],
      ["source", "tachi-suke"],
      ["publicResponse", "false"]
    ]) {
      assertContains(source, new RegExp(`name="${name}"\\s+value="${value}"`), `contact should include hidden ${name}`);
    }
    assertContains(source, /name="locale"\s+value=\{locale\}/, "contact should include current locale");
    assertContains(source, /name="redirectUrl"\s+value=\{thanksUrl\}/, "contact should include provider-agnostic redirect URL");

    assertContains(source, /class="honeypot-field"\s+aria-hidden="true"/, "contact honeypot should be visually hidden");
    assertContains(source, /name="company"[^>]*tabindex="-1"[^>]*autocomplete="off"/, "contact honeypot should avoid normal focus and autocomplete");

    for (const controlName of ["contactLanguage", "topic", "message"]) {
      assertRequiredControl(source, controlName);
    }

    assertContains(source, /name="relatedUrl"\s+type="url"|type="url"\s+[^>]*name="relatedUrl"/, "related URL should use type=url");
    assertContains(source, /name="email"\s+type="email"|type="email"\s+[^>]*name="email"/, "contact email should use type=email");
    assertContains(source, /data-related-url-input/, "contact should keep related URL prefill progressive enhancement");
  });
});
