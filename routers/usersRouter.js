const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// GET all users
router.get("/", (req, res) => {
    res.status(200).json({ message: "alive" });
});

// GET user by username
router.get("/user", (req, res) => {
    //const id = req.params.id;

    //console.log(id);

    res.status(200).json({ message: "alive" });
});

// POST a user to register
router.post("/register", (req, res) => {
    const user = req.body;

    console.log(user);

    res.status(201).json({ message: "alive" });
});

// POST a user login
router.post("/login", (req, res) => {
    // Extract the username and password from the request body.
    const {username, password} = req.body;
    const dbUser = {
        username: "testUser",
        password: "juicyboo",
    };

    // Hash the password from the request body using bcrypt.
    const hashedPassword = bcrypt.hashSync(dbUser.password, 14);

    // Check whether the user exists and his password matches.
    if (dbUser && bcrypt.compareSync(password, hashedPassword)) {
        console.log(`Login success:  dbUser`);
        // Generate a JWT for the authenticated user.
        const token = generateToken(dbUser);

        // Send a success response with the JWT and user data.
        res.status(200).json({
            message: `Hello, ${dbUser.username}!`,
            token,
            dbUser,
        });
    } else {
        console.log(`Login failure:  dbUser`);
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// PUT a user to update by ID
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(id, user);
    res.status(200).json({ message: "alive" });
});

// DELETE a user by ID
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({ message: "alive" });
});

// Generate a JWT for the given user.
function generateToken(user) {
    // Define the user data payload to be included in the token.
    const payload = {
        id: user.id,
        username: user.username,
        admin: user.admin,
    };

    // Get the JWT secret from an environment variable, if present.
    const secret = process.env.JWT_SECRET || "hodl";

    // Define JWT options.
    const options = {
        expiresIn: "1d",
    };

    // Generate and return the JWT.
    return jwt.sign(payload, secret, options);
}

module.exports = router;

