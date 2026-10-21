import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import back4 from "../assets/images/bac4.png";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const updateField = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.message.trim().length < 10) {
      setFeedback({ type: "error", text: "Please add a little more detail to your message." });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, ...formData }),
      });
      const result = await response.json();
      if (!result.success) throw new Error("Message could not be sent");
      setFormData({ email: "", subject: "", message: "" });
      setFeedback({ type: "success", text: "Thanks for reaching out. We’ll be in touch shortly." });
    } catch {
      setFeedback({ type: "error", text: "We couldn’t send your message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), 4500);
    return () => clearTimeout(timer);
  }, [feedback]);

  return (
    <PageWrapper>
      <main className="relative min-h-screen overflow-hidden bg-[#041c17] px-4 pb-16 pt-28 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: `radial-gradient(circle at 80% 12%, rgba(110,231,183,.2), transparent 28%), linear-gradient(135deg, rgba(0,41,30,.94), rgba(0,77,51,.78)), url(${back4})`, backgroundSize: "cover", backgroundPosition: "center" }} />

        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#6ee7b7]">Let’s plan something beautiful</p><h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Tell us where your<br /><span className="text-[#6ee7b7]">curiosity leads.</span></h1><p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">Have a question about a destination, a custom itinerary or a future collaboration? Our team is here to help.</p></motion.div>

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[.8fr_1.2fr]">
            <aside className="relative overflow-hidden bg-[#003d2b] p-7 sm:p-10 lg:p-12"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#6ee7b7]/20" /><div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-[#6ee7b7]/10" /><div className="relative"><div className="mb-14 grid h-14 w-14 place-items-center rounded-2xl bg-[#6ee7b7] text-[#00291e]"><MessageCircle size={25} /></div><h2 className="text-2xl font-semibold text-white">We’re good listeners.</h2><p className="mt-3 max-w-sm leading-7 text-white/60">Share what you’re imagining and we’ll help turn it into a trip worth remembering.</p><div className="mt-12 space-y-6"><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#6ee7b7]"><Mail size={18} /></div><div><p className="text-xs uppercase tracking-wider text-white/40">Email us</p><p className="mt-1 text-sm text-white/85">support@veelgen.tech</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#6ee7b7]"><Phone size={18} /></div><div><p className="text-xs uppercase tracking-wider text-white/40">Call us</p><p className="mt-1 text-sm text-white/85">+91 63606 67440</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#6ee7b7]"><MapPin size={18} /></div><div><p className="text-xs uppercase tracking-wider text-white/40">Based in</p><p className="mt-1 text-sm text-white/85">Bengaluru, India</p></div></div></div><div className="mt-14 flex items-center gap-2 border-t border-white/10 pt-6 text-xs text-white/45"><Clock3 size={15} className="text-[#6ee7b7]" /> Usually replies within one business day</div></div></aside>

            <section className="p-7 sm:p-10 lg:p-12"><div className="mb-8"><p className="text-sm font-medium text-[#6ee7b7]">Start a conversation</p><h2 className="mt-2 text-3xl font-semibold text-white">How can we help?</h2></div><form onSubmit={handleSubmit} className="space-y-5"><label className="block"><span className="mb-2 block text-sm font-medium text-white/75">Your email</span><input required type="email" name="email" value={formData.email} onChange={updateField} placeholder="you@example.com" className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#6ee7b7]/70 focus:ring-4 focus:ring-[#6ee7b7]/10" /></label><label className="block"><span className="mb-2 block text-sm font-medium text-white/75">What can we help with?</span><input required type="text" name="subject" value={formData.subject} onChange={updateField} placeholder="Trip planning, partnership, support…" className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#6ee7b7]/70 focus:ring-4 focus:ring-[#6ee7b7]/10" /></label><label className="block"><span className="mb-2 block text-sm font-medium text-white/75">Your message</span><textarea required minLength={10} rows="6" name="message" value={formData.message} onChange={updateField} placeholder="Tell us a little about what you have in mind…" className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#6ee7b7]/70 focus:ring-4 focus:ring-[#6ee7b7]/10" /></label><div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center"><p className="text-xs leading-5 text-white/35">By sending this message, you agree to be contacted about your enquiry.</p><button disabled={loading} type="submit" className="group flex h-14 w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-[#6ee7b7] px-7 font-semibold text-[#00291e] transition hover:bg-[#8af0c7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{loading ? "Sending…" : "Send message"}{!loading && <Send size={17} className="transition group-hover:translate-x-1" />}</button></div></form></section>
          </div>
        </div>

        <AnimatePresence>{feedback && <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className={`fixed right-5 top-24 z-[1000] flex max-w-sm items-center gap-3 rounded-2xl border px-5 py-4 text-sm shadow-2xl backdrop-blur-xl ${feedback.type === "success" ? "border-[#6ee7b7]/30 bg-[#073b2c]/95 text-[#baffdf]" : "border-red-400/30 bg-[#4a1515]/95 text-red-100"}`}>{feedback.type === "success" ? <CheckCircle2 size={19} /> : <MessageCircle size={19} />}{feedback.text}</motion.div>}</AnimatePresence>
      </main>
    </PageWrapper>
  );
};

export default Contact;
