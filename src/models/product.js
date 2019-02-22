
    const Product = sequelize.define('product', {
        refference: {
            type: DataTypes.STRING,
            require: true,
        },
        name: {
            type: DataTypes.STRING,
            require: true,
        },
        price: {
            type: DataTypes.STRING,
            require: true,
        },
        lastParsed: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW.
        },
        image: {
            type: DataTypes.STRING,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
    Product.associate = models => {
        Product.belongsTO(models.Category);
    };




module.exports = Product;