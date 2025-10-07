// Week 1 - MongoDB Data Layer Fundamentals and Advanced Techniques
// Author: Winnie Okoth
// Database: plp_bookstore

// --- Step 1: Create Database ---
use("plp_bookstore");

// --- Step 2: Create Collection and Insert Data ---
db.books.insertMany([
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988 },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-fiction", published_year: 2011 },
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction", published_year: 1965 },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018 },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018 }
]);

// --- Step 3: Basic CRUD Operations ---

// CREATE: Add new book
db.books.insertOne({
  title: "The Power of Habit",
  author: "Charles Duhigg",
  genre: "Self-help",
  published_year: 2012
});

// READ: Display all books
db.books.find().pretty();

// READ: Find books in a specific genre
db.books.find({ genre: "Self-help" }).pretty();

// UPDATE: Update a book's year
db.books.updateOne(
  { title: "Dune" },
  { $set: { published_year: 1966 } }
);

// UPDATE: Mark all self-help books as recommended
db.books.updateMany(
  { genre: "Self-help" },
  { $set: { recommended: true } }
);

// DELETE: Remove one book
db.books.deleteOne({ title: "Educated" });

// DELETE: Remove all Science Fiction books
db.books.deleteMany({ genre: "Science Fiction" });

// READ AGAIN: Show all remaining books
db.books.find().pretty();
