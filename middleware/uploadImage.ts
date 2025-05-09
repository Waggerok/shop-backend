import multer from 'multer';
import path from 'path';
import fs from 'path'
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "static/");
    },
    filename(req, file, callback) {
        callback(null, uuidv4() + path.extname(file.originalname))
    },
});

const upload = multer({ storage });

export default upload;