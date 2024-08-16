import serviceModel from "../models/serviceModel.js";
import multer from 'multer';
import cloudinary from 'cloudinary';

// Configure multer for memory storage for images`````````
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image upload
const uploadMiddleware = upload.single('image');

// Cloudinary configuration (make sure to set up your Cloudinary credentials)
cloudinary.config({
    cloud_name: 'dglrrdx2u',
    api_key: '355391597932723',
    api_secret: '43ob25YR1O2ilJCLBQG5m6MlKJI'
});
``
// to creating services 
export const createService = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }

            const { serviceName, description, price } = req.body;

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Upload image to Cloudinary
            const cloudinaryUpload = new Promise((resolve, reject) => {
                const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
                    {
                        folder: 'services',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                cloudinaryStream.write(req.file.buffer);
                cloudinaryStream.end();
            });

            const cloudinaryResult = await cloudinaryUpload;

            const image = cloudinaryResult.secure_url;

            // Create service with image URL
            const service = await serviceModel.create({
                serviceName,
                description,
                price,
                image
            });
            await service.save();

            res.status(201).json({ message: 'Service created successfully', service });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};


// to get all services 
export const getAllService = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const services = await serviceModel.find();
        res.json({ services });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// to get one service by its id 
export const getServiceById = async (req, res) => {
    try {
        if (!req.user ) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const param = req.params.id;
        const service = await serviceModel.findById(param);
        if (!service) {
            return res.status(404).json({ msg: "no services were with the given id" })
        };
        res.status(200).json({ service });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// to update the service by using its id
export const updateService = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }

            const param = req.params.id;
            const { serviceName, description, price } = req.body;

            // Find the existing service
            const service = await serviceModel.findById(param);
            if (!service) {
                return res.status(404).json({ msg: "Service not found" });
            }

            let image = service.image; // Retain existing image URL if no new image is uploaded

            if (req.file) {
                // Upload new image to Cloudinary
                const cloudinaryUpload = new Promise((resolve, reject) => {
                    const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
                        {
                            folder: 'services',
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    cloudinaryStream.write(req.file.buffer);
                    cloudinaryStream.end();
                });

                const cloudinaryResult = await cloudinaryUpload;
                image = cloudinaryResult.secure_url; // Update image URL
            }

            // Update the service with new data
            const updatedService = await serviceModel.findByIdAndUpdate(
                param,
                { serviceName, description, price, image },
                { new: true }
            );

            res.status(200).json({ message: "Service updated successfully", updatedService });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

// to delete the service by its id 
export const deleteService = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const param = req.params.id;
        const removeService = await serviceModel.findByIdAndDelete(param);
        res.status(200).json({ msg: "service deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};