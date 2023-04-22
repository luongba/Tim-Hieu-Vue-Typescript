import Quiz from "@/types/Quiz";
import quiz from "@/data/quiz.json";
export default {
  namespaced: true,
  state: (): State => ({
    search: "",
    quizes: quiz,
  }),

  mutations: {
    Set(state: any, { key, data }: { key: string; data: any }) {
      state[key] = data;
    },
    Unset(state: any, { key }: { key: string }) {
      delete state[key];
    },
    SEARCH(state: State) {
      state.quizes = quiz.filter((item) =>
        item.name
          .toLowerCase()
          .trim()
          .includes(state.search.toLocaleLowerCase())
      );
    },
  },

  actions: {
    searchAction: ({ commit }: any): void => {
      commit("SEARCH");
    },
  },
};

interface State {
  search: string;
  quizes: Quiz[];
}

function set(store: any, key: string, data: any) {
  store.commit("Set", {
    key: key,
    data: data,
  });
}
