import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // check if formatted  or not
        validator: function (v) {
          return /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/i.test(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        // check if formatted  or not
        validator: function (v) {
          const passwordValidator = /^.{4,}$/;
          return passwordValidator.test(v);
        },
        message: "Invalid Password format",
      },
    },
    // accepted: {
    //   type: Boolean,
    //   require: true,
    //   validate: {
    //     // check if accepted or not
    //     validator: function (v) {
    //       return v === true
    //     },
    //     message: "User must accept terms and conditions",
    //   },
    // },
    role: { type: String, enum: ["user"], default: "user" },
  },
  { timestamps: true }
);

// hash password before saving

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error: ", error.message);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const result = await bcryptjs.compare(enteredPassword, this.password);

  return result;
};

const User = mongoose.model("User", userSchema);
export default User;
