export default {
    actions: {
        changeBgColor({commit}) {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
                document.body.style.backgroundColor = "#" + randomColor;
                color.innerHTML = "#" + randomColor;
            commit('divColor', randomColor);
        }
    },
    mutations: {
        divColor(state, randomColor) {
            state.color = randomColor
        }
    },
    state: {
        color: 0
    },
    getters: {
        setColor(state) {
            return state.color
        },
    }
}
