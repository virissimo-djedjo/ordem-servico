import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pagamento = sequelize.define("Pagamento", {
    id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_os: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.ENUM('DINHEIRO', 'CARTAO', 'PIX', 'TRANSFERENCIA'),
        allowNull: false
    },
    valor_pago: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Pagamento',
    timestamps: false
});

export default Pagamento;