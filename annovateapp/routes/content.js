var express = require('express');
var router = express.Router();

/* GET content listing. */
router.get('/:filename', function(req, res, next) {
    res.sendFile(path.join(__dirname, `../public/content/${req.params['filename']}`));
});

module.exports = router;