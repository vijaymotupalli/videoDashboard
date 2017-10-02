import {SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR,SELECTED_VIDEO,SET_VIDEOS,SET_MY_PROFILE,SET_PROGRESS,
    SET_VIDEO_ERROR,SET_SCHOOLS,SET_STANDARDS,SET_SUBJECTS} from './types'
import {post,get,put,_delete} from "../service/api";
import {LOGIN_URL,GET_VIDEOS_URL,GET_MY_PROFILE_URL,UPLOAD_VIDEO_URL,POST_VIDEO_URL,EDIT_VIDEO_URL,
SCHOOLS,STANDARDS,SUBJECTS,GET_USERS_URL,POST_USERS_URL,GET_USER_ROLES,DELETE_USERS_URL,GET_USER_DETAILS_URL,APPLY_FILTER} from "../service/apiurls"
import {LOGIN_TOKEN_TYPE,ADMIN_TOKEN_TYPE} from "../service/tokenTypes"

import btoa from "btoa"

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
export function setVideoError(videoError) {
    return {
        type: SET_VIDEO_ERROR ,
        payload:videoError
    }
}
export function setSelectedVideo(video) {
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
}export function setSchools(schools) {
    return {
        type: SET_SCHOOLS,
        payload:schools
    }
}export function setStandards(standards) {
    return {
        type: SET_STANDARDS,
        payload:standards
    }
}export function setSubjects(subjects) {
    return {
        type: SET_SUBJECTS,
        payload:subjects
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
        return new Promise (function (resolve,reject) {
            dispatch(setLoginPending(true));
            dispatch(setLoginSuccess(false));
            dispatch(setLoginError(null));
            var base64 = btoa(email+":"+password)
            var authToken = LOGIN_TOKEN_TYPE+" "+base64
            post(LOGIN_URL,authToken,{}).then(function (admin) {
                localStorage.setItem("loginuser",JSON.stringify(admin));
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(true));
                resolve(admin)
            }, function (error) {
                if (error.response) {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    reject(error)
                }
            });
        })

    }
}
export function postVideo(video) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
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

export function setRoles(roles) {

    return {
        type: "SET_ROLES_DATA",
        payload:roles
    }
}

export function getRoles() {
    return  dispatch => {
        axios.get(GET_USER_ROLES)
            .then(function(response) {
                dispatch(setRoles(response.data))
            });
    }
}

export function clearUserData(flag) {

    return {
        type: "CLEAR_USER_DATA",
        payload:flag
    }
}

export function setUserError(userError) {

    return {
        type: "SET_USER_ERROR",
        payload:userError
    }
}

export function addUser(user) {
    console.log("---user----",user)
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            post(POST_USERS_URL,authToken,user)
                .then(function (response,err) {
                    dispatch(getUsers());
                    dispatch(clearUserData(true))
                    dispatch(setUserError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}


export function editUser(userId,user) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            put(GET_USER_DETAILS_URL+"/"+userId,authToken,user)
                .then(function (response,err) {
                    dispatch(getMyProfile());
                    dispatch(getUserDetails(userId));
                    dispatch(clearUserData(true))
                    dispatch(setUserError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}













export function selectedUserData(selectedUserData) {

    return {
        type: "SELECTED_USER_DATA",
        payload:selectedUserData
    }
}

export function setUsersData(usersData) {

    return {
        type: "SET_USERS_DATA",
        payload:usersData
    }
}
export function getUsers() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_USERS_URL,authToken).then(function (users) {
            dispatch(setUsersData(users));
        }, function (error) {
            if (error.response) {
                console.log("----error in get users-------",error)
            }
        });
    }
}

export function addSchool(school) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(SCHOOLS,"",school).then(function (school) {
                dispatch(getSchools());
                resolve(school)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post school-------",error)
                }
                reject(error)
            });
        })

    }
}
export function addSubject(subjet) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(SUBJECTS,"",subjet).then(function (subject) {
                dispatch(getSubjects());
                resolve(subject)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Subject-------",error)
                }
                reject(error)
            });
        })

    }
}

export function deleteAdmin(adminId) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(DELETE_USERS_URL+"/"+adminId,authToken).then(function (result) {
                dispatch(getUsers());
                resolve(result)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete admin-------",error)
                }
                reject(error)
            });
        })

    }
}


export function deleteSubject(subjet) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(SUBJECTS+"/"+subjet,"").then(function (subject) {
                dispatch(getSubjects());
                resolve(subject)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete Subject-------",error)
                }
                reject(error)
            });
        })

    }
}
export function editSubject(subjet) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(SUBJECTS+"/"+subjet._id,"",subjet).then(function (subject) {
                dispatch(getSubjects());
                resolve(subject)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Subject-------",error)
                }
                reject(error)
            });
        })

    }
}



