import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer();
app.use(cors());

app.post("/api/mapping", upload.any(), (req, res) => {
  const fields = Array.from({ length: 10 }, (_, i) => ({
    sourceField: `Field_${i + 1}`,
    targetField: `/claim/v1/claims.field_${i + 1}`,
    startPosition: `${i * 10 + 1}`,
    endPosition: `${i * 10 + 10}`,
    dataType: `X(10)`,
    transformationNeeded: "no",
    rules: ["Trim whitespace", "Convert flag to boolean"],
  }));

  res.json({
    success: true,
    mapping: {
      success: true,
      data: fields,
    },
  });
});

app.listen(3001, () => console.log("Mock server running on http://localhost:3001"));
