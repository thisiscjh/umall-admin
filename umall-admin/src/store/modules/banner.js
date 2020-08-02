import {requestBannerList}from "../../util/request"
const state={
    //列表的数据
    list:[]
}
const mutations={
    //修改list的值
    changeBannerList(state,arr){
        state.list=arr;
    }
}
const actions={
    requestList(context){
        requestBannerList({istree:true}).then(res=>{
            context.commit("changeBannerList",res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}