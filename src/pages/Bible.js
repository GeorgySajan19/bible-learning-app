import { Link } from "react-router-dom";

const BOOKS = [
  // ========== OLD TESTAMENT (46 Books) ==========
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Tobit", chapters: 14 },          // Deuterocanonical
  { name: "Judith", chapters: 16 },         // Deuterocanonical
  { name: "Esther", chapters: 16 },         // Catholic version has more chapters
  { name: "1 Maccabees", chapters: 16 },    // Deuterocanonical
  { name: "2 Maccabees", chapters: 15 },    // Deuterocanonical
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Wisdom", chapters: 19 },         // Deuterocanonical
  { name: "Sirach", chapters: 51 },         // Deuterocanonical (Ecclesiasticus)
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Baruch", chapters: 6 },          // Deuterocanonical
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 14 },         // Catholic version has more chapters
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },

  // ========== NEW TESTAMENT (27 Books) ==========
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 }
];


export default function Bible() {
  return (
    <div className="bible-page">
      <h1>Holy Bible</h1>
      <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
        Catholic Version • 73 Books
      </p>

      <div className="books-grid">
        {BOOKS.map((book) => (
          <div key={book.name} className="book-card">
            <h3>{book.name}</h3>
            <p>{book.chapters} chapters</p>

            <div className="chapter-links">
              {Array.from(
                { length: book.chapters },
                (_, i) => i + 1
              ).map((chapter) => (
                <Link
                  key={chapter}
                  to={`/bible/${encodeURIComponent(book.name)}/${chapter}`}
                  className="chapter-btn"
                >
                  {chapter}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
