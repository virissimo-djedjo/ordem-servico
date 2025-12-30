import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Material = sequelize.define("Material",{
    id_material:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    preco_unitario:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estoque:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    tableName: "Material",
    timestamps: false
});

export default Material;