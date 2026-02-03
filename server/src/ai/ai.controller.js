import { processNaturalQuery } from './ai.service.js';

export const handleNaturalQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { sql, result } = await processNaturalQuery(question);
    res.status(200).json({
      sql,
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err.message,
    });
  }
};
