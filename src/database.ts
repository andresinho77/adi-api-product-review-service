import  mongoose from "mongoose";


mongoose.connect('mongodb://127.0.0.1:27017/adidas',{
})
.then(db=> console.log('Database is connected',db.connection.host))
.catch(err=> console.log(err));

export default mongoose;
