import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrdemServico_Material = sequelize.define("OrdemServico_Material", {
    id_os: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_material: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'OrdemServico_Material',
    timestamps: false
});

export default OrdemServico_Material;