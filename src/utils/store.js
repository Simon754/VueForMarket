import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  itemsList:[
    {
      itemid: '',
      itemname: '',
      itemprice: '',
      itemstatus: '',
      iteminfo: '',
      itempic: '',
      userid: ''
    }
  ],
  user:[
    {
      userid: '',
      username: '',
      userpwd: '',
      userauth: ''
    }
  ],
  recordsList:[{
    recordid: '',
    sellerid: '',
    buyerid: '',
    itemid:''
  }]
};
const mutations={
  setItemsList(state,list){
    state.itemsList=list;
  },
  setUser(state,user){
    state.user=user
  },
  setRecordsList(state,list){
    state.recordsList=list
  },
  addRecord(state,record){
    state.recordsList.push(record)
  },
  addItem(state,item){
    state.itemsList.push(item)
  },
  deleteItem(state,item) {
    state.itemsList.map((v,i)=> {
      if(v.itemid === item.itemid){
        state.itemsList.splice(i,1)
      }
    })
  },
  updateItem(state,item){
    state.itemsList.map((v,i)=>{
      if(v.itemid===item.itemid){
        if(item.itemstatus!=null){
          state.itemsList[i].itemstatus=item.itemstatus;
        }
        if(item.itemstatus!=null){
          state.itemsList[i].iteminfo=item.iteminfo;
        }
      }
    })
  }
};
const actions={
  add_item({commit},item){
    commit('addItem',item)
  },
  add_record({commit},record){
    commit('addRecord',record)
  },
  delete_item({commit},item){
    commit('deleteItem',item)
  },
  update_item({commit},item){
    commit('updateItem',item)
  },
  set_list({commit},list){
    commit('setItemsList',list)
  },
  set_user({commit},user){
    commit('setUser',user)
  },
  set_records({commit},list){
    commit('setRecordsList',list)
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions
})
