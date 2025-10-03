"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);   // תמיד נשמור מערך
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                const res = await fetch("/api/posts/following", {
                    cache: "no-store",
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                // אם השרת מחזיר 401/500 – נטפל יפה ונעצור
                if (!res.ok) {
                    let body;
                    try { body = await res.json(); } catch { /* ignore */ }
                    setErrMsg(body?.error || body?.message || `Request failed: ${res.status}`);
                    setPosts([]);  // לשמור על טיפוס עקבי
                    return;
                }

                const data = await res.json();

                // נרמול לכל פורמט נפוץ
                const arr =
                    Array.isArray(data) ? data :
                        Array.isArray(data?.posts) ? data.posts :
                            Array.isArray(data?.data) ? data.data :
                                [];

                setPosts(arr);
            } catch (err) {
                console.error(err);
                setErrMsg("Network or parse error");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div className="container py-4">טוען…</div>;

    return (
        <div className="container py-4">
            <h2 className="mb-3">Home</h2>

            {errMsg && (
                <div className="alert alert-warning mb-3">
                    {errMsg}
                </div>
            )}

            <button
                className="btn btn-danger"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(); // ירנדר מחדש → יחזיר ל-Dashboard
                }}
            >
                Log Out
            </button>

            {(!posts || posts.length === 0) ? (
                <div className="text-muted">No posts yet.</div>
            ) : (
                posts.map((p) => (
                    <div key={p?._id || p?.id || Math.random()} className="card mb-3">
                        <div className="card-body">
                            <h5 className="mb-1">{p?.title ?? "Untitled"}</h5>
                            <p className="mb-2">{p?.content ?? ""}</p>
                            <small className="text-muted">
                                {(p?.author?.email) ? p.author.email : "Unknown"} •{" "}
                                {p?.createdAt ? new Date(p.createdAt).toLocaleString() : ""}
                            </small>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}