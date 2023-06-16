const getAllVisits = require("../controllers/visitsControllers");

const getVisitsHandler = async (req, res) => {
    try {
        const visits = await getAllVisits()
        res.status(200).json(visits)

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = getVisitsHandler