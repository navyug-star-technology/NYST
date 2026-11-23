import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SubmissionSuccessDialog } from "@/components/submission-success-dialog";
import { apiRequest } from "@/lib/api";
import { useSiteCopy } from "@/hooks/use-site-content";

function QuestionPage() {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const title = useSiteCopy("question.title", "What would you like to know?");
  const description = useSiteCopy(
    "question.description",
    "Send our team a question about our services, products, or project process.",
  );

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      await apiRequest("/submissions", {
        method: "POST",
        body: JSON.stringify({ ...values, kind: "question", source: "/question" }),
      });
      form.reset();
      setSuccessOpen(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage contact-page question-page">
        <section className="contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">
              <CircleHelp aria-hidden="true" /> Ask our team
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className="contact-team-note">
              Our team will review your question and respond within 24 hours.
            </p>
          </div>
          <>
            <form className="lead-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Name
                  <input name="name" autoComplete="name" maxLength="120" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" maxLength="254" required />
                </label>
              </div>
              <label>
                Topic
                <input
                  name="topic"
                  maxLength="160"
                  placeholder="What is your question about?"
                  required
                />
              </label>
              <label>
                Your question
                <textarea
                  name="question"
                  rows="6"
                  maxLength="5000"
                  required
                  placeholder="Write your question here."
                />
              </label>
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Sending..." : "Send question"} <ArrowRight aria-hidden="true" />
              </Button>
              <p role={error ? "alert" : "status"}>
                {error ||
                  "Your details are handled securely and used only by our team to respond to you."}
              </p>
            </form>
            <SubmissionSuccessDialog open={successOpen} onOpenChange={setSuccessOpen} />
          </>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/question")({
  component: QuestionPage,
  head: () => ({
    meta: [
      { title: "Ask a Question | NavYug Star Technology" },
      { name: "description", content: "Send a question to NavYug Star Technology." },
    ],
  }),
});
