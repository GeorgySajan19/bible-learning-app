
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { fetchBibleChapter } from "../pages/apiBible";

export default function Chapter() {
  const { book, chapter } = useParams();
  const { user } = useAuth();

  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch the actual chapter from API.Bible.
  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setError("");
      setChapterData(null);

      try {
        const data = await fetchBibleChapter(book, chapter);

        if (!cancelled) {
          setChapterData(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Could not load this Bible chapter."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadChapter();

    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  // Load reading progress from Firebase.
  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      setCompleted(false);

      if (!user) return;

      try {
        const ref = doc(db, "progress", user.uid);
        const snap = await getDoc(ref);

        if (!cancelled && snap.exists()) {
          const data = snap.data();
          const key = `${book}-${chapter}`;
          setCompleted(!!data.completed?.[key]);
        }
      } catch (err) {
        console.error("Could not load reading progress:", err);
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, user]);

  // Mark the chapter as completed.
  async function markComplete() {
    if (!user) {
      setError("Please sign in to save your reading progress.");
      return;
    }

    try {
      setSaving(true);

      const ref = doc(db, "progress", user.uid);
      const key = `${book}-${chapter}`;

      // Preserve previously completed chapters.
      const snap = await getDoc(ref);
      const existing = snap.exists() ? snap.data() : {};

      await setDoc(
        ref,
        {
          completed: {
            ...(existing.completed || {}),
            [key]: true,
          },
          lastRead: {
            book,
            chapter: Number(chapter),
            timestamp: new Date(),
          },
        },
        { merge: true }
      );

      setCompleted(true);
    } catch (err) {
      console.error("Could not save progress:", err);
      setError("Unable to save your progress. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="chapter-page">
      <div className="chapter-header">
        <Link to="/bible" className="back">
          ← Back to Books
        </Link>

        <h1>
          {book} {chapter}
        </h1>
      </div>

      <div className="chapter-text">
        {loading && <p>Loading Bible chapter...</p>}

        {error && (
          <p role="alert" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        {!loading && !error && chapterData && (
          <article className="bible-text">
            <h2>{chapterData.reference || `${book} ${chapter}`}</h2>

            <div
              className="chapter-content"
              dangerouslySetInnerHTML={{
                __html: chapterData.content || "",
              }}
            />

            {chapterData.copyright && (
              <p className="bible-copyright">
                {chapterData.copyright}
              </p>
            )}
          </article>
        )}
      </div>

      <div className="chapter-actions">
        <button
          onClick={markComplete}
          className={`btn ${completed ? "completed" : "primary"}`}
          disabled={completed || loading || saving || !!error}
        >
          {saving
            ? "Saving..."
            : completed
              ? "✓ Completed"
              : "Mark as Completed"}
        </button>

        {!user && (
          <p>Sign in to save your reading progress.</p>
        )}
      </div>
    </div>
  );
}
