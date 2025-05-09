import { DataTypes } from "sequelize";
import {sequelize} from '../database/database';

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false },
    price: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketDevice = sequelize.define('basket_device', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Feedback = sequelize.define('feedback', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false} 
});

const Order = sequelize.define('order', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total_price: {type: DataTypes.FLOAT, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    items : {type: DataTypes.JSON, allowNull: false, defaultValue: []},
});

//Connections

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Basket);
Basket.belongsTo(Order);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

export default { 
    User,
    Product,
    Basket,
    BasketDevice,
    Feedback,
    Order,
}