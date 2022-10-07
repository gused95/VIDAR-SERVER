const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
    {
      title: {
        type: String,
        // unique: true -> Ideally, should be unique, but its up to you
      },
      description: {
        type: String,
      },
      
      pickLocation: {
        type: String,
      },
      pickSchedule: {
        type: String,
      },
      postUntil: {
        type: Number,
      },
      collecType: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Collection = model("Collection", collectionSchema);

module.exports = Collection;