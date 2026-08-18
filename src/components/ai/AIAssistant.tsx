"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, LoaderCircle, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { useLocale } from "@/context/LocaleContext";

type AssistantMode = "public" | "admin";
type AssistantStrategy = "fast" | "thinking";
type ChatMessage = { role: "user" | "assistant"; content: string };

const copy = {
  en: {
    public: {
      label: "Mirna AI assistant",
      title: "Packaging assistant",
      intro: "Ask about packaging formats, materials, finishing, or preparing a quote.",
      placeholder: "Ask a packaging question...",
      send: "Send message",
      clear: "Clear conversation",
      close: "Close assistant",
      open: "Open Mirna AI assistant",
      error: "The assistant is temporarily unavailable. Please try again.",
      fast: "Fast answers",
      thinking: "Deep thinking",
      suggestions: ["Which carton material fits cosmetics?", "What should I prepare for a quote?"],
    },
    admin: {
      label: "Mirna CMS assistant",
      title: "Operations copilot",
      intro: "Ask for help with CMS content, SEO, catalog records, or publishing workflow.",
      placeholder: "Ask about the CMS...",
      send: "Send message",
      clear: "Clear conversation",
      close: "Close assistant",
      open: "Open Mirna CMS assistant",
      error: "The assistant is temporarily unavailable. Please try again.",
      fast: "Fast answers",
      thinking: "Deep thinking",
      suggestions: ["How do I publish a content revision?", "What makes a good SEO description?"],
    },
  },
  ar: {
    public: {
      label: "مساعد ميرنا الذكي",
      title: "مساعد التغليف",
      intro: "اسأل عن أنواع العبوات والخامات والتشطيبات أو تجهيز طلب عرض سعر.",
      placeholder: "اكتب سؤالك عن التغليف...",
      send: "إرسال الرسالة",
      clear: "مسح المحادثة",
      close: "إغلاق المساعد",
      open: "فتح مساعد ميرنا الذكي",
      error: "المساعد غير متاح مؤقتًا. حاول مرة أخرى.",
      fast: "إجابة سريعة",
      thinking: "تفكير عميق",
      suggestions: ["ما الخامة المناسبة لعبوات مستحضرات التجميل؟", "ما البيانات المطلوبة لطلب عرض سعر؟"],
    },
    admin: {
      label: "مساعد ميرنا CMS",
      title: "مساعد العمليات",
      intro: "اسأل عن المحتوى وSEO والكتالوج وسير عمل النشر داخل لوحة الإدارة.",
      placeholder: "اكتب سؤالك عن لوحة الإدارة...",
      send: "إرسال الرسالة",
      clear: "مسح المحادثة",
      close: "إغلاق المساعد",
      open: "فتح مساعد ميرنا CMS",
      error: "المساعد غير متاح مؤقتًا. حاول مرة أخرى.",
      fast: "إجابة سريعة",
      thinking: "تفكير عميق",
      suggestions: ["كيف أنشر نسخة جديدة من المحتوى؟", "ما مواصفات وصف SEO جيد؟"],
    },
  },
} as const;

function initialMessages(mode: AssistantMode, locale: "ar" | "en"): ChatMessage[] {
  return [{ role: "assistant", content: copy[locale][mode].intro }];
}

export default function AIAssistant({ mode }: { mode: AssistantMode }) {
  const { locale, dir } = useLocale();
  const text = copy[locale][mode];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => initialMessages(mode, locale));
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<AssistantStrategy>("fast");
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const resetConversation = () => {
    setMessages(initialMessages(mode, locale));
    setInput("");
    setError("");
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12), locale, mode, strategy }),
      });
      const result = (await response.json()) as { answer?: unknown; error?: unknown };
      const answer = result.answer;
      if (!response.ok || typeof answer !== "string") {
        throw new Error(typeof result.error === "string" ? result.error : text.error);
      }
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch {
      setError(text.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-5 z-[70] ${dir === "rtl" ? "left-5" : "right-5"}`} dir={dir}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mb-3 flex w-[min(92vw,390px)] max-h-[min(72vh,620px)] flex-col overflow-hidden rounded-[24px] border border-[#DCE5EC] bg-white shadow-[0_24px_70px_rgba(15,76,129,0.22)]"
            aria-label={text.label}
            role="dialog"
          >
            <header className="flex items-center gap-3 bg-[#102F49] px-4 py-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#102F49]" aria-hidden="true">
                <Sparkles size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#BBD0DF]">{text.label}</p>
                <h2 className="mt-0.5 truncate text-base font-bold">{text.title}</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-[#BBD0DF] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]" aria-label={text.close}>
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#F7FAFC] px-3 py-4 sm:px-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? (dir === "rtl" ? "justify-start" : "justify-end") : (dir === "rtl" ? "justify-end" : "justify-start")}`}>
                  <div className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "bg-[#0F4C81] text-white" : "border border-[#DCE5EC] bg-white text-[#29465A]"}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className={`flex ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#DCE5EC] bg-white px-3.5 py-2.5 text-sm text-[#6F8291]">
                    <LoaderCircle className="animate-spin" size={15} aria-hidden="true" />
                    <span>{locale === "ar" ? "جاري التفكير..." : "Thinking..."}</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 border-t border-[#E7EEF3] bg-white px-3 pt-3 sm:px-4">
                {text.suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="rounded-full border border-[#DCE5EC] px-3 py-1.5 text-start text-[11px] font-semibold text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F3F8FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F4C81]">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={sendMessage} className="border-t border-[#E7EEF3] bg-white p-3 sm:p-4">
              {error && <p className="mb-2 text-xs font-semibold text-[#B42318]" role="alert">{error}</p>}
              <div className="flex items-end gap-2">
                <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={1} maxLength={3000} placeholder={text.placeholder} className="min-h-11 max-h-28 flex-1 resize-y rounded-xl border border-[#DCE5EC] bg-white px-3 py-2.5 text-sm text-[#1E293B] outline-none transition placeholder:text-[#9AABB8] focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10" aria-label={text.placeholder} />
                <button type="submit" disabled={loading || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81] text-white transition hover:bg-[#0B3D68] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C81]" aria-label={text.send}>
                  <Send size={17} className={dir === "rtl" ? "rotate-180" : ""} aria-hidden="true" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <button type="button" onClick={resetConversation} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6F8291] transition hover:text-[#0F4C81]" aria-label={text.clear}>
                  <RotateCcw size={13} aria-hidden="true" />
                  {text.clear}
                </button>
                <button type="button" onClick={() => setStrategy((current) => current === "fast" ? "thinking" : "fast")} disabled={loading} className="rounded-full border border-[#DCE5EC] px-2.5 py-1 text-[10px] font-semibold text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F3F8FC] disabled:cursor-not-allowed disabled:opacity-50" aria-label={strategy === "fast" ? text.thinking : text.fast}>
                  {strategy === "fast" ? text.fast : text.thinking}
                </button>
                <span className="truncate text-[10px] text-[#9AABB8]">SovereignEG · {strategy === "fast" ? "deepseek-v4-flash" : "qwen3.6-27b"}</span>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#0F4C81] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,76,129,0.28)] transition hover:bg-[#0B3D68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C81]"
          aria-label={text.open}
        >
          <Bot size={18} aria-hidden="true" />
          <span className="hidden sm:inline">{locale === "ar" ? "مساعد ميرنا" : "Mirna AI"}</span>
          <MessageCircle className="sm:hidden" size={17} aria-hidden="true" />
        </motion.button>
      )}
    </div>
  );
}
