import actions from "../../actions/student/saction-constants";

let initState = {
    login:false
};

const studentReducer = (state=initState,action) =>
{
    switch(action.type)
    {
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                login:true
            }
        case actions.LOGIN_FAILED:
            return{
                ...state,
                user : action.payload,
                login:false
            }
        case actions.LOGOUT_SUCCESS:
            return{
                login:false
            }
        case actions.SIGNUP_SUCCESS:
            return{
                ...state,
                user : action.payload,
                login : true,
                message : "success"
            }
        case actions.SIGNUP_FAILED:
            return{
                ...state,
                message : action.payload.message,
                login:false
            }
        // case actions.COURSES_FETCH_SUCCESS:
        //     return{
        //         ...state,
        //         contacts : action.payload.contacts
        //     }
        // case actions.COURSES_FETCH_FAILED:
        //     return {
        //         ...state,
        //         contacts : null,
        //         message : "contacts fetch failed"
        //     }
        default:
            return state;
    }
}

export default studentReducer;