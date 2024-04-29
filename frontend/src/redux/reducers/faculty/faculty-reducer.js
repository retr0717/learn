import actions from "../../actions/faculty/factions-constants";

let initState = {
    login:false
};

const facultyReducer = (state=initState,action) =>
{
    switch(action.type)
    {
        case actions.FACULTY_EDIT_COURSE_SUCCESS:
            return{
                ...state,
                edit_contact : true
            }
        case actions.FACULTY_EDIT_COURSE_FAILED:
            return{
                ...state,
                edit_contact : false
            }
        case actions.FACULTY_COURSE_DELETE_SUCCESS:
            return{
                ...state,
                delete_contact : true
            }
        case actions.FACULTY_COURSE_DELETE_FAILED:
            return{
                ...state,
                delete_contact : false
            }
        case actions.FACULTY_ADD_COURSE_SUCCESS:
            return{
                ...state,
                course_add : true
            }
        case actions.FACULTY_ADD_COURSE_FAILED:
            return{
                ...state,
                course_add: false
            }
        case actions.FACULTY_LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                login:true
            }
        case actions.FACULTY_LOGIN_FAILED:
            return{
                ...state,
                user : action.payload,
                login:false
            }
        case actions.FACULTY_LOGOUT_SUCCESS:
            return{
                login:false
            }
        case actions.FACULTY_SIGNUP_SUCCESS:
            return{
                ...state,
                user : action.payload,
                login : true,
                message : "success"
            }
        case actions.FACULTY_SIGNUP_FAILED:
            return{
                ...state,
                message : action.payload.message,
                login:false
            }
        case actions.FACULTY_COURSE_FETCH_SUCCESS:
            return{
                ...state,
                courses : action.payload.courses
            }
        case actions.FACULTY_COURSE_FETCH_FAILED:
            return {
                ...state,
                contacts : null,
                message : "course fetch failed"
            }
        default:
            return state;
    }
}

export default facultyReducer;