import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { isAdminAuthenticated, tryAdminLogin } from "@/lib/adminAuth";
import { toast } from "sonner";

export default function AdminLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (tryAdminLogin(email, password)) {
        toast.success(t("adminLogin.success"));
        navigate(from.startsWith("/admin") ? from : "/admin", { replace: true });
      } else {
        toast.error(t("adminLogin.invalid"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0c1322" }}
    >
      <div className="mb-6 flex justify-center">
        <LanguageSwitcher heroOverlay className="inline-flex" />
      </div>

      <div className="mb-8 flex flex-col items-center text-center">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 shadow-lg"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.9)" }}
        >
          <Lock className="h-7 w-7 text-emerald-400" aria-hidden />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("adminLogin.title")}</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-400">{t("adminLogin.subtitle")}</p>
      </div>

      <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-2xl shadow-black/40">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-slate-700">
              {t("adminLogin.email")}
            </Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border-slate-200 bg-white text-slate-900"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-slate-700">
              {t("adminLogin.password")}
            </Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg border-slate-200 bg-white pr-11 text-slate-900"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t("adminLogin.hidePassword") : t("adminLogin.showPassword")}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-lg bg-emerald-400 text-base font-semibold text-white shadow-md shadow-emerald-500/25 transition-colors hover:bg-emerald-500 disabled:opacity-60"
          >
            {submitting ? t("adminLogin.signingIn") : t("adminLogin.signIn")}
          </Button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        <a href="/" className="text-slate-400 underline-offset-2 hover:text-slate-300 hover:underline">
          {t("adminLogin.backSite")}
        </a>
      </p>
    </div>
  );
}
