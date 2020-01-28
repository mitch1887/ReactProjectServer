module.exports = (sequelize, DataTypes) => {
    const VideoGame = sequelize.define('VideoGame', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return VideoGame;
}