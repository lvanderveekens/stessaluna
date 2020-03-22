import Post from "../../post/post.interface";

export interface PostState {
    loading: boolean,
    items: Post[]
}