import { all, takeLatest , call, put} from "redux-saga/effects";
import actions from "../../redux/actions/student/saction-constants";

const LoginValidation = (data) => {

    console.log("reached student login : ", data);

    const userData = {
        email:data.email,
        password:data.password
    }

    return fetch(`${import.meta.env.VITE_API_URL}/api/student/login`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        //console.log(error)
    })
}

const SignUp = (data) => {

    const user = {
        name : data.name,
        username : data.username,
        email : data.email,
        password : data.password
    }

    return fetch(`${import.meta.env.VITE_API_URL}/api/student/signup`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(user)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        //console.log(error)
    })
}

const getCourses = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/api/student/courses`,{
        method:'GET'
    })
    .then(async res =>
        {
            res = await res.json();
            console.log("student courses response : ",res);
            return res;
        })
    .catch(error => {
        //console.log(error)
    })
}

function* handleloginStart(action){

    console.log("student login handler");
    try{ 
        const res = yield call(LoginValidation,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.LOGIN_SUCCESS,payload:res.student});
        }
        else
        {
            return put({type:actions.LOGIN_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }
}

function* handleLogOut(){
    try
    {
        yield put({type : actions.LOGOUT_SUCCESS});
    }
    catch(err)
    {
        //console.log("LOGOUT SAGA ERROR : ",err.message);
    }
}

function* handleSignUp(action){

    try{ 
        const res = yield call(SignUp,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.SIGNUP_SUCCESS,payload:res.user});
        }
        else
        {
            yield put({type:actions.SIGNUP_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }

}

function* handleCoursesFetch(action){

    try{ 
        const res = yield call(getCourses);

        console.log("get courses handler : ",res);
        
        if(res.success)
        {
            yield put({type:actions.FETCH_ALL_COURSES_SUCCESS,payload:res.courses});
        }
        else
        {
            yield put({type:actions.FETCH_ALL_COURSES_FAILED,payload:res})
        }
    }
    catch(err){
       // console.log(err);
    }
}

function* watchForStudentLoginStart(){
    yield takeLatest(actions.LOGIN_START,handleloginStart);
}

function* watchForStudentLogOutStart(){
    yield takeLatest(actions.LOGOUT_START,handleLogOut);
}

function* watchForStudentSignUpStart(){
    yield takeLatest(actions.SIGNUP_START,handleSignUp);
}

function* watchForStudentCoursesFetch(){
    yield takeLatest(actions.FETCH_ALL_COURSES_START,handleCoursesFetch)
}

export default function* studentSaga()
{
    yield all(
        [
            watchForStudentLoginStart(),
            watchForStudentLogOutStart(),
            watchForStudentSignUpStart(),
            watchForStudentCoursesFetch()
    ]);
}