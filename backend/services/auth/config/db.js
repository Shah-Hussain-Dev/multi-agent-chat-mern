import mongoose from "mongoose"


// Database connection 
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "multiagent",
        })
        console.log(`MongoDB is connected: ${connect.connection.host}`)
    } catch (error) {
        console.log("Error:", error)
    }
}



export default connectDB;