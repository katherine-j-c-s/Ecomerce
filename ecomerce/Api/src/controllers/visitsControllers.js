const { Visit } = require("../db")

const getAllVisits = async () => {
    let visits = await Visit.findAll()

    return visits
}

module.exports = getAllVisits