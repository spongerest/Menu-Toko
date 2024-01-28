const rateLimit = require('express-rate-limit');

// Atur limit request
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // Batasi setiap IP untuk 100 request per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = apiRateLimiter;
