import Post from "../../post/post.interface";

export interface PostState {
    loading: boolean,
    filters: Filters
    hasNextPage: boolean,
    data: Post[]
}

export interface Filters {
    channel?: string[]
}