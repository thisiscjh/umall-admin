import {requestCateList} from "../../util/request"
const state={
    //列表的数据
    list:[]
}
const mutations={
    //修改list的值
    changeCateList(state,arr){
        state.list=arr;
    }
}
const actions={
    requestList(context){
        requestCateList({istree:true}).then(res=>{
            context.commit("changeCateList",res.data.list)
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