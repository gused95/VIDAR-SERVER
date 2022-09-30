const router = require("express").Router()

//routerl.methodHTTP(path, ()  => {})

router.get("/", (req, res) => {
    res.json({ celulares: [1, 2, 3] })
})

module.exports = router