import mongoose from 'mongoose';
// import timestamps from 'mongoose-timestamp';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required!'],
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password needs to be longer!']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });

// userSchema.plugin(timestamps);

export default mongoose.model('User', userSchema, 'users');