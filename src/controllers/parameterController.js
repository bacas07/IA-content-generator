import parameterModel from "../models/parameterModel.js";

class ParameterController {
    async find(req, res) {
        try {
            const parameters = await parameterModel.find().lean();
            return res.status(200).json(parameters);
        } catch (error) {
            console.error("Error finding all parameters:", error);
            return res.status(500).json({ error: "Error retrieving parameters" });
        }
    }

    async findByID(req, res) {
        try {
            const { id } = req.params;
            const parameter = await parameterModel.findById(id).lean();

            if (!parameter) {
                return res.status(404).json({ error: "Parameter does not exist" });
            }

            return res.status(200).json(parameter);
        } catch (error) {
            console.error("Error finding parameter by ID:", error);
            return res.status(500).json({ error: "Error retrieving parameter" });
        }
    }

    async findByUserID(req, res) {
        try {
            const { id } = req.params;
            const parameters = await parameterModel.find({ userID: id }).lean();

            if (!parameters.length) {
                return res.status(404).json({ error: "No parameters found for this user" });
            }

            return res.status(200).json(parameters);
        } catch (error) {
            console.error("Error finding parameters by User ID:", error);
            return res.status(500).json({ error: "Error retrieving parameters" });
        }
    }

    async findByCategory(req, res) {
        try {
            const { category } = req.params;
            const parameters = await parameterModel.find({ category }).lean();

            if (!parameters.length) {
                return res.status(404).json({ error: "No parameters found for this category" });
            }

            return res.status(200).json(parameters);
        } catch (error) {
            console.error("Error finding parameters by Category:", error);
            return res.status(500).json({ error: "Error retrieving parameters" });
        }
    }

    async create(req, res) {
        try {
            const { category, keywords, length } = req.body;
            const userID = req.user?.id;

            if (!userID) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            if (!category || !keywords || !length) {
                return res.status(400).json({ error: "All fields are required" });
            }

            await parameterModel.create({ userID, category, keywords, length });

            return res.status(201).json({ message: "Parameter created successfully" });
        } catch (error) {
            console.error("Error creating parameter:", error);
            return res.status(500).json({ error: "Error creating parameter" });
        }
    }

    async updateByID(req, res) {
        try {
            const { id } = req.params;
            const updatedParameter = await parameterModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();

            if (!updatedParameter) {
                return res.status(404).json({ error: "Parameter not found" });
            }

            return res.status(200).json({ message: "Parameter updated successfully" });
        } catch (error) {
            console.error("Error updating parameter:", error);
            return res.status(500).json({ error: "Error updating parameter" });
        }
    }

    async deleteByID(req, res) {
        try {
            const { id } = req.params;
            const deletedParameter = await parameterModel.findByIdAndDelete(id).lean();

            if (!deletedParameter) {
                return res.status(404).json({ error: "Parameter not found" });
            }

            return res.status(204).send();
        } catch (error) {
            console.error("Error deleting parameter:", error);
            return res.status(500).json({ error: "Error deleting parameter" });
        }
    }
}

export default new ParameterController();
