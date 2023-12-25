// Define the type for your user object
export interface User {
	id: string;
	name: string;
	photoURL: string;
	// Add any other properties as needed
}

// Define the type for your state
export interface AppState {
	user: User | null;
}

// Define the type for your action
export interface SetUserAction {
	type: string; // Change to string
	user: User;
}

export const initialState = {
	user: null,
};


// No need to export actionTypes here
import { actionTypes } from "./actionTypes";

// Define a union type for all possible action types
export type Action = SetUserAction; // Add more action types as needed

// Use the defined types in your reducer function
const reducer = (state: AppState, action: Action): AppState => {
	console.log(action);
	switch (action.type) {
		case actionTypes.SET_USER: // Use string directly
			return {
				...state,
				user: action.user,
			};

		default:
			return state;
	}
};

export default reducer;
