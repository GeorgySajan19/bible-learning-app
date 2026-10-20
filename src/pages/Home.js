import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DAILY_VERSES = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ref: "John 3:16"
  },
  {
    text: "I can do all this through him who gives me strength.",
    ref: "Philippians 4:13"
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    ref: "Proverbs 3:5"
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    ref: "Psalm 23:1"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    ref: "Joshua 1:9"
  }
];

export default function Home() {
  const { user } = useAuth();
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    const day = new Date().getDate() % DAILY_VERSES.length;
    setVerse(DAILY_VERSES[day]);
  }, []);

  return (
    <div className="home">
      <h1>Bible Learn</h1>
      <p className="subtitle">Grow deeper in the Word, one chapter at a time</p>

      {verse && (
        <div className="daily-verse">
          <h3>✦ Verse of the Day</h3>
          <p className="verse-text">"{verse.text}"</p>
          <p className="verse-ref">— {verse.ref}</p>
        </div>
      )}

      <div className="cta">
        {user ? (
          <Link to="/bible" className="btn primary">
            Continue Reading →
          </Link>
        ) : (
          <Link to="/signup" className="btn primary">
            Start Your Journey →
          </Link>
        )}
      </div>
    </div>
  );
}