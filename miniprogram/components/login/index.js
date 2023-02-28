
const App = getApp()

const defaults = {
  title: '数据加载中',
  mask: false,
  transitionName: 'wux-animate--fadeInRight',
  step: 'one'
}

Component({
  data: defaults,
  properties: {},
  lifetimes: {
    attached: function () {
      this.page = getCurrentPages()[getCurrentPages().length - 1]
    },
    detached: function(){
    }
  },
  methods: {
    /**
     * 显示
     * @param options
     */

    __enter(opts) {
      const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, this.data, opts))
      this.setData({ ...options, in: true, step: 'one' })
    },

    /**
     * 判断是否是IOS
     * @param opts
     * @returns {boolean}
     * @private
     */

    __hideTabBar(opts, backFn) {
      wx.hideTabBar({
        animation: true,
        success: () => {
          typeof backFn === "function" && backFn(opts)
        }
      })
    },
    /**
     * 关闭
     * @returns {boolean}
     */
    hide(){
      this.setData({ in: false })
    },

    onCancel() {
    },

    /**
     * 微信授权
     * @param e
     */
    getUserInfo(e) {
      if (true) {
        const userInfoInheritFn = this.fns.userInfoInheritFn

        App.user.goLogin({...e.detail.userInfo})
                  .then(res => {

                      if (userInfoInheritFn && typeof userInfoInheritFn === 'function') {
                        userInfoInheritFn()
                      }
                      this.setData({ step: 'two'})
                  })
      }
    },

    /**
     * 电话授权
     * @param e
     */
    getUserPhone(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {

        wx.checkSession({
          success: () => {

            this.fetchPhone({
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv
            })
          },
          fail: () => {
            // 重新执行登录
            App.user.goLogin()
                .then(token => {
                  
                  this.fetchPhone({
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                  })
                })
          }
        })        
      }
    },

    fetchPhone(options) {
      App.user.getPhoneNumber({...options})
          .then(token => {

              const userPhoneInheritFn = this.fns.userPhoneInheritFn
              if (userPhoneInheritFn && typeof userPhoneInheritFn === 'function') {
                userPhoneInheritFn()
              }
              this.hide()
          })
    }
  }
})
