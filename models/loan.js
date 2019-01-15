module.exports = (sequelize, DataTypes) => {
    const loan = sequelize.define('loan', {
        bankName: {
            type: DataTypes.STRING
        },
        loanNumber: {
            type: DataTypes.BIGINT
        },
        amount: {
            type: DataTypes.FLOAT
        },
        balance: {
            type: DataTypes.FLOAT
        },
        partialPayments: {
            type: DataTypes.FLOAT
        },
        openingDate: {
            type: DataTypes.DATE
        },
        dueDate: {
            type: DataTypes.DATE
        },
        project: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, 
    {
        tableName: 'loan'
    })

    loan.associate = (models) => {
        loan.belongsToMany(models.note, {
            through: 'loanNotes',
            foreignKey: 'loanId',
            otherKey: 'noteId',
            as: 'notes',
          })
    }

    sequelize.sync()
    return loan
}