import Vue from "vue";
import Vuex, {createLogger} from "vuex";
import tourModule from "./tour";

Vue.use(Vuex);
const debug = process.env.NODE_DEV !== "production";
const plugins = debug ? [createLogger({})] : [];
export default new Vuex.Store({
    modules: {
        tourModule,
    },
    plugins,
});
