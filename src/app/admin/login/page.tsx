"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? email);
    const submittedPassword = String(formData.get("password") ?? password);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: submittedEmail, password: submittedPassword }),
    });
    const result = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) {
      setError(result.error ?? "Unable to sign in.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-brand"><span>MG</span><div><strong>Mirna Graphic</strong><small>Operations CMS</small></div></div>
        <p className="admin-eyebrow">SECURE WORKSPACE</p>
        <h1 id="admin-login-title">Sign in to Admin</h1>
        <p className="admin-login-copy">Manage published site content, production information, and workspace settings.</p>
        <form onSubmit={submit} className="admin-login-form">
          <label>Email<input name="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error ? <p className="admin-form-error" role="alert">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button>
        </form>
        <Link className="admin-back-link" href="/">← Back to public website</Link>
      </section>
    </main>
  );
}
