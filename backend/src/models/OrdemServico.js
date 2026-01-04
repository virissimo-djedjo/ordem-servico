import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrdemServico = sequelize.define("OrdemServico",{
    id_os:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_abertura:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    data_fechamento:{
        type: DataTypes.DATE,
        allowNull: true
    },
     status:{
        type: DataTypes.ENUM("ABERTA", "EM_ANDAMENTO", "FINALIZADA", "CANCELADA"),
        allowNull: false
     },
     descricao_problema:{
        type: DataTypes.TEXT,
        allowNull: false
     },
     valor_total:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
     },
     
},{
    tableName: "OrdemServico",
    timestamps: false
});

export default OrdemServico;