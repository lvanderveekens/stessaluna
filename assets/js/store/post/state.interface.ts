import Post from "../../post/post.interface";

export interface PostState {
    loading: boolean,
    filters: Filters
    data: Post[]
}

export interface Filters {
    channel: string[]
}