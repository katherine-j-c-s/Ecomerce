const { Visit } = require("./db")


const incrementVisit = async (req, res, next) => {
    const clientIpAddress = String(req.headers["x-forwarded-for"] || req.connection.remoteAddress);
    await Visit.findOrCreate({
        where: {ip: clientIpAddress},
        defaults: {
            ip: clientIpAddress
        }
    })

    next()
}

module.exports = incrementVisit