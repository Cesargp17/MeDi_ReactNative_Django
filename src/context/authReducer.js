export const authReducer = ( state = [], action ) => {

    switch (action.type) {
        case 'Login':
            return action.payload;

        case 'Logout':
            return action.payload;

        case 'Check':
            return action.payload;
    
        default:
            return state;
    }
}