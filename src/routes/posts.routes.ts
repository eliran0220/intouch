const posts_routes = [
    {method : "get", url : "/v1/posts", action : "getPosts", controller : "PostsController"},
    {method : "post", url : "/v1/post", action : "createPost",controller : "PostsController"},
    {method : "delete", url : "/v1/posts/:post_id", action : "deletePost",controller : "PostsController"}
];

export default posts_routes;
