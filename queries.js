// Switch to your database

// queries.js - MongoDB CRUD, Advanced Queries, Aggregations, and Indexing

// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" }).pretty();

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } }).pretty();

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" }).pretty();

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// Task 3: Advanced Queries

// 1. Find books in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).pretty();

// 2. Use projection to show only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 3. Sort books by price ascending
db.books.find().sort({ price: 1 });

// 4. Sort books by price descending
db.books.find().sort({ price: -1 });

// 5. Pagination (5 books per page)
db.books.find().skip(0).limit(5);  // Page 1
db.books.find().skip(5).limit(5);  // Page 2

// Task 4: Aggregation Pipelines

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 3. Group books by decade
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      },
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Task 5: Indexing

// 1. Create index on title
db.books.createIndex({ title: 1 });

// 2. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3. Check performance using explain()
db.books.find({ title: "The Hobbit" }).explain("executionStats");
