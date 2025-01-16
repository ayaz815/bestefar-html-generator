const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const JSZip = require("jszip");

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup to handle music file uploads_
const upload = multer({ dest: "uploads/" });

// Save form data and MP3 file
app.post("/save-form", upload.single("musicFile"), (req, res) => {
  const { quizName, firmNaming, question, answer } = req.body; // Form data from request body
  const mp3File = req.file; // Uploaded file from multer

  try {
    // Save form data as JSON
    const formData = {
      quizName,
      firmNaming,
      question,
      answer,
      mp3FileName: mp3File ? mp3File.originalname : null, // Save file name if uploaded
      timestamp: new Date().toISOString(),
    };

    const formFilePath = path.join(
      __dirname,
      "./data/forms",
      `${quizName}.json`
    );
    fs.writeFileSync(formFilePath, JSON.stringify(formData, null, 2));

    // Move the uploaded MP3 file to its final location
    if (mp3File) {
      const targetPath = path.join(
        __dirname,
        "./data/musicFiles",
        mp3File.originalname
      );
      fs.renameSync(mp3File.path, targetPath);
    }

    res.send("Form data and MP3 file saved successfully!");
  } catch (error) {
    console.error("Error saving form data and MP3 file:", error);
    res.status(500).send("Failed to save form data and MP3 file.");
  }
});

// ✅ Replace music file in data/musicFiles
// Replace music file dynamically based on page number
app.post("/upload-music/:page", upload.single("musicFile"), (req, res) => {
  const page = parseInt(req.params.page); // Get the page number from the request
  const tempPath = req.file.path;
  console.log(page, tempPath);
  const targetPath = path.join(
    __dirname,
    `../html/data/musicFiles/music${page}.mp3`
  ); // Destination file path

  // Replace the target music file
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.error("Error replacing music file:", err);
      return res.status(500).send("Failed to replace the music file.");
    }
    res.send(`Music file for page ${page} replaced successfully!`);
  });
});

// ✅ Generate a ZIP file containing the entire HTML project
app.get("/download-zip", async (req, res) => {
  const zip = new JSZip();

  // Add index.html
  zip.file(
    "index.html",
    fs.readFileSync(path.join(__dirname, "../html/index.html"))
  );

  // Add entire data folder (musicFiles, forms, etc.)
  const dataFolder = path.join(__dirname, "../html/data");
  const files = fs.readdirSync(dataFolder);

  files.forEach((file) => {
    const filePath = path.join(dataFolder, file);
    if (fs.statSync(filePath).isDirectory()) {
      const subFiles = fs.readdirSync(filePath);
      subFiles.forEach((subFile) => {
        const subFilePath = path.join(filePath, subFile);
        zip.file(`data/${file}/${subFile}`, fs.readFileSync(subFilePath));
      });
    } else {
      zip.file(`data/${file}`, fs.readFileSync(filePath));
    }
  });

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  res.setHeader("Content-Disposition", "attachment; filename=html_project.zip");
  res.setHeader("Content-Type", "application/zip");
  res.send(zipBuffer);
});

// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
