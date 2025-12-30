import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Usuario = sequelize.define("Usuario",{
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    perfil:{
        type: DataTypes.ENUM("ADMIN", "ATENDENTE", "TECNICO"),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM("ATIVO", "INATIVO"),
        allowNull: false,
        defaultValue: "ATIVO"
    },  
},{
    tableName: "Usuario",
    timestamps: false
});

export default Usuario;