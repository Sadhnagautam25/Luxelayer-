import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      minlength: 2,
    },
    Lastname: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "please use a valid email"],
    },

    // 🔥 IMPORTANT CHANGE
    password: {
      type: String,
      minlength: 6,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },

    // 🔥 NEW FIELD
    googleId: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    firstOrderDiscount: {
      type: Boolean,
      default: true,
    },

    firstOrderDiscountUsed: {
      type: Boolean,
      default: false,
    },

    profile: {
      type: String,
      default:
        "https://ik.imagekit.io/habrddp30/default%20image.avif?updatedAt=1770870508311",
    },
    role: {
      type: String,
      enum: ["user", "seller"], // sirf ye 2 values allowed
      default: "user", // by default buyer
    },
  },
  { timestamps: true },
);

// 🔹 PRE - hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// 🔹 METHOD - compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 POST - just for log (optional tracking)
userSchema.post("save", function (doc) {
  console.log(`New user created: ${doc.email} ✅`);
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
