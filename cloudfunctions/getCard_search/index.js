// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var id=event.id
  return await db.collection("card_list").doc(id).get()
}