import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default:true
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { minimize: false })//by this we could create a empty object field in slot_booked but if we make it true then we could not create the empty object as the field 


const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;