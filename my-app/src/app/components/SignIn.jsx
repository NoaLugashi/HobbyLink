"use client";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "email or password not correct ! plz try again");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            alert("user login successfully");
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
    );
}