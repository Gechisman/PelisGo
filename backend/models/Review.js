import Sequelize from 'sequelize'
import db from '../config/db.js'

const Review = db.define('Review', {
    reviewer_name: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.DECIMAL(3, 1),
        validate: {
            min: 1.0,
            max: 10.0
        }
    },
    comment: {
        type: Sequelize.TEXT
    }
}, {
    tableName: 'reviews',
    timestamps: false
});

export default Review;