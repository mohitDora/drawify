const express = require("express");
const Board = require("../models/board");
const User = require("../models/user");

const router = express.Router();

// Create a new board
router.post("/", async (req, res) => {
  try {
    const { title, createdBy, users } = req.body;

    if (!title || !createdBy) {
      return res.status(400).json({ error: 'Title and createdBy are required' });
    }

    const board = new Board({
      title,
      createdBy,
      users: users || []  // Default to an empty array if no users provided
    });
    await board.save();

    res.status(201).json(board);
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Get all boards
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const boards = await Board.find({
      $or: [{ createdBy: uid }, { users: { $in: [uid] } }],
    });

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a user to a board
router.post("/:boardId/addUser", async (req, res) => {
  try {
    const { userId } = req.body;
    const board = await Board.findById(req.params.boardId);

    if (!board) return res.status(404).json({ error: "Board not found" });

    if (!board.users.includes(userId)) {
      board.users.push(userId);
      await board.save();
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a board by ID
router.get("/board/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const board = await Board.findById(req.params.id)
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params; 
      const {data,width,height}=req.body
      const board = await Board.findByIdAndUpdate(id,{ $set: { data: data,width:width,height:height }});
      if (!board) return res.status(404).json({ error: 'Board not found' });
      res.status(200).json(board);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
