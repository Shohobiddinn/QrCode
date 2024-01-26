import { createStore } from "vuex";
let loading_index = 0;

export default createStore({
    state() {
        return {
            loading: false,
        }
    },
    mutations: {
        setLoading(state, loading) {
            if (loading == true) {
                state.loading = loading;
                loading_index++;
            } else if (loading == false) {
                loading_index--;
                if (!loading_index) state.loading = loading;
            } else {
                state.loading = false;
            }
        },
    },
    actions: {
        setUser(ctx, user) {
            ctx.commit("setUser", user);
        },
        setLoading(ctx, loading) {
            ctx.commit("setLoading", loading);
        },
    },
    getters:{
        loading(state) {
            return state.loading;
          },
    }

});
