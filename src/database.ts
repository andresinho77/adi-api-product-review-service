import  mongoose from "mongoose";


mongoose.connect('mongodb://database/adidas',{
})
.then(db=> console.log('Database is connected',db.connection.host))
.catch(err=> console.log(err));

export default mongoose;