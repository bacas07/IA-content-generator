import userModel from "../models/userModel.js";
import parameterModel from "../models/parameterModel.js";

export const parameterAccountant = async (user_id) => {
    try {
        const user = await userModel.findById(user_id);

        if (!user) {
            throw new Error('User not found');
        }

        user.parameters_created += 1;
        const userAccountant = userModel.updateById(user_id, { parameters_created: parameters_created });

        if (!userAccountant) {
            return null
        }

        return userAccountant;
    } catch (e)  {
        console.error('error: ', e);
        return null;
    }
}

export const contentAccountant = async (user_id, parameter_id) => {
    try {
        const user = await userModel.findById(user_id);
        
        if(!user) {
            throw new Error('User not found');
        }

        user.content_created += 1;
        const userAccountant = userModel.updateById(user_id, { content_created: user.content_created });
        
        const parameter = await parameterModel.findById(parameter_id);

        if (!parameter) {
            throw new Error('Parameter not found');
        }

        parameter.content_created += 1;
        const parameterAccountant = parameterModel(parameter_id, { content_created: parameter.content_created })

        if (!userAccountant || !parameterAccountant) {
            return null;
        }

        return { userAccountant, parameterAccountant };
    } catch (e) {
        console.error('error: ', e);
        return null
    }
}