'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    subject: {
      type: DataTypes.STRING,
    },
    attachments: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true,
    tableName: 'log'
  });
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.Class, {
      foreignKey: 'fk_classId',
      onDelete: 'CASCADE'
    });
  };
  return Log;
};