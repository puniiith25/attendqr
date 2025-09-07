import mongoose from "mongoose";

const Database = () => {
    mongoose.connect(process.env.DatabaseLink).then(() => console.log('Database Connected')).catch(() => console.log('Database Errorr'))
}

export default Database;