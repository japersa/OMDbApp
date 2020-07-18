const initialState = {
  movies: [],
};

const movieReducer = (
  state = initialState,
  action: {type: any; value: any},
) => {
  switch (action.type) {
    case 'UPDATE_MOVIES': {
      return {
        ...state,
        movies: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default movieReducer;
