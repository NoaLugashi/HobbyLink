"use client";
import { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Failed to register");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            alert("user registered successfully");
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="At least 6 chars" />
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
    );
}