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

    async create (req, res) {
        try {
            const { category, keywords, length } = req.body;
            const userID = req.user.id;

            if (!category || !keywords || !length) {
                return res.status(400).json({ error: 'All fields are required' })
            }
            
            const parameter = await parameterModel.create({
                userID,
                category,
                keywords,
                length
            });

            return res.status(201).json({ message: 'Parameter created' });
        } catch (e) {
            return res.status(500).json({ error: 'Error creating parameter' });
        }
    }

    updateByID () {

    }

    deleteByID () {

    }
}

export default new parameterController();