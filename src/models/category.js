const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    url: {
        type: DataTypes.STRING,
        unique: true,
    },
    originalID: {
        type: DataTypes.STRING,
        unique: true,
    },
});
Category.associate = models => { //Задаем как один ко многим (для привязки продуктов);
    Category.hasMany(models.Product, { onDelete: 'CASCADE' }); // Удалит все продукты, в случае удаления категории;
};



module.exports = Category;