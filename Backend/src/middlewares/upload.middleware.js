import multer from "multer";

// 🔹 memory storage (file buffer me aayegi)
const storage = multer.memoryStorage();

// 🔹 optional file filter (sirf images allow)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// 🔹 upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

export default upload;