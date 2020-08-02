import {requestMenuList} from "../../util/request"
const state={
    //列表的数据
    list:[]
}
const mutations={
    //修改list的值
    changeMenuList(state,arr){
        state.list=arr;
    }
}
const actions={
    requestList(context){
        
        requestMenuList({istree:true}).then(res=>{
            context.commit("changeMenuList",res.data.list)
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