import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tecnico = sequelize.define("Tecnico",{
    id_tecnico:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    especialidadde:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    tableName: "Tecnico"
});

export default Tecnico;