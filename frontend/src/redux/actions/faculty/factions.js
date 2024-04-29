import actions from "./factions-constants";

export const deleteCourseAction = (payload) => {
    return(
        {
            type : actions.FACULTY_COURSE_DELETE_START,
            payload : payload
        }
    );
}

export const editCourseAction = (payload) => {
    return(
        {
            type : actions.FACULTY_EDIT_COURSE_START,
            payload : payload
        }
    );
}

export const addCourseAction = (payload) => {

    return(
        {
            type : actions.FACULTY_ADD_COURSE_START,
            payload : payload
        }
    );
}

export const CourseFetchAction = (payload) => {

    return(
        {
            type : actions.FACULTY_COURSE_FETCH_START,
            payload : payload
        }
    );
}

export const signUpAction = (payload) => {

    return(
        {
            type : actions.FACULTY_SIGNUP_START,
            payload : payload
        }
    );
}

export const loginAction = (payload) => {

    return(
        {
            type:actions.FACULTY_LOGIN_START,
            payload:payload
        }
    )
};

export const logoutAction = () => {

    return{
        type:actions.FACULTY_LOGOUT_START
    }
}