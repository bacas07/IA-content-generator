import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // 🔹 Agregamos índice para mejorar el rendimiento en consultas
        },
        parameterID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parameter",
            required: true,
            index: true, // 🔹 Índice para acelerar las búsquedas relacionadas
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["SEO", "Marketing", "Technology", "Other"], // 🔹 Opcional: restringe valores permitidos
        },
        title: {
            type: String,
            required: true,
            trim: true, // 🔹 Elimina espacios innecesarios
            maxlength: [150, "El título no puede superar los 150 caracteres."], // 🔹 Límite de caracteres
        },
        body: {
            type: String,
            required: true,
            trim: true,
            minlength: [50, "El cuerpo debe tener al menos 50 caracteres."], // 🔹 Validación de contenido mínimo
        },
    },
    {
        timestamps: true,
        versionKey: false, // 🔹 Eliminamos el campo __v
    }
);

// 🔹 Convertir a JSON eliminando datos innecesarios
contentSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret._id;
        return ret;
    },
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
