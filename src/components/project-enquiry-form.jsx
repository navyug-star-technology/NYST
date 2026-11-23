import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { SubmissionSuccessDialog } from "@/components/submission-success-dialog";

export function ProjectEnquiryForm({ source, services = [] }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      await apiRequest("/submissions", {
        method: "POST",
        body: JSON.stringify({ ...values, kind: "project", source }),
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
    <>
      <form className="lead-form" onSubmit={submit} aria-describedby="project-form-status">
        <div className="form-row">
          <label>
            Name
            <input name="name" autoComplete="name" maxLength="120" required />
          </label>
          <label>
            Business name
            <input name="business" autoComplete="organization" maxLength="160" />
          </label>
        </div>
        <div className="form-row">
          <label>
            Email or phone
            <input name="contact" autoComplete="email" maxLength="254" required />
          </label>
          <label>
            Service of interest
            <select name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service}>{service}</option>
              ))}
              <option>Product enquiry</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <label>
          Project description
          <textarea
            name="description"
            rows="4"
            maxLength="5000"
            required
            placeholder="Tell us what you would like to build."
          />
        </label>
        <label>
          Budget <span className="optional">(optional)</span>
          <select name="budget" defaultValue="">
            <option value="">Select a range</option>
            <option>Not sure yet</option>
            <option>Prefer to discuss</option>
          </select>
        </label>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending..." : "Get a Free Consultation"} <ArrowRight aria-hidden="true" />
        </Button>
        <p id="project-form-status" role={error ? "alert" : "status"}>
          {error ||
            "Your details are handled securely and used only by our team to respond to you."}
        </p>
      </form>
      <SubmissionSuccessDialog open={successOpen} onOpenChange={setSuccessOpen} />
    </>
  );
}
