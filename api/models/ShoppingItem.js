import mongoose from 'mongoose';

const shoppingItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'user_id attribute is required.'
    },
    name: {
        type: String,
        required: 'Please enter the name of the item.',
        minlength: [1, 'Name needs to be longer!'],
        maxlength: [100, 'Name needs to be shorter!']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},
{
    collection: 'items'
});

export default mongoose.model('ShoppingItem', shoppingItemSchema);