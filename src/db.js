import mongoose from 'mongoose';

const password = 1234
const connectString = `mongodb+srv://javierjaimesar:${password}@cluster0.goxztea.mongodb.net/mern?retryWrites=true&w=majority`

export const connectDB = async () => {
    try {
        await mongoose.connect(connectString)
        console.log('DB CONNECT');
    } catch (error) {
        console.log(error);
    }
}