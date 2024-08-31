const  { Schema, model, models } = require("mongoose");
const slugify = require("slugify");

const topicsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'category title is required'],
  },
  content: {
    type: String,
    required: [true, 'category sub title is required'],
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
  forumCategory: {
    type: Schema.Types.ObjectId,
    ref:'Category'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
}, { timestamps: true });

// Pre-save hook to generate slug
topicsSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Topics = models?.Topics || model("Topics", topicsSchema);

module.exports = Topics;