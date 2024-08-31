const {Schema,model,models} = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username:{
    type:String,
    required:[true,"username is required"]
  },
  avatar:String,
  email:{
    type:String,
    required:[true,"email is required"],
    lowercase:true,
    unique:true
  },
  name:{
    type:String,
    required:[true,"name is required"]
  },
  password:{
    type:String,
    required:[true,"password is required"],
    minLength:[6,"min length 6 characters"],
    maxLength:[32,"max length 32 characters"]
  },
  role:{
    type:String,
    enum:['guest','admin','instructor'],
    default:'guest'
  },
  info:String,
  createdAt:{
    type:Date,
    default:Date.now
  },
},{timestamps:true})


UserSchema.pre("save",async function(next){
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (err) {
    return next(err);
  }
});

const User = models?.User || model("User",UserSchema);



module.exports = User;