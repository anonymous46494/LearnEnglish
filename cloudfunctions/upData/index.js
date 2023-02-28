// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
// 云函数入口函数
exports.main = async (event) => {
  var time=event.time
  var id=event.id
  return await db.collection('userData').doc(id).update({
    data: {
      register_Date: time
    }
  })
}