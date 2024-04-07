import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

export const checkFile = (file) => {
  if (!file) {
    toast("No file selected!");
    return false;
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 1000000; // 1 MB

  if (file.size > maxSize) {
    toast("File size exceeds the limit (1 MB)!");
    return false;
  }

  if (!allowedTypes.includes(file.type)) {
    toast("Only PNG, JPEG, and JPG files are allowed to upload!");
    return false;
  }

  // Additional check for file extension
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    toast("Invalid file extension! Please upload a PNG, JPEG, or JPG file.");
    return false;
  }

  return true;
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    const targetSize = 560;

    // Get the center coordinates to crop a square portion
    const centerX = Math.floor(file.width / 2);
    const centerY = Math.floor(file.height / 2);

    // Calculate the crop area
    const startX = centerX - Math.floor(targetSize / 2);
    const startY = centerY - Math.floor(targetSize / 2);

    Resizer.imageFileResizer(file, targetSize, targetSize, 'WEBP', 75, 0, (uri) => {
      resolve(uri);
    }, 'file', startX, startY);
  });