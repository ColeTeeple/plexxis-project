module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("Employees", {
        name: {type: DataTypes.STRING, allowNull: false},
        code: {type: DataTypes.STRING, allowNull: false},
        profession: {type: DataTypes.STRING, allowNull: false},
        color: {type: DataTypes.STRING, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
        branch: {type: DataTypes.STRING, allowNull: false},
        assigned: {type: DataTypes.BOOLEAN, allowNull: false}
    });
    return Employees;
}