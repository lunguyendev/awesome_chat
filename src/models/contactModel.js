import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema(
    {
        userId : String,
        contactId: String,
        status: {type: Boolean, default: false},
        createAt: {type: Number, default: Date.now},
        updateAt: {type: Number, default: null},
        deleteAt: {type: Number, default: null}
    }
)


ContactSchema.statics = {
    createItem(item){
        return this.create(item);
    },
    //Tìm kiếm tất cả các bản ghi liên quan đến UserID
    findAllByUser(userId){
        return this.find({
            $or: [
                {"userId":userId},
                {"contactId":userId}
            ]
        }).exec();
    },
    //Kiểm tra xem 2 id đã kết bạn với nhau hay chưa
    checkExists(userId,contactId){
        return this.findOne({
            $or:
            [
                {$and: [//Mình đã kết bạn với thằng kia hay chưa
                    {"userId": userId},
                    {"contactId": contactId}
                ]},
                {$and: [//Thằng kia nó kết bạn với mình
                    {"userId": contactId},
                    {"contactId":userId}
                ]}
            ]
        }).exec();
    },
    //Xóa liên lạc của 2 người
    removeRequestContact(userId, contactId){
        return this.remove({
            $and:[
                {"userId": userId},
                {"contactId": contactId}
            ]
        }).exec();
    }
};


module.exports = mongoose.model("contact", ContactSchema);