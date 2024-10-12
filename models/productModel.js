import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Reagent', 'Quality Control', 'Calibrator'],
        required: true
    },
},
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
