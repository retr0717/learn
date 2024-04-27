const LoginValidation = (data) => {

    const userData = {
        username:data.email,
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

const getCourses = (id) => {

    const user = {
        id : id
    }
    return fetch(`${import.meta.env.VITE_API_URL}/api/student/courses`,{
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

function* handleloginStart(action){

    try{ 
        const res = yield call(LoginValidation,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.LOGIN_SUCCESS,payload:res.user});
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
        const res = yield call(getCourses,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.COURSES_FETCH_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.COURSES_FETCH_FAILED,payload:res})
        }
    }
    catch(err){
       // console.log(err);
    }
}

function* watchForLoginStart(){
    yield takeLatest(actions.LOGIN_START,handleloginStart);
}

function* watchForLogOutStart(){
    yield takeLatest(actions.LOGOUT_START,handleLogOut);
}

function* watchForSignUpStart(){
    yield takeLatest(actions.SIGNUP_START,handleSignUp);
}

function* watchForCoursesFetch(){
    yield takeLatest(actions.COURSES_FETCH_START,handleCoursesFetch)
}

export default function* studentSaga()
{
    yield all(
        [
            watchForLoginStart(),
            watchForLogOutStart(),
            watchForSignUpStart(),
            watchForCoursesFetch()
    ]);
}