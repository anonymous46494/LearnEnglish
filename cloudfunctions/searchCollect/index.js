// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var user_id=event.user_id
  var cont=event.word_id
  return await db.collection("userData").where({
    _id:user_id,
    study_Status:{
      Collection:[cont]
    }
 }).get()
}