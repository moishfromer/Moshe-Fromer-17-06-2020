import * as Actions from './actions';

const initialState = {
    messagePending : false
};

const mailsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.MESSAGE_PENDING:
            {
                console.log(2)
                return{
                    ...state,
                    messagePending: true
                }
            }
            case Actions.SEND_MESSAGE:
            {
                return{
                    ...state,
                    messagePending: false
                }
            }
            case Actions.MESSAGE_FAIL:
            {
                return{
                    ...state,
                    messagePending: false
                }
            }
        default:
            return state;
    }
};

export default mailsReducer;
