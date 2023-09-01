const BASE_URL = "http://localhost:4000/api/v1"

export const authEndpoints = {
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login",
}

export const blogEndPoints = {
    GET_ALL_BLOGS_API : BASE_URL + "/getallblogs",
    CREATE_BLOG_API : BASE_URL + "/createblog",
    GET_LIKED_BLOGS : BASE_URL + "/mostlikedblogs",
    GET_BLOG_BY_ID : BASE_URL + "/getblogbyid",
    POST_LIKED_BLOGS : BASE_URL + "/likedblogs",
    UNLIKE_POST : BASE_URL + "/unlikeblog",
    LIKED_OR_NOT : BASE_URL + "/likedornot",
    POST_COMMENT : BASE_URL + "/createcomment",
    FETCH_ALL_COMMENTS : BASE_URL + "/fetchallcomments",
    DELETE_COMMENT : BASE_URL + "/deletecomment",
    DELETE_BLOG_BY_ID : BASE_URL + "/deleteBlogById",
    UPDATE_BLOG_BY_ID : BASE_URL + "/updateblogbyid"
}
