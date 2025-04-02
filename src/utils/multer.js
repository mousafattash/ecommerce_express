import e from 'express';
import multer from 'multer';

export const fileValidation = {
    image:['image/jpeg', 'image/jpg', 'image/png', 'image/gif','image/webp'],
    pdf:['application/pdf'],
    docx:['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    excel:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
}
function fileUpload(customValidation=[]) {
    const storage =multer.diskStorage({});

    function fileFilter(req, file, cb) {
        if(customValidation.includes(file.mimetype)){
            cb(null, true);
        }
        else{
                cb(new Error('Invalid file type'), false);
            }
    }
    const upload = multer({fileFilter, storage:storage});
    return upload;
}

export default fileUpload;
