import { FormEvent, useState } from "react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { createSupportTicket } from "../../services/firestoreService";

export default function SupportPage() {
  const { currentUser, profile } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentUser || !profile) return;
    setIsSubmitting(true);
    setStatus("");

    try {
      await createSupportTicket({
        userId: currentUser.uid,
        userRole: profile.role,
        category: "Consumer support",
        subject,
        message,
        status: "open",
        assignedTo: "",
      });
      setSubject("");
      setMessage("");
      setStatus("Support ticket created.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to create ticket.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <PageHeader eyebrow="Support" title="Report an issue" description="Create a Firestore support ticket for admin follow-up." />
      <Card className="mt-8 max-w-2xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} required />
          <Textarea label="Message" value={message} onChange={(event) => setMessage(event.target.value)} required />
          {status ? <p className="rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">{status}</p> : null}
          <Button type="submit" isLoading={isSubmitting}>Submit ticket</Button>
        </form>
      </Card>
    </section>
  );
}
