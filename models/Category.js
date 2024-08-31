const { Schema, model, models } = require("mongoose");
const slugify = require("slugify");

const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'category title is required'],
  },
  subTitle: {
    type: String,
    required: [true, 'category sub title is required'],
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
}, { timestamps: true });

// Pre-save hook to generate slug
categorySchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Category = models?.Category || model("Category", categorySchema);

module.exports = Category;