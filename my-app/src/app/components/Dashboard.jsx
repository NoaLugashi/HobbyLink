"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useRouter } from "next/navigation"
import Home from "./Home";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState("signin");

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) { setUser(null); return; }

        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Not authenticated");
                const data = await res.json();
                if (!cancelled) setUser({ email: data.user.email });
            } catch {
                if (!cancelled) setUser(null);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    /*useEffect(() => {
        if (user) router.replace("./Home");
    }, [user, router]);*/

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        alert("user signed out!");
    };

    // מחובר → תצוגת משתמש
    if (user) {
        return <Home />;
    }

    // לא מחובר → לנדינג + טפסים
    return (
        <div>
            {user ? (
                <div className="container py-4">
                    <h2 className="mb-3">welcome {user.email}</h2>
                    <button className="btn btn-danger mb-3" onClick={handleSignOut}>Sign Out</button>
                    <div className="alert alert-primary">Main screen placeholder</div>
                </div>
            ) : (
                /* ← רק כאן יש רקע */
                <div className=".bg-sunny">
                    <main className="container py-4" style={{ maxWidth: 560 }}>
                        <h1 className="mb-2 text-center brand-title">HobbyLink</h1>
                        <p className="text-muted mb-3 text-center">Connect by hobbies. Share. Join groups.</p>

                        <ul
                            className="nav nav-pills justify-content-center mb-3"
                            style={mode === "signup" ? { ["--bs-nav-pills-link-active-bg"]: "var(--bs-success)" } : undefined}
                        >
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${mode === "signin" ? "active" : ""} ${mode === "signup" ? "text-success" : ""}`}
                                    onClick={() => setMode("signin")}
                                >Sign In</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${mode === "signup" ? "active" : ""}`}
                                    onClick={() => setMode("signup")}
                                >Sign Up</button>
                            </li>
                        </ul>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                {mode === "signin" ? <SignIn /> : <SignUp />}
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}