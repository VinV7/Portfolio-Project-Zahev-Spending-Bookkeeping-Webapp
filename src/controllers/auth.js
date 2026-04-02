// === Imports ===
import { checkUser, checkUserWithUsername, createUser } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import AppError from "../errors/appError.js";

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
            throw new AppError("User with the same email or username already exists", 400);
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUserData = await createUser(email, username, hashedPassword);

        regenerateSessionId(req, res, next, createdUserData, "/dashboard");
    } catch (err) {
        next(err);
    }
};

// === Login Controller ===
const loginAuthentication = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await checkUserWithUsername(username);
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!user || !isPasswordValid) {
            throw new AppError("Invalid Credentials", 401);
        }

        regenerateSessionId(req, res, next, user, "/dashboard");
    } catch (err) {
        next(err);
    }
}

export { createAccount, loginAuthentication}; 