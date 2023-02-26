export interface ITutorialData {
    id?: any | null,
    title: string,
    description: string,
    published?: boolean,
}

export interface API_Response {
    totalTutorials: number;
    tutorials: ITutorialData[];
    totalPages: number;
    currentPage: number;
}

export interface API_Params {
    page?: number;
    size?: number;
    title?: string;
}