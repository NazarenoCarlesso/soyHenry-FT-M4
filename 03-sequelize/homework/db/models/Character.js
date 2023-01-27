const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
      validate: {
        isHenry(value) {
          if(value.toLowerCase() === 'henry') throw new Error('Henry is not allowed.')
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notIn: [['Henry', 'SoyHenry', 'Soy Henry']]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        const rawValue = this.getDataValue('age');
        return rawValue ? rawValue + ' years old' : null
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  },
    {
      timestamps: false
    })
}