import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function Chapter() {
  const { book, chapter } = useParams();
  const { user } = useAuth();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  // Fetch real Bible text
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError("");

        // Convert book name for the API (example: "1 Samuel" → "1samuel")
        const bookName = book.toLowerCase().replace(/\s+/g, "");
        
        const response = await fetch(
          `https://bible-api.com/${bookName}+${chapter}?translation=kjv`
        );

        if (!response.ok) {
          throw new Error("Chapter not found");
        }

        const data = await response.json();
        setVerses(data.verses || []);
      } catch (err) {
        setError("Sorry, could not load this chapter. Please try another one.");
        setVerses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [book, chapter]);

  // Load progress from Firebase
  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const ref = doc(db, "progress", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const key = `${book}-${chapter}`;
        setCompleted(!!data.completed?.[key]);
      }
    };

    loadProgress();
  }, [book, chapter, user]);

  // Mark chapter as completed
  const markComplete = async () => {
    if (!user) return;

    const ref = doc(db, "progress", user.uid);
    const key = `${book}-${chapter}`;

    await setDoc(
      ref,
      {
        completed: { [key]: true },
        lastRead: {
          book,
          chapter: Number(chapter),
          timestamp: new Date(),
        },
      },
      { merge: true }
    );

    setCompleted(true);
  };

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
        {loading && <p>Loading chapter...</p>}

        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        {!loading && !error && verses.length > 0 && (
          <div>
            {verses.map((verse) => (
              <p key={verse.verse} style={{ marginBottom: "1.1rem" }}>
                <strong style={{ color: "#60a5fa", marginRight: "8px" }}>
                  {verse.verse}
                </strong>
                {verse.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="chapter-actions">
        <button
          onClick={markComplete}
          className={`btn ${completed ? "completed" : "primary"}`}
          disabled={completed || loading}
        >
          {completed ? "✓ Completed" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
}