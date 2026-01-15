import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tecnico = sequelize.define("Tecnico",{
    id_tecnico:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    especialidade:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    tableName: "Tecnico",
    timestamps: false
});

export default Tecnico;