import {SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR,SELECTED_VIDEO,SET_VIDEOS,SET_MY_PROFILE,SET_PROGRESS} from './types'
import {post,get,put} from "../service/api";
import {LOGIN_URL,GET_VIDEOS_URL,GET_MY_PROFILE_URL,UPLOAD_VIDEO_URL,POST_VIDEO_URL} from "../service/apiurls"
import {LOGIN_TOKEN_TYPE,ADMIN_TOKEN_TYPE} from "../service/tokenTypes"

import btoa from "btoa"

var videos =[
    {_id:1,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-1"},
    {_id:2,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-2"},
    {_id:3,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-3"},
    {_id:4,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-4"},
    {_id:5,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-5"},
    {_id:6,url:"https://s3.ap-south-1.amazonaws.com/codeuniverse/Angular+2+Tutorial+7++Decorator+and+Metadata.mp4",title:"Video-6"}]

export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginSuccess(isLoginSuccess) {

    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };

}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}
export function selectedVideo(video) {
    return {
        type: SELECTED_VIDEO,
        payload:video
    }
}
export function setVideos(videos) {
    return {
        type: SET_VIDEOS,
        payload:videos
    }
}
export function setMyProfile(profile) {
    return {
        type: SET_MY_PROFILE,
        payload:profile
    }
}
export function setProgress(progress) {

    return {
        type: SET_PROGRESS,
        payload:progress
    }
}


export function login(email, password) {
    return  dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        var base64 = btoa(email+":"+password)
        var authToken = LOGIN_TOKEN_TYPE+" "+base64
        post(LOGIN_URL,authToken,{}).then(function (admin) {
            localStorage.setItem("loginuser",admin.access_token);
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true));

        }, function (error) {
            if (error.response) {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
            }
        });
    }
}
export function postVideo(video) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+localStorage.getItem("loginuser")
            post(POST_VIDEO_URL,authToken,video).then(function (video) {
                dispatch(getVideos());
                resolve(video)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post videos-------",error)
                }
                reject(error)
            });
        })

    }
}

export function getVideos() {
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+localStorage.getItem("loginuser")
        get(GET_VIDEOS_URL,authToken).then(function (videos) {
            dispatch(setVideos(videos));
        }, function (error) {
            if (error.response) {
               console.log("----error in get videos-------",error)
            }
        });
    }
}
export function getMyProfile() {
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+localStorage.getItem("loginuser")
        get(GET_MY_PROFILE_URL,authToken).then(function (profile) {
            dispatch(setMyProfile(profile));
        }, function (error) {
            if (error.response) {
               console.log("----error in get profile-------",error)
            }
        });
    }
}

export function addVideo(video) {
    video._id  = 8
    videos.push(video)
    return  dispatch => {
        return new Promise (function (resolve,reject) {
           dispatch(getVideos())
            resolve(video)
        })

    }
}

export function uploadVideo(file) {
    return  dispatch => {
        return new Promise(function (resolve,reject) {
            var formData = new FormData();
            formData.append("file", file);
            var xhr = new XMLHttpRequest();
            var authToken = ADMIN_TOKEN_TYPE+" "+localStorage.getItem("loginuser")
            xhr.open('POST', UPLOAD_VIDEO_URL);
            xhr.setRequestHeader("Authorization",authToken );
            console.log('OPENED', xhr.status);
            function progressFunction(evt){
                if (evt.lengthComputable) {
                    console.log(Math.round(evt.loaded / evt.total * 100) + "%")
                    dispatch(setProgress((Math.round(evt.loaded / evt.total * 100))))
                }
            }

            xhr.upload.addEventListener("progress", progressFunction, false);

            xhr.onprogress = function () {
                console.log('LOADING', xhr.status);
            };

            xhr.onreadystatechange = function () {

                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log(xhr.responseText);
                    resolve(xhr.responseText)

                }
            };
            xhr.onerror = function (error) {
                console.log("** An error occurred during the transaction");
                reject(error)
            };

            xhr.onload = function () {
                console.log('DONE', xhr.status);
            };

            xhr.send(formData);

        })
    }

}

