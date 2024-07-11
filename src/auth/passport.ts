import * as passportStrategy from "passport-local";
import passport from "passport";
import { findUser } from "./findUser";
import bcrypt from "bcrypt";
import { Express, NextFunction } from "express";
import { USER } from "../types/User";

export function initPassport(app: Express) {
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new passportStrategy.Strategy(
        { usernameField: "username" }, async (username, password, done) => {
            try {
                // return if no username was provided
                if (!username) { done(null, false) }
                const user = await findUser(username)

                // return user object if credentials are verified
                if (user?.username === username && await bcrypt.compare(password, (user.password).toString())) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                done(e);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: USER, done) => {
        const u = findUser(user.username);
        done(null, u);
    });
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.headers.get("user"))
        return next();
    else res.ok;
}