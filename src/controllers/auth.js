// === Imports ===
import { checkUser, checkUserWithUsername, createUser } from "../model/userModel.js";
import bcrypt from 'bcrypt';

// === Session ID Controller for Authorized Users === 
const regenerateSessionId = (req, res, next, user, redirectPage) => {
    req.session.regenerate((err) => {
      if (err) return next(err);
        
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) return next(err);

        return res.json({
          success: true,
          redirect: redirectPage,
        });
      });
    });
};
// === Create Account Controller ===
const createAccount = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await checkUser(username, email);

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already in use" });
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUserData = await createUser(email, username, hashedPassword);

        regenerateSessionId(req, res, next, createdUserData, "/dashboard");
    } catch (err) {
        console.error("Error creating account:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// === Login Controller ===
const loginAuthentication = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await checkUserWithUsername(username);
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!user || !isPasswordValid) {
            console.log("Invalid Credentials");
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        regenerateSessionId(req, res, next, user, "/dashboard");
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { createAccount, loginAuthentication}; 