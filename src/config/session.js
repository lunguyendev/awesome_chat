import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

//khởi tạo biến môi trườn
dotenv.config();
//Tạo mongoStrre để lưu session vào database
let mongoDBStrore = MongoDBStore(session);

//Cấu hình sessionStore
let sessionStore = new mongoDBStrore({
    uri: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    collection: 'mySessions',
    autoReconnect: true,
    autoRemove: "native"
});

//Cấu hình session
let config = (app) =>{
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_MYSECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000*60*60*24} // Set thời gian sống cho cookie là 1 ngày
    }));
};
module.exports = {
    config : config,
    sessionStore: sessionStore,
}