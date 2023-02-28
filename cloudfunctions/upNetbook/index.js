// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  var user_id=event.user_id
  var cont=event.cont
  return await db.collection('userData').doc(user_id).update({
    data: {
      study_Status:{
        Collection: _.push(cont),
      }
    }
  })
}