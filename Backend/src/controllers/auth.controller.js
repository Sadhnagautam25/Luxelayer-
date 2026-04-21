import redis from "../config/cache.js";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import sendEmail from "../services/email.service.js";
import uploadFile from "../services/storage.service.js";
import genrateToken from "../utils/genrateToken.js";
import jwt from "jsonwebtoken";

export async function registerController(req, res, next) {
  try {
    const { FirstName, Lastname, email, password } = req.body;

    const isAlreadyExists = await userModel.findOne({ email });

    if (isAlreadyExists) {
      const error = new Error("User already exists, try another email");
      error.statusCode = 409;
      return next(error);
    }

    let userProfile;

    if (req.file) {
      const uploaded = await uploadFile({
        buffer: req.file.buffer,
        fileName: "profile",
        folder: "/E-commerce_Platform/userProfiles",
      });

      userProfile = uploaded.url;
    }

    const user = await userModel.create({
      FirstName,
      Lastname,
      email,
      password,
      profile: userProfile || undefined,
    });

    console.log("user created ✅");

    const verificationToken = jwt.sign(
      { email: user.email },
      config.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    const verifyURL = `${config.BASE_URL}/api/auth/verify-email?token=${verificationToken}`;

    console.log("👉 Sending email to:", email);

    // send email
    const result = await sendEmail({
      to: email,
      subject: "Welcome to LuxeLayer ✨ | Verify Your Email",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

  <div style="width:100%;padding:40px 0;">

    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;
                overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">

      <!-- Banner Image -->
      <img src="https://plus.unsplash.com/premium_photo-1760559944817-ae2ae2027be1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           alt="Fashion Banner"
           style="width:100%;height:220px;object-fit:cover;">

      <div style="padding:35px;text-align:center;">

        <h2 style="color:#111;margin-bottom:10px;">
          Welcome to <span style="color:#000;font-weight:bold;">LuxeLayer ✨</span>
        </h2>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Your fashion journey starts here. Premium styles, modern trends,
          and curated collections just for you.
        </p>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Please verify your email address to unlock your account and start shopping.
        </p>

        <!-- CTA Button -->
        <a href="${verifyURL}" 
           style="
             display:inline-block;
             margin-top:25px;
             padding:14px 32px;
             background-color:#000;
             color:#ffffff;
             text-decoration:none;
             border-radius:8px;
             font-weight:bold;
             font-size:15px;
             letter-spacing:0.5px;
             border:1px solid #000;
           ">
           Verify Email
        </a>

        <!-- Product Preview Images -->
        <div style="margin-top:30px;">
          <img src="https://images.unsplash.com/photo-1567769568058-46bf07221c68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0eWxlfGVufDB8fDB8fHww"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxlfGVufDB8fDB8fHww"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://plus.unsplash.com/premium_photo-1706498943489-cbf736374dd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://plus.unsplash.com/premium_photo-1698749257193-e881163207d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D"
          style="width:40%;border-radius:8px;margin:5px;">
        </div>

        <p style="margin-top:30px;color:#888;font-size:13px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

        <p style="font-size:12px;color:#999;">
          © 2026 LuxeLayer. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

    res.status(201).json({
      success: true,
      message: [
        "Registration Successful ✅",
        "Your account has been created successfully.",
        "Please verify your email address to activate your account.",
      ],
      user: {
        FirstName: user.FirstName,
        Lastname: user.Lastname,
        email: user.email,
        profile: user.profile,
        isVerified: user.isVerified,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    // find user 👤
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    // password match

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    // check email verification
    if (!user.isVerified && !user.googleId) {
      const error = new Error(
        "Account not verified. Please verify your email before logging in.",
      );
      error.statusCode = 403;
      return next(error);
    }

    // generate token
    const token = genrateToken(user);

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Login successful ✅",
      user: {
        FirstName: user.FirstName,
        Lastname: user.Lastname,
        email: user.email,
        profile: user.profile,
        isVerified: user.isVerified,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMeController(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfileController(req, res, next) {
  try {
    const userId = req.user.id;

    const { FirstName, Lastname } = req.body;

    // 🔹 Find user
    const user = await userModel.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    // 🔹 Update fields (only allowed ones)
    if (FirstName) user.FirstName = FirstName;
    if (Lastname) user.Lastname = Lastname;

    // 🔹 Profile Image Upload (optional)
    if (req.file) {
      const uploaded = await uploadFile({
        buffer: req.file.buffer,
        fileName: "profile",
        folder: "/E-commerce_Platform/userProfiles",
      });

      user.profile = uploaded.url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully ✅",
      user: {
        FirstName: user.FirstName,
        Lastname: user.Lastname,
        email: user.email, // 🔒 read-only
        profile: user.profile,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req, res, next) {
  const { token } = req.cookies;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString());

  res.status(200).json({
    success: true,
    message: "Logged out successfully ✅",
  });
}

export async function verifyEmailController(req, res, next) {
  try {
    const { token } = req.query;

    // ❌ token missing

    if (!token) {
      return res.redirect(`${config.FRONTEND_URL}/verify-email?invalid=true`);
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      // ❌ expired or invalid token
      return res.redirect(`${config.FRONTEND_URL}/verify-email?expired=true`);
    }

    const user = await userModel.findOne({ email: decoded.email });

    // ❌ user not found
    if (!user) {
      return res.redirect(`${config.FRONTEND_URL}/verify-email?invalid=true`);
    }

    // 👉 already verified
    if (user.isVerified) {
      return res.redirect(`${config.FRONTEND_URL}/verify-email?verified=true`);
    }

    // ✅ verify user
    user.isVerified = true;
    await user.save();
    return res.redirect(`${config.FRONTEND_URL}/verify-email?verified=true`);
  } catch (error) {
    next(error);
  }
}

export async function resendVerificationEmail(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    // 👇 new token (10 min expiry)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const verifyURL = `${config.BASE_URL}/api/auth/verify-email?token=${token}`;

    // 👇 send email
    const result = await sendEmail({
      to: email,
      subject: "Welcome to LuxeLayer ✨ | Verify Your Email",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

  <div style="width:100%;padding:40px 0;">

    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;
                overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">

      <!-- Banner Image -->
      <img src="https://plus.unsplash.com/premium_photo-1760559944817-ae2ae2027be1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           alt="Fashion Banner"
           style="width:100%;height:220px;object-fit:cover;">

      <div style="padding:35px;text-align:center;">

        <h2 style="color:#111;margin-bottom:10px;">
          Welcome to <span style="color:#000;font-weight:bold;">LuxeLayer ✨</span>
        </h2>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Your fashion journey starts here. Premium styles, modern trends,
          and curated collections just for you.
        </p>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Please verify your email address to unlock your account and start shopping.
        </p>

        <!-- CTA Button -->
        <a href="${verifyURL}" 
           style="
             display:inline-block;
             margin-top:25px;
             padding:14px 32px;
             background-color:#000;
             color:#ffffff;
             text-decoration:none;
             border-radius:8px;
             font-weight:bold;
             font-size:15px;
             letter-spacing:0.5px;
             border:1px solid #000;
           ">
           Verify Email
        </a>

        <!-- Product Preview Images -->
        <div style="margin-top:30px;">
          <img src="https://images.unsplash.com/photo-1567769568058-46bf07221c68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0eWxlfGVufDB8fDB8fHww"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxlfGVufDB8fDB8fHww"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://plus.unsplash.com/premium_photo-1706498943489-cbf736374dd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8"
               style="width:40%;border-radius:8px;margin:5px;">
          <img src="https://plus.unsplash.com/premium_photo-1698749257193-e881163207d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D"
          style="width:40%;border-radius:8px;margin:5px;">
        </div>

        <p style="margin-top:30px;color:#888;font-size:13px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

        <p style="font-size:12px;color:#999;">
          © 2026 LuxeLayer. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

    res.json({ success: true, message: "Email resent successfully 📩" });
  } catch (error) {
    res.status(500).json({ message: "Error resending email" });
  }
}

export const authGoogleCallback = async (req, res, next) => {
  try {
    const googleData = req.user;

    if (!googleData) {
      return res.redirect("http://localhost:5173/login?error=google_failed");
    }

    // 🔥 Extract data
    const email = googleData.emails?.[0]?.value;
    const firstName = googleData.name?.givenName;
    const lastName = googleData.name?.familyName;
    const profilePic = googleData.photos?.[0]?.value;

    if (!email) {
      return res.redirect("http://localhost:5173/login?error=no_email");
    }

    // 1️⃣ Check user
    let user = await userModel.findOne({ email });

    if (!user) {
      // 2️⃣ Create user (Google)
      user = await userModel.create({
        FirstName: firstName || "GoogleUser",
        Lastname: lastName || "",
        email,
        googleId: googleData.id, // 🔥 important
        profile: profilePic,
        isVerified: true,
      });

      console.log("New Google user created ✅");
    } else {
      console.log("User already exists → Login ✅");
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 4️⃣ Save token in cookie (🔥 IMPORTANT CONFIG)
    res.cookie("token", token, {
      httpOnly: true, // JS se access nahi hoga (secure)
      secure: config.NODE_ENV === "development", // https only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5️⃣ Redirect
    return res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    next(error);
  }
};
