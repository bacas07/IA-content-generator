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

    async findByID (req, res) {
        try {
            const { id } = req.params;
            const parameter = await parameterModel.findById(id);

            if (!parameter) {
                return res.status(404).json({ error: 'Parameter doesnt exist' });
            }

            return res.status(200).json(parameter);
        } catch (e) {
            return res.status(500).json({ error: 'Error finding parameter' });
        }
    }

    async create () {

    }

    updateByID () {

    }

    deleteByID () {

    }
}