import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function Profile() {
  const { user, logout } = useAuth();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const ref = doc(db, "progress", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setProgress(snap.data());
    };
    fetch();
  }, [user]);

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <p><strong>Email:</strong> {user?.email}</p>

      {progress?.lastRead && (
        <div className="last-read">
          <h3>Last Read</h3>
          <p>
            {progress.lastRead.book} Chapter {progress.lastRead.chapter}
          </p>
        </div>
      )}

      {progress?.completed && (
        <div className="completed-list">
          <h3>Completed Chapters</h3>
          <ul>
            {Object.keys(progress.completed).map((key) => (
              <li key={key}>{key.replace("-", " ")}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={logout} className="btn danger">
        Logout
      </button>
    </div>
  );
}