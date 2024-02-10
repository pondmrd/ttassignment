import { createStore, combineReducers } from "redux";

const initialOpenModal = false;
const initialMode = null;

const openModalReducer = (state = initialOpenModal, action) => {
  switch (action.type) {
    case "OPEN":
      return (state = true);
    case "CLOSE":
      return (state = false);
    default:
      return state;
  }
};

const modeReducer = (state = initialMode, action) => {
  switch (action.type) {
    case "ADD":
      return (state = "ADD");
    case "EDIT":
      return (state = "EDIT");
    case "NULL":
      return (state = null);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  openModal: openModalReducer,
  mode: modeReducer,
});

const store = createStore(rootReducer);

export default store;
