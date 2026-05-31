import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function FeedbackWidget() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("feedback").insert({
      user_id: user?.id ?? null, rating: rating || null, comment: comment || null
    });
    setSubmitting(false);
    if (error) { toast.error("Couldn't send feedback"); return; }
    toast.success("Thanks for the feedback!");
    setOpen(false); setRating(0); setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 left-6 z-40 text-xs font-medium px-3 py-2 rounded-full bg-card border border-border shadow-soft hover:shadow-elegant transition">
          💬 Feedback
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Share your feedback</DialogTitle></DialogHeader>
        <div className="flex justify-center gap-1 py-2">
          {[1,2,3,4,5].map((n) => (
            <button key={n} onClick={() => setRating(n)}>
              <Star className={`w-8 h-8 transition ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>
        <Textarea placeholder="What's working great? What's broken?" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
        <Button onClick={submit} disabled={submitting} className="bg-gradient-brand text-primary-foreground">
          {submitting ? "Sending..." : "Send feedback"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
