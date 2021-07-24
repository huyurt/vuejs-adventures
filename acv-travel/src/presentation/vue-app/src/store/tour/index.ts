import getters from "@/store/tour/getters";
import mutations from "@/store/tour/mutations";
import state from "@/store/tour/state";
import * as actions from "./actions";

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
};