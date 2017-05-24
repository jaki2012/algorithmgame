import Vue from 'vue'

function compare(obj1,obj2){
    var val1 = obj1.score;
    var val2 = obj2.score;
    if (val1 < val2) {
        return 1;
    } else if (val1 > val2) {
        return -1;
    } else {
        return 0;
    } 
}

export default {
    state: {
        users:[]
    },
    mutations: {
        ADD_RECORD: function(state, user) {
            state.users.push(user)
            state.users.sort(compare)
        }  
    },
    actions: {
        addRecord({commit}, user) {
            commit("ADD_RECORD", user)
        },
    }
}