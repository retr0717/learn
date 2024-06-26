import {put,all,call, takeLatest} from 'redux-saga/effects';
import actions from '../actions/faculty/factions-constants';
import axios from 'axios';

const LoginValidation = (data) => {

    const userData = {
        email:data.email,
        password:data.password
    }

    return fetch(`${import.meta.env.VITE_API_URL}/api/faculty/login`,{
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

    return fetch(`${import.meta.env.VITE_API_URL}/api/faculty/signup`,{
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

    console.log("get course fetch call : ",id);

    return fetch(`${import.meta.env.VITE_API_URL}/api/faculty/courses/${id}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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

const addCourse = (formData) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/api/faculty/add`, formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log("add course response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("Error adding course:", error);
        throw error;
    });
};

const deleteCourse = (data) => {

    console.log("delete course : ",data);

    const ddata = {
        id : data
    }

    return fetch(`${import.meta.env.VITE_API_URL}/api/faculty/delete`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(ddata)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        console.log(error)
    })
}

const editCourse = (data) => {
    return fetch(`${import.meta.env.VITE_API_URL}/api/faculty/edit`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
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

    console.log("reached saga handler : ",action);

    try{ 
        const res = yield call(LoginValidation,action.payload);
        console.log("login response : ",res);
        
        if(res.success)
        {
            yield put({type:actions.FACULTY_LOGIN_SUCCESS,payload:res.faculty});
        }
        else
        {
            return put({type:actions.FACULTY_LOGIN_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }
}

function* handleLogOut(){
    try
    {
        yield put({type : actions.FACULTY_LOGOUT_SUCCESS});
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
            yield put({type:actions.FACULTY_SIGNUP_SUCCESS,payload:res.user});
        }
        else
        {
            yield put({type:actions.FACULTY_SIGNUP_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }

}

function* handleCoursesFetch(action){

    try{ 
        const res = yield call(getCourses,action.payload);
        
        console.log("course fetch handler : ",res);

        if(res.success)
        {
            yield put({type:actions.FACULTY_COURSE_FETCH_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.FACULTY_COURSE_FETCH_SUCCESS,payload:res})
        }
    }
    catch(err){
       // console.log(err);
    }
}

function* handleCourseDelete(action)
{
    try{ 
        const res = yield call(deleteCourse,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.FACULTY_COURSE_DELETE_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.FACULTY_COURSE_DELETE_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }
}

function* handleAddCourse(action)
{
    try{ 
        const res = yield call(addCourse,action.payload);

        console.log("handle add course reponse : ", res);
        
        if(res.success)
        {
            yield put({type:actions.FACULTY_ADD_COURSE_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.FACULTY_ADD_COURSE_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }
}

function* handleEditCourse(action)
{
    try{ 
        const res = yield call(editCourse,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.FACULTY_EDIT_COURSE_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.FACULTY_EDIT_COURSE_FAILED,payload:res})
        }
    }
    catch(err){
        //console.log(err);
    }
}

function* watchForLoginStart(){
    yield takeLatest(actions.FACULTY_LOGIN_START,handleloginStart);
}

function* watchForLogOutStart(){
    yield takeLatest(actions.FACULTY_LOGOUT_START,handleLogOut);
}

function* watchForSignUpStart(){
    yield takeLatest(actions.FACULTY_SIGNUP_START,handleSignUp);
}

function* watchForCoursesFetch(){
    yield takeLatest(actions.FACULTY_COURSE_FETCH_START,handleCoursesFetch)
}

function* watchForCourseDeleteStart(){
    yield takeLatest(actions.FACULTY_COURSE_DELETE_START,handleCourseDelete)
}

function* watchForAddCourseStart(){
    yield takeLatest(actions.FACULTY_ADD_COURSE_START,handleAddCourse)
}

function* watchforEditCourseStart(){
    yield takeLatest(actions.FACULTY_EDIT_COURSE_START,handleEditCourse)
}

export default function* facultySaga()
{
    yield all(
        [
            watchForLoginStart(),
            watchForLogOutStart(),
            watchForSignUpStart(),
            watchForCoursesFetch(),
            watchForAddCourseStart(),
            watchForCourseDeleteStart(),
            watchforEditCourseStart()
    ]);
}