export interface Word {
    _id: string;
    idUser: string;
    idCategory: string;
    word: string;
    definition: string;
    conceptVideo: string;
    meaningVideo: string;
    visible: boolean;
}

export function createEmptyWord(): Word {
    return {
        _id: '',
        idUser: '',
        idCategory: '',
        word: '',
        definition: '',
        conceptVideo: '',
        meaningVideo: '',
        visible: false
    } as Word;
}