import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


// Disable Next.js's built-in body parser
export const config = {
    api: {
        bodyParser: false,
    },
};


const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ error: 'Error parsing the files' });
        }
        // Assume the file input field is named "file"
        const file = files.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }


        // Handle case when file is an array
        const filePath = Array.isArray(file)
            ? ((file[0] as any).filepath || (file[0] as any).path)
            : ((file as any).filepath || (file as any).path);

        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'e-store/products',
            });
            return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.status(500).json({ error: 'Error uploading file to Cloudinary' });
        }
    });
};

export default uploadHandler;
