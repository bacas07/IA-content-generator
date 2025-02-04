import parameterModel from "../models/parameterModel.js";

class parameterController {

    async find (req, res) {
        try {
            const parameters = await parameterModel.find();
            return res.status(200).json(parameters);    
        } catch (e) {
            return res.status(500).json({ error: 'Error finding all parameters' });
        }
    }

    async findByID () {

    }

    async create () {

    }

    updateByID () {

    }

    deleteByID () {

    }
}