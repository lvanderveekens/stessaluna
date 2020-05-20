import Post from "../../post/post.interface";

export interface PostState {
    loading: boolean,
    data: Post[]
}