import { describe, expect, it } from "vitest";
import { normalizeSubmission } from "../../../backend/submission-validation.js";

describe("submission validation", () => {
  it("accepts visitor details without requiring question or project fields", () => {
    expect(
      normalizeSubmission({ kind: "visitor", name: " Ada ", email: "ada@example.com" }),
    ).toEqual({
      kind: "visitor",
      fields: { name: "Ada", email: "ada@example.com" },
      source: "website",
    });
  });

  it("keeps question and project fields in their own submission types", () => {
    expect(
      normalizeSubmission({
        kind: "question",
        name: "Sam",
        email: "sam@example.com",
        topic: "Services",
        question: "Can you help?",
      }).fields,
    ).toEqual({
      name: "Sam",
      email: "sam@example.com",
      topic: "Services",
      question: "Can you help?",
    });
    expect(
      normalizeSubmission({
        kind: "project",
        name: "Sam",
        contact: "555-0100",
        description: "A new website",
      }).fields,
    ).toEqual({
      name: "Sam",
      business: "",
      contact: "555-0100",
      service: "",
      description: "A new website",
      budget: "",
    });
  });

  it("rejects malformed or incomplete submissions", () => {
    expect(() =>
      normalizeSubmission({ kind: "visitor", name: "Sam", email: "not-an-email" }),
    ).toThrow("Enter a valid email address.");
    expect(() =>
      normalizeSubmission({ kind: "question", name: "Sam", email: "sam@example.com" }),
    ).toThrow("Topic is required.");
    expect(() => normalizeSubmission({ kind: "other" })).toThrow("Submission kind is invalid.");
  });
});
