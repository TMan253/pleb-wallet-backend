const jwt = require("jsonwebtoken");

// Export a middleware function that takes the conventional arguments.
module.exports = (req, res, next) => {
    // Extract the token from the Authorization request header.
    const token = req.headers.authorization;
    // Fetch the secret used to sign the JWT.
    const secret = process.env.JWT_SECRET || "juicy";

    // Check whether a JWT is provided in the request header.
    if(token) {
        // Verify the JWT.
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                // If no JWT present, return 401.
                res.status(401).json({ message: "Not verified" });
            } else {
                // Token validated, so find the username in the database.
                const user = {
                    username: "testUser",
                    password: "juicyboo",
                    adminKey: 21
                }
                // Extract admin key from user object if it exists.
                const adminKey = user?.adminKey?.toString() ?? "";
                // Check whether admin key matches .env file config.
                if (adminKey == process.env.ADMIN_KEY) {
                    // Admin key matches - allow access.
                    next();
                } else {
                    // Admin key does not match.
                    res.status(401).json({ message: "Must be an administrator" });
                }
            }
        });
    } else {
        // No JWT present.
        res.status(401).json({ message: "No JWT" });
    }
};

