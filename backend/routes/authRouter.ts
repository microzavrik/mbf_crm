import express, { Request, Response } from "express";
import { registerUser, authenticateUser, getAllUsers } from "../models/userRepository";

const router = express.Router();

router.post("/register", async(req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        if(user) {
            res.status(201).json({message: "User registered sucessfully", user});
        } 
        else {
            res.status(400).json({message: "Registration failed"});
        }
    }
    catch(error) {
        console.error("Error registering user", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.post("/login", async(req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if(user) {
            res.status(200).json({message: "Login sucessful", user});
        } 
        else {
            res.status(401).json({message: "Invalid username or password"});
        }
    }
    catch(error) {
        console.error("Error authenticating user: ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/users", async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

export default router;