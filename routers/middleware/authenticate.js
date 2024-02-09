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
            if (err) {
                // If no JWT present, return 401.
                res.status(401).json({ message: "Not allowed", Error: err });
            } else {
                // Token validated, proceed.
                next();
            }
        });
    } else {
        // No JWT present.
        res.status(401).json({ message: "No JWT" });
    }
};

