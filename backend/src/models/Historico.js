import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Historico = sequelize.define("Historico", {
    id_historico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_os: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acao: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'Historico',
    timestamps: false
});

export default Historico;