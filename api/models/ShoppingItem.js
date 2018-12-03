import mongoose from 'mongoose';

const shoppingItemSchema = new mongoose.Schema({
	id: {
        type: Number
    },
    user_id: {
    	type: Number,
        required: 'user_id attribute is required.'
  	},
  	name: {
    	type: String,
        required: 'Please enter the name of the item.'
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