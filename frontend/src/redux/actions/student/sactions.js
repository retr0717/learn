import actions from "./saction-constants";

export const sSignUpAction = (payload) => {

    return(
        {
            type : actions.SIGNUP_START,
            payload : payload
        }
    );
}

export const sLoginAction = (payload) => {

    return(
        {
            type:actions.LOGIN_START,
            payload:payload
        }
    )
};

export const sLogoutAction = () => {

    return{
        type:actions.LOGOUT_START
    }
}

export const fetchCoursesAction = () => {
    return{
        type : actions.FETCH_ALL_COURSES_START
    }
}