import Cliente from "./Cliente.js";
import Usuario from "./Usuario.js";
import Tecnico from "./Tecnico.js";
import OrdemServico from "./OrdemServico.js";
import Material from "./Material.js";
import Historico from "./Historico.js";
import Pagamento from "./Pagamento.js";
import OrdemServico_Material from "./OrdemServico_Material.js";

Cliente.hasMany(OrdemServico, {foreignKey: "id_cliente"});
OrdemServico.belongsTo(Cliente, {foreignKey: "id_cliente"});

Usuario.hasOne(Tecnico, {foreignKey: "id_usuario"});
Tecnico.belongsTo(Usuario, {foreignKey: "id_usuario"});

Tecnico.hasMany(OrdemServico, {foreignKey: "id_tecnico"});
OrdemServico.belongsTo(Tecnico, {foreignKey: "id_tecnico"});

OrdemServico.hasMany(Pagamento, {foreignKey: "id_os"});
Pagamento.belongsTo(OrdemServico, {foreignKey: "id_os"});

OrdemServico.hasMany(Historico, {foreignKey: "id_os"});
Historico.belongsTo(OrdemServico, {foreignKey: "id_os"});

Usuario.hasMany(Historico, {foreignKey: "id_usuario"});
Historico.belongsTo(Usuario, {foreignKey: "id_usuario"});

OrdemServico.belongsToMany(Material, {
    through: OrdemServico_Material,
    foreignKey: "id_os",
    otherKey: "id_material"
});

Material.belongsToMany(OrdemServico, {
    through: OrdemServico_Material,
    foreignKey: "id_material",
    otherKey: "id_os"
});

export {
    Cliente,
    Usuario,
    Tecnico,
    OrdemServico,
    Material,
    Historico,
    Pagamento,
    OrdemServico_Material
};