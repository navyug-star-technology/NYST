import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteChatbot } from "@/components/site-chatbot";

describe("SiteChatbot", () => {
  it("offers a direct WhatsApp link", () => {
    render(<SiteChatbot />);

    const whatsappLink = screen.getByRole("link", { name: "Chat with us on WhatsApp" });
    const whatsappUrl = new URL(whatsappLink.href);

    expect(`${whatsappUrl.origin}${whatsappUrl.pathname}`).toBe("https://wa.me/918302248272");
    expect(whatsappUrl.searchParams.get("text")).toBe(
      "Hi NavYug Star Technology! I'm looking for a custom, responsive, and scalable digital solution for my business. Could you help me choose between a website, mobile app, or business software and share the next steps?",
    );
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
