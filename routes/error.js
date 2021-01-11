const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
    });
});

module.exports = router;
