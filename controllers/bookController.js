const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

//createBook
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//getAllBooks
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



//getBookById
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid book ID' });
    }

    
    const book = await Book.findById(id).populate({
      path: 'reviews',
      populate: { path: 'user', select: 'name' }
    });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

   
    const totalRatings = book.reviews.length;
    const averageRating = totalRatings
      ? (book.reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
      : 0;

    
    res.status(200).json({
      success: true,
      averageRating,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book details',
      error: error.message
    });
  }
};

//searchBooks
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') },
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
