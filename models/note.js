module.exports = (sequelize, DataTypes) => {
    const note = sequelize.define('note', {
        title: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
    }, 
    {
        tableName: 'note'
    })

    return note
}