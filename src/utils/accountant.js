import userModel from "../models/userModel.js";
import parameterModel from "../models/parameterModel.js";

export const parameterAccountant = async (user_id) => {
    try {
        const user = await userModel.findById(user_id);

        if (!user) {
            throw new Error('User not found');
        }

        var parameters_created = user.parameters_created;
        parameters_created += 1;

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

        var user_content_created = user.content_created;
        user_content_created += 1;

        const userAccountant = userModel.updateById(user_id, { content_created: user_content_created });
        
        const parameter = await parameterModel.findById(parameter_id);

        if (!parameter) {
            throw new Error('Parameter not found');
        }

        var parameter_content_created = parameter.content_created;
        parameter_content_created += 1;

        const parameterAccountant = parameterModel.updateById(parameter_id, { content_created: parameter_content_created })

        if (!userAccountant || !parameterAccountant) {
            return null;
        }

        return { userAccountant, parameterAccountant };
    } catch (e) {
        console.error('error: ', e);
        return null
    }
}