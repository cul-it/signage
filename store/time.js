export const state = () => ({
  now: Date.now()
})

export const mutations = {
  update (state) {
    state.now = Date.now()
  }
}

export const actions = {
  sync ({ commit }) {
    commit('update')
  }
}
