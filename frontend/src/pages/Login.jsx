import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import PageWrapper from "../components/PageWrapper";
import back4 from "../assets/images/bac4.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInput = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const fillDemo = (type) => {
    setFormData(
      type === "admin"
        ? { email: "admin@wonderway.local", password: "WonderAdmin@123" }
        : { email: "demo@wonderway.local", password: "WonderUser@123" }
    );
  };

  const logInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Invalid credentials");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: result.data, token: result.token, role: result.role },
      });
      toast.success("Welcome back to WanderWay!");
      navigate(result.role === "admin" ? "/admin" : "/home");
    } catch (error) {
      toast.error(error.message || "Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <main className="relative min-h-screen overflow-hidden bg-[#041c17] px-4 pb-12 pt-28 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 15% 20%, rgba(110,231,183,.18), transparent 28%), radial-gradient(circle at 85% 80%, rgba(0,168,107,.18), transparent 30%), url(${back4})`, backgroundSize: "cover", backgroundPosition: "center" }} />

        <div className="relative mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
          <section className="relative hidden overflow-hidden lg:block">
            <img src={back4} alt="Misty green mountain landscape" className="absolute inset-0 h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00291e]/90 via-[#003d2b]/65 to-[#00130e]/95" />
            <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
              <div>
                <div className="mb-14 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#6ee7b7] text-[#00291e]"><Sparkles size={21} /></div>
                  <span className="text-2xl font-semibold tracking-tight">WanderWay</span>
                </div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#6ee7b7]">Your next story starts here</p>
                <h1 className="max-w-lg text-5xl font-semibold leading-[1.06] tracking-tight xl:text-6xl">Travel farther.<br /><span className="text-[#6ee7b7]">Feel more.</span></h1>
                <p className="mt-7 max-w-md text-lg leading-8 text-white/70">Curated escapes, thoughtful itineraries and the freedom to discover places at your own pace.</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70"><ShieldCheck size={18} className="text-[#6ee7b7]" /> Secure access to your travel workspace</div>
            </div>
          </section>

          <section className="flex items-center p-6 sm:p-10 lg:p-14">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="mx-auto w-full max-w-md">
              <div className="mb-10 lg:hidden"><p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#6ee7b7]">WanderWay</p><h1 className="text-4xl font-semibold tracking-tight text-white">Welcome back.</h1></div>
              <div className="mb-9"><p className="mb-3 text-sm font-medium text-[#6ee7b7]">Sign in to continue</p><h2 className="text-3xl font-semibold tracking-tight text-white">Let’s get you moving.</h2><p className="mt-3 text-sm leading-6 text-white/55">Access your saved trips, bookings and personalized travel plans.</p></div>

              <form onSubmit={logInHandler} className="space-y-5">
                <label className="block"><span className="mb-2 block text-sm font-medium text-white/75">Email address</span><input required type="email" name="email" value={formData.email} onChange={handleInput} placeholder="you@example.com" className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#6ee7b7]/70 focus:ring-4 focus:ring-[#6ee7b7]/10" /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white/75">Password</span><div className="relative"><input required minLength={6} type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInput} placeholder="Enter your password" className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pr-12 text-white outline-none transition placeholder:text-white/25 focus:border-[#6ee7b7]/70 focus:ring-4 focus:ring-[#6ee7b7]/10" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-[#6ee7b7]">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
                <button disabled={isLoading} type="submit" className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#6ee7b7] font-semibold text-[#00291e] transition hover:bg-[#8af0c7] disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? "Signing you in…" : "Sign in"}{!isLoading && <ArrowRight size={19} className="transition group-hover:translate-x-1" />}</button>
              </form>

              <div className="mt-8 border-t border-white/10 pt-6"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">Quick demo access</p><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => fillDemo("user")} className="rounded-xl border border-white/10 px-3 py-3 text-left text-xs text-white/65 transition hover:border-[#6ee7b7]/50 hover:text-white"><span className="block font-semibold text-white/85">Customer</span>Fill demo login</button><button type="button" onClick={() => fillDemo("admin")} className="rounded-xl border border-white/10 px-3 py-3 text-left text-xs text-white/65 transition hover:border-[#6ee7b7]/50 hover:text-white"><span className="block font-semibold text-white/85">Admin</span>Fill demo login</button></div></div>
              <p className="mt-8 text-center text-sm text-white/50">New to WanderWay? <Link to="/register" className="font-semibold text-[#6ee7b7] transition hover:text-white">Create an account</Link></p>
            </motion.div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Login;
