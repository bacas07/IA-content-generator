import mongoose from "mongoose";

const parameterSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // Agregamos un índice para mejorar las consultas
        },
        category: {
            type: String,
            required: true,
            trim: true, // Elimina espacios innecesarios en la cadena
            enum: ["SEO", "Marketing", "Technology", "Other"], // Opcional: Restringe a valores predefinidos
        },
        keywords: {
            type: [String],
            default: [], // Evita valores undefined en caso de que no se envíen keywords
            validate: {
                validator: function (keywords) {
                    return keywords.length > 0; // Asegura que haya al menos una palabra clave
                },
                message: "Debe incluir al menos una palabra clave.",
            },
        },
        length: {
            type: Number,
            required: true,
            min: [50, "La longitud mínima permitida es 50."], // Define un mínimo
            max: [5000, "La longitud máxima permitida es 5000."], // Define un máximo
        },
    },
    {
        timestamps: true, 
        versionKey: false, // Evita el campo __v en los documentos
    }
);

// Convertir el esquema a JSON eliminando datos sensibles o innecesarios
parameterSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret._id;
        return ret;
    },
});

const Parameter = mongoose.model("Parameter", parameterSchema);
export default Parameter;
