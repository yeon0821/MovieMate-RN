export type RootStackParmList = {
    Movies: undefined;
    Detial: { id: number };
};

export interface Movie{
    id: number,
    title: string,
    originalTitle: string;
    releaseDate: string;
    overview: string;
    posterUrl: string | null;
}