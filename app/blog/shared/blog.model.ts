export interface IEntry {
    id: string,
    friendlyUrl: string,
    title: string,
    snippet: string,
    content: string,
    mapReference: IMapReference,
    tags: string[]
}

export interface IMapReference {
    latitude: number,
    longitude: number
}