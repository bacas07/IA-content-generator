import parameterModel from "../models/parameterModel.js";
import { parameterAccountant } from "../utils/accountant.js";
import { validateCategory } from "../utils/auth.js";

class parameterController {

    async find (req, res) {
        try {
            const parameters = await parameterModel.find();
            return res.status(200).json(parameters);    
        } catch (e) {
            console.error('Error: ', e);
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
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding parameter' });
        }
    }

    async findUnactive (req, res) {
            try {
                const parameters = await parameterModel.findUnactive();
                return res.status(200).json(parameters);
            } catch (e) {
                console.error('Error: ', e);
                return res.status(500).json({ error: 'Error finding all unactivated parameters' });
            }
        }

    async findByUserID (req, res) {
        try {
            const { id } = req.params;
            const parameters = await parameterModel.findByUserID(id);

            if (!parameters) {
                return res.status(404).json({ error: 'Parameters not found for this user' });
            }

            return res.status(200).json(parameters);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding parameters' });
        }
    }

    async findByCategory (req, res) {
        try {
            const { category } = req.params;
            const parameters = await parameterModel.findByCategory(category);

            if (!parameters.length) {
                return res.status(404).json({ error: 'No parameters found for this category' });
            }

            return res.status(200).json(parameters);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding parameters' });
        }
    }

    async create (req, res) {
        try {
            const { category, keywords, length } = req.body;
            const userID = req.user.id;

            if (!category || !keywords || !length) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const validatingCategory = await validateCategory(category);
            
            if (!validatingCategory) {
                return res.status(400).json({ error: 'Category doesnt exist' });
            }
            
            const parameter = await parameterModel.create({
                userID,
                category,
                keywords,
                length
            });

            if (!parameter) {
                return res.status(500).json({ error: 'Error creating parameters' });
            }

            const accountant = await parameterAccountant(req.user.id);

            if (!accountant) {
                return res.status(500).json({ error: 'Error updating parameter accountant' });
            }

            return res.status(201).json(parameter);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error creating parameter' });
        }
    }

    async updateByID (req, res) {
        try {
            const { id } = req.params;
            const updated_parameter = await parameterModel.updateById(id, req.body);

            if (!updated_parameter) {
                return res.status(404).json({ error: 'Parameter not found' });
            }

            return res.status(201).json({ message: 'Parameter updated' });
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error updating parameter' });
        }
    }

    async deleteByID (req, res) {
        try {
            const { id } =  req.params;
            const deleted_parameter =  await parameterModel.deleteById(id);

            if (!deleted_parameter) {
                return res.status(404).json({ error: 'Parameter not found' });
            }

            return res.status(204).json({ message: 'Parameter deleted' });
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error deleting parameter' });
        }
    }
}

export default new parameterController();