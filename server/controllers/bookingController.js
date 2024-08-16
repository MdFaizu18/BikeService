import bookingModel from "../models/bookingModel.js";

// to create a new bookings 
export const createBooking = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const booking = await bookingModel.create(req.body);
    res.status(201).json({ message: "Booking created successfully", booking });
};

// to get the all bookinngs for admin
export const getAllBookings = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const bookings = await bookingModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({ bookings}); //this is bookings
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// to getting booking stats for admin 
export const getBookingStats = async (req, res) => {
    try {
        // Aggregate booking statistics
        const stats = await bookingModel.aggregate([
            {
                $group: {
                    _id: "$status", // Group by the 'status' field
                    count: { $sum: 1 } // Count the number of bookings for each status
                }
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1
                }
            }
        ]);

        // Return the statistics
        res.status(200).json({ stats });
    } catch (err) {
        // Handle any errors
        res.status(500).json({ error: err.message });
    }
};

// to get the own created booking for each user 
export const getOwnBookings = async (req, res) => {
    try{
        if(!req.user){
            return res.status(401).json({message:"You have to login first.."})
        }
        const bookings = await bookingModel.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });;
        res.status(200).json({ bookings });
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }

};

// to get the specific booking by id 
export const getBookingById = async (req, res) => {
    const param = req.params.id;
    const booking = await bookingModel.findById(param);
    if (!booking) {
        return res.status(404).json({ msg: "No booking was found with the given id" });
    }
    res.status(200).json({ booking });
};

// to update the existing booking 
export const updateBooking = async (req, res) => {
    const param = req.params.id;
    const booking = await bookingModel.findByIdAndUpdate(param,
        req.body, { new: true });
    res.status(200).json({ message: "Booking details modified...", booking });
};

// to delete the booking by its id
export const deleteBooking = async (req, res) => {
    const param = req.params.id;
    const removeBooking = await bookingModel.findByIdAndDelete(param);
    res.status(200).json({ msg: "Booking deleted successfully" });
};