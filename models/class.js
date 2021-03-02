'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    freezeTableName: true,
    tableName: 'class'
  });
  Class.associate = function(models) {
    // associations can be defined here
    Class.hasMany(models.Log, {
      foreignKey: 'fk_classId',
      onDelete: 'CASCADE'
    });
  };
  return Class;
};