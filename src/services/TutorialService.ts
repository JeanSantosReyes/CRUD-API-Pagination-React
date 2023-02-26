// Axios Config
import TutorialApi from '../api/TutorialApi';
// Interfaces
import { ITutorialData, API_Response, API_Params } from '../types/Tutorial';

export const getAllItem = ({ ...params }: API_Params) => {
    return TutorialApi.get<API_Response>('/tutorials', { params })
}

export const getItem = (id: string) => {
    return TutorialApi.get<ITutorialData>(`/tutorials/${id}`)
}

export const createItem = (data: ITutorialData) => {
    return TutorialApi.post<ITutorialData>('/tutorials', data)
}

export const updateItem = (id: string, data: ITutorialData) => {
    return TutorialApi.put<ITutorialData>(`/tutorials/${id}`, data)
}

export const removeItem = (id: string) => {
    return TutorialApi.delete<ITutorialData>(`/tutorials/${id}`)
}

export const removeAllItems = () => {
    return TutorialApi.delete<Array<ITutorialData>>('/tutorials')
}