import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Cliente = sequelize.define("Cliente",{
    id_cliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    telefone: DataTypes.STRING(20),
    email: DataTypes.STRING(150),
    endereco: DataTypes.STRING(255)
},{
    tableName: "Cliente"
});

export default Cliente;