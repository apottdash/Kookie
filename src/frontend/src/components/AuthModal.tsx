import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Loader2, Mail, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

type Tab = "signin" | "signup" | "forgot" | "magic";

export default function AuthModal() {
  const { closeAuthModal } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  const clearError = () => setError(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    clearError();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      toast.success("Welcome back! 💍");
      closeAuthModal();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    clearError();
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (err) {
      setLoading(false);
      setError(err.message);
      return;
    }
    if (data.user) {
      await supabase.from("couples").upsert({
        principal: data.user.id,
        display_name: name || email.split("@")[0],
      });
    }
    setLoading(false);
    toast.success("Account created! Check your email to verify. 💜");
    closeAuthModal();
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    clearError();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      toast.success("Password reset link sent to your email!");
      setTab("signin");
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    clearError();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setMagicSent(true);
    }
  };

  const handleOAuth = async (provider: "google" | "azure") => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
  };

  function OAuthButtons() {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <Button type="button" variant="outline" className="w-full gap-2" onClick={() => handleOAuth("google")}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        <Button type="button" variant="outline" className="w-full gap-2" onClick={() => handleOAuth("azure")}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#00A4EF" d="M0 0h11.5v11.5H0z"/>
            <path fill="#FFB900" d="M12.5 0H24v11.5H12.5z"/>
            <path fill="#00B04F" d="M0 12.5h11.5V24H0z"/>
            <path fill="#F25022" d="M12.5 12.5H24V24H12.5z"/>
          </svg>
          Continue with Microsoft (Outlook/Hotmail)
        </Button>
        <Button type="button" variant="outline" className="w-full gap-2 text-sm" onClick={() => { setTab("magic"); clearError(); }}>
          <Mail className="w-4 h-4 shrink-0" />
          Sign in with Email Link — no password needed
        </Button>
      </div>
    );
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0"
      aria-label="Sign in"
    >
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={closeAuthModal}
        onKeyUp={(e) => e.key === "Escape" && closeAuthModal()}
        aria-label="Close"
      />

      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border modal-enter overflow-hidden">
        {/* Header */}
        <div className="gradient-purple p-6 text-center relative">
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-smooth text-primary-foreground"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <Heart className="w-7 h-7 text-primary-foreground/90 mx-auto mb-2" />
          <h2 className="text-xl font-display font-bold text-primary-foreground">
            {tab === "signin" && "Welcome back"}
            {tab === "signup" && "Join WedVow"}
            {tab === "forgot" && "Reset password"}
            {tab === "magic" && "Email link sign-in"}
          </h2>
          <p className="text-primary-foreground/75 text-xs mt-1">
            {tab === "signin" && "Sign in to your account"}
            {tab === "signup" && "Plan your dream wedding"}
            {tab === "forgot" && "We'll send you a reset link"}
            {tab === "magic" && "One-click sign-in — works with any email"}
          </p>
        </div>

        <div className="p-6">
          {/* Tab switcher */}
          {(tab === "signin" || tab === "signup") && (
            <div className="flex rounded-full bg-muted p-1 mb-5">
              {(["signin", "signup"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); clearError(); }}
                  className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-smooth ${
                    tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              {error}
            </div>
          )}

          {/* Sign In */}
          {tab === "signin" && (
            <>
              <OAuthButtons />
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or with password</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <form onSubmit={handleSignIn} className="space-y-3">
                <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => { setTab("forgot"); clearError(); }} className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
                <Button type="submit" className="w-full gradient-purple text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </>
          )}

          {/* Sign Up */}
          {tab === "signup" && (
            <>
              <OAuthButtons />
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or with email & password</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <form onSubmit={handleSignUp} className="space-y-3">
                <Input type="text" placeholder="Your name (or couple names)" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Create a password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <Button type="submit" className="w-full gradient-purple text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account 💍"}
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  By creating an account you agree to our Terms & Privacy Policy
                </p>
              </form>
            </>
          )}

          {/* Magic Link / Email OTP */}
          {tab === "magic" && (
            magicSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <p className="font-semibold text-foreground mb-1">Check your inbox!</p>
                <p className="text-xs text-muted-foreground mb-4">
                  We sent a sign-in link to <strong>{email}</strong>.<br />
                  Click the link to sign in instantly — no password needed.<br />
                  Works with Gmail, Outlook, Yahoo, iCloud, and all others.
                </p>
                <button
                  type="button"
                  onClick={() => { setMagicSent(false); setEmail(""); }}
                  className="text-xs text-primary hover:underline"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Enter any email address — Gmail, Outlook, Yahoo, iCloud — and we'll send you a one-click sign-in link. No password required.
                </p>
                <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                <Button type="submit" className="w-full gradient-purple text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4 mr-2" /> Send Sign-In Link</>}
                </Button>
                <button type="button" onClick={() => { setTab("signin"); clearError(); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-smooth">
                  ← Back to Sign In
                </button>
              </form>
            )
          )}

          {/* Forgot Password */}
          {tab === "forgot" && (
            <form onSubmit={handleForgot} className="space-y-3">
              <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
              <Button type="submit" className="w-full gradient-purple text-primary-foreground" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4 mr-2" /> Send Reset Link</>}
              </Button>
              <button type="button" onClick={() => { setTab("signin"); clearError(); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-smooth">
                ← Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
