import { choiceService } from '../../Services/Menu/menuChoicesServices';

export const menuChoice = {
    namespaced: true,
    state: {
        choices: [],
    },
    mutations: {
        ADD_CHOICE(state, choice) {
            state.choices.push(choice);
        },
        UPDATE_CHOICE(state, updatedChoice) {
            const index = state.choices.findIndex(choice => choice.id === updatedChoice.id);
            if (index !== -1) {
                state.choices.splice(index, 1, updatedChoice);
            }
        },
        DELETE_CHOICE(state, choiceId) {
            state.choices = state.choices.filter(choice => choice.id !== choiceId);
        },
        SET_CHOICES(state, choices) {
            state.choices = choices;
        },
    },
    actions: {
        async addChoice({ commit }, choiceData) {
            try {
                const response = await choiceService.createChoice(choiceData);
                commit('ADD_CHOICE', response.data);
                return response.data;
            } catch (error) {
                console.error('Error adding choice:', error);
                throw error;
            }
        },
        async editChoice({ commit }, choiceData) {
            try {
                console.log("edit choice data", choiceData)
                const response = await choiceService.updateChoice(choiceData);
                commit('UPDATE_CHOICE', response.data);
                return response.data;
            } catch (error) {
                console.error('Error editing choice:', error);
                throw error;
            }
        },
        async deleteChoice({ commit }, choiceId) {
            try {
                const response = await choiceService.deleteChoice(choiceId);
                commit('DELETE_CHOICE', choiceId);
                return response.data;
            } catch (error) {
                console.error('Error deleting choice:', error);
                throw error;
            }
        },
        async fetchChoices({ commit }) {
            try {
                const response = await choiceService.getChoices();
                console.log(response.data.data.choice_groups);
                commit('SET_CHOICES', response.data.data.choice_groups);
            } catch (error) {
                console.error('Error fetching choices:', error);
                throw error;
            }
        },
    },
    getters: {
        allChoices: (state) => state.choices,
    },
};
