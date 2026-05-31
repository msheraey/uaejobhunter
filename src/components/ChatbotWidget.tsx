import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "bot"; text: string };

const CANNED = [
  "JobHunter scans LinkedIn, Indeed, Bayt, Naukrigulf and GulfTalent daily, scores each job against your profile, and emails you the matches above 60%.",
  "Pick up to 5 target titles — the AI uses them along with your CV and summary to compute match scores.",
  "Tip: keep your profile summary specific (years of experience, industries, location) for sharper matches.",
  "Hit 'Create CV + Cover Letter' on any job card and a tailored version lands in your inbox in under a minute."
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Hunter, your job-search assistant. Ask me anything about JobHunter or how to land your next UAE role." }
  ]);

  const send = () => {
    if (!input.trim()) return;
    const user = input.trim();
    setMsgs((m) => [...m, { role: "user", text: user }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = CANNED[Math.floor(Math.random() * CANNED.length)];
      setMsgs((m) => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-brand shadow-elegant grid place-items-center text-white"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] rounded-2xl bg-card border border-border shadow-elegant flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gradient-brand text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <div>
                <p className="font-semibold text-sm">Hunter AI</p>
                <p className="text-xs opacity-80">Online · typically replies instantly</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "user" ? "bg-gradient-brand text-white" : "bg-muted text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1 px-3 py-2 bg-muted rounded-2xl w-fit">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:.15s]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:.3s]" />
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything..." />
              <Button onClick={send} size="icon" className="bg-gradient-brand text-white"><Send className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
