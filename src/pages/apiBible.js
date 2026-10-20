const API_KEY = process.env.REACT_APP_BIBLE_API_KEY;
const BIBLE_ID = process.env.REACT_APP_BIBLE_ID;

const BASE_URL = "https://rest.api.bible/v1";

async function apiRequest(endpoint) {
  if (!API_KEY || !BIBLE_ID) {
    throw new Error(
      "Missing API configuration. Check VITE_BIBLE_API_KEY and VITE_BIBLE_ID in .env."
    );
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`API.Bible request failed (${response.status}).`);
  }

  return response.json();
}

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function fetchBibleChapter(bookName, chapterNumber) {
  // Get books available in the selected translation.
  const booksResult = await apiRequest(
    `/bibles/${BIBLE_ID}/books`
  );

  const books = booksResult.data || [];

  const book = books.find(
    (item) => normalizeName(item.name) === normalizeName(bookName)
  );

  if (!book) {
    throw new Error(
      `${bookName} is not available in the selected Bible translation.`
    );
  }

  // Get valid chapter IDs for the selected book.
  const chaptersResult = await apiRequest(
    `/bibles/${BIBLE_ID}/books/${book.id}/chapters`
  );

  const chapters = chaptersResult.data || [];

  const selectedChapter = chapters.find(
    (item) => Number(item.number) === Number(chapterNumber)
  );

  if (!selectedChapter) {
    throw new Error(
      `Chapter ${chapterNumber} was not found in ${bookName}.`
    );
  }

  // Fetch the actual chapter text.
  const chapterResult = await apiRequest(
    `/bibles/${BIBLE_ID}/chapters/${selectedChapter.id}?content-type=html&include-verse-numbers=true`
  );

  return chapterResult.data;
}
