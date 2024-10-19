import bcrypt from 'bcryptjs';
import { User } from "../model/user.js";

async function handlerUserSignUp(req, res) {
    try {
        const { username,email, password } = req.body;
           const loweremail=email.toLowerCase();
        
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password);

        // Create a new user in the database
        const newUser = await User.create({
            username,
            email:loweremail,
            password: hashedPassword,
        });

        // Respond with the created user data (excluding the password)
        res.status(201).json({message:"user signed up successfully"}); 

    } catch (err) {
        // Handle errors, such as duplicate email or username
        res.status(200).json({ message: "User already exists" });
    }
};


async function handlerUserlogin(req, res) {
    try {
        

        // Convert email to lowercase for case-insensitive comparison
        const normalizedEmail = req.body.email.toLowerCase();

        // Find the user by email
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
           
            return res.status(400).json({ message: "Please Sign up First" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password); // Await the bcrypt comparison
        if (!isPasswordValid) {
            
            return res.status(400).json({ message: "Wrong Password" });
        }

 
return res.status(200).json(user._id);

    } catch (err) {
        console.error('Error during login:', err); // More descriptive logging
        return res.status(500).json({ message: "Server error, please try again" });
    }
}

export { handlerUserSignUp, handlerUserlogin};
