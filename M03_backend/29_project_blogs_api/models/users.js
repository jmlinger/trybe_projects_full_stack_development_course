module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, 
  { timestamps: false });

  // seria necessário fazer essa associação caso houvesse aqui uma chave com blogposts.
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'blogposts' });
  };

  return Users;
};
