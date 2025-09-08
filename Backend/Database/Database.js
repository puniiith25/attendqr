import mongoose from 'mongoose'

export const Database = () => {
    mongoose.connect(process.env.MONGODB_LINK).then(() => console.log('DataBase Connected')).catch(() => console.log('Error While connect database'))
} 