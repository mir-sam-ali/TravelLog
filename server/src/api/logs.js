/* eslint-disable quotes */
/* eslint-disable comma-dangle */
const { Router } = require("express");

const router = Router();

const LogEntry = require("../models/LogEntry");

router.get("/", async (req, res, next) => {
  try {
    const allLogs = await LogEntry.find();
    res.json(allLogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newLog = await LogEntry.create(req.body);
    const createdNewLog = await newLog.save();
    res.json(createdNewLog);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
