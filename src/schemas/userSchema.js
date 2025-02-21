import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Por favor, usa un correo válido"], // Validación de email
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Fuerza una longitud mínima
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// 🔒 Middleware para Hashear Contraseña Antes de Guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔄 Métodos del Esquema
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// 🚀 Transformación de JSON para ocultar datos sensibles
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Convierte _id a id
    delete ret._id;
    delete ret.__v;
    delete ret.password; // 🔒 Elimina la contraseña del response
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
export default User;