export function deleteStandard(standard) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(STANDARDS+"/"+standard,"").then(function (standard) {
                dispatch(getStandards());
                resolve(standard)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete Standard-------",error)
                }
                reject(error)
            });
        })

    }
}




export function editStandard(standard) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(STANDARDS+"/"+standard._id,"",standard).then(function (standard) {
                dispatch(getStandards());
                resolve(standard)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Standard-------",error)
                }
                reject(error)
            });
        })

    }
}

export function deleteSchool(school) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(SCHOOLS+"/"+school,"").then(function (school) {
                dispatch(getSchools());
                resolve(school)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Delete School-------",error)
                }
                reject(error)
            });
        })

    }
}

export function editSchool(school) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(SCHOOLS+"/"+school._id,"",school).then(function (school) {
                dispatch(getSchools());
                resolve(school)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit School-------",error)
                }
                reject(error)
            });
        })

    }
}
export function addStandard(standard) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(STANDARDS,"",standard).then(function (standard) {
                dispatch(getStandards());
                resolve(standard)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Standard-------",error)
                }
                reject(error)
            });
        })

    }
}

export function getUserDetails(email) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_USER_DETAILS_URL+"/"+email,authToken).then(function (user) {
            dispatch(selectedUserData(user));
        }, function (error) {
            if (error.response) {
                console.log("----error in get videos-------",error)
            }
        });
    }
}

export function setLoader(value) {
    return {
        type: "SET_LOADER",
        payload:value
    }

}

export function applyFilter(filterData) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            post(APPLY_FILTER,authToken,filterData).then(function (videos) {
                dispatch(setVideos(videos));
                resolve("Success");
            }, function (error) {
                if (error.response) {
                    console.log("----error in apply filter videos-------",error)
                    reject(error.response)
                }
                reject(error)
            });
        })
    }
}



export function getVideos() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_VIDEOS_URL,authToken).then(function (videos) {
            dispatch(setVideos(videos));
        }, function (error) {
            if (error.response) {
               console.log("----error in get videos-------",error)
            }
        });
    }
}
export function getSchools() {
    return  dispatch => {
        get(SCHOOLS).then(function (schools) {
            dispatch(setSchools(schools));
        }, function (error) {
            if (error.response) {
               console.log("----error in get schools-------",error)
            }
        });
    }
}
export function getStandards() {
    return  dispatch => {
        get(STANDARDS).then(function (standards) {
            dispatch(setStandards(standards));
        }, function (error) {
            if (error.response) {
               console.log("----error in get standards-------",error)
            }
        });
    }
}
export function getSubjects() {
    return  dispatch => {
        get(SUBJECTS).then(function (subjects) {
            dispatch(setSubjects(subjects));
        }, function (error) {
            if (error.response) {
               console.log("----error in get subjects-------",error)
            }
        });
    }
}
export function getMyProfile() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_MY_PROFILE_URL,authToken).then(function (profile) {
            dispatch(setMyProfile(profile));
        }, function (error) {
            if (error.response) {
               console.log("----error in get profile-------",error)
            }
        });
    }
}


export function uploadVideo(file) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise(function (resolve,reject) {
            var formData = new FormData();
            formData.append("file", file);
            var xhr = new XMLHttpRequest();
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            xhr.open('POST', UPLOAD_VIDEO_URL);
            xhr.setRequestHeader("Authorization",authToken );

            function progressFunction(evt){
                if (evt.lengthComputable) {
                    dispatch(setProgress((Math.round(evt.loaded / evt.total * 100))))
                }
            }

            xhr.upload.addEventListener("progress", progressFunction, false);

            xhr.onprogress = function () {

            };

            xhr.onreadystatechange = function () {

                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                    resolve(xhr.responseText)

                }
            };
            xhr.onerror = function (error) {

                reject(error)
            };

            xhr.onload = function () {

            };

            xhr.send(formData);

        })
    }

}

export function editVideo(video) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            put(EDIT_VIDEO_URL+"/"+video.videoId,authToken,video).then(function (video) {
                dispatch(getVideos());
                resolve()
            },function (error) {
                if (error.response) {
                    console.log("----error in Edit Video-------",error)
                    reject(error.response)
                }
            });
        })

    }
}


export function deleteVideo(video) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            _delete(EDIT_VIDEO_URL+"/"+video._id,authToken).then(function (video) {
                dispatch(getVideos());
                resolve(video)
            },function (error) {
                if (error.response) {
                    console.log("----error in Delete Video-------",error)
                    reject(error.response)
                }
            });
        })

    }
}


