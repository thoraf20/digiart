import bcrypt from "bcryptjs";
import { sequelize, DataTypes } from "../../dbConfig.js";

export const UserTable = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ethereum_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_type: {
        type: DataTypes.ENUM("ESCROW", "CONSUMER"),
        allowNull: false
      }
    },
    {
      tableName: "users",
      timestamps: false,
      hooks: {
        async beforeCreate(user) {
          try {
            const salt = await bcrypt.genSalt(
              parseInt(process.env.SALT_ROUNDS)
            );

            const hashedPassword = await bcrypt.hash(user.password, salt);

            user.password = hashedPassword;
          } catch (err) {
            throw new Error(`Error in beforeCreate hook: ${err}`);
          }
        }
      }
    }
  );
  return User;
}