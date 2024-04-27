import actions from "../../actions/faculty/factions-constants";

let initState = {
    login:false
};

const facultyReducer = (state=initState,action) =>
{
    switch(action.type)
    {
        case actions.EDIT_COURSE_SUCCESS:
            return{
                ...state,
                edit_contact : true
            }
        case actions.EDIT_COURSE_FAILED:
            return{
                ...state,
                edit_contact : false
            }
        case actions.COURSE_DELETE_SUCCESS:
            return{
                ...state,
                delete_contact : true
            }
        case actions.COURSE_DELETE_FAILED:
            return{
                ...state,
                delete_contact : false
            }
        case actions.ADD_COURSE_SUCCESS:
            return{
                ...state,
                contact_add : true
            }
        case actions.ADD_COURSE_FAILED:
            return{
                ...state,
                contact_add: false
            }
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
        case actions.COURSES_FETCH_SUCCESS:
            return{
                ...state,
                contacts : action.payload.contacts
            }
        case actions.COURSES_FETCH_FAILED:
            return {
                ...state,
                contacts : null,
                message : "contacts fetch failed"
            }
        default:
            return state;
    }
}

export default facultyReducer;