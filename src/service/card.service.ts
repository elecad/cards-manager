import Dexie, {EntityTable} from "dexie";


const DATABASE_NAME = "cards-db"

// interface SchemeDB {
//     settings: {
//         Dark: boolean
//         view: "small" | "default" | "large"
//         offline: boolean
//     },
//     cards: {}
// }

export interface ISaleCard {
    id: number
    name: string
    description: string
    barcode: string
    data: string
    position: number
    type: string
    icon: string
}

export type ISaleCardTransport = Omit<ISaleCard, 'id' | 'name' | 'description' | 'position'>


export const cardService = () => {
    const $ = new Dexie(DATABASE_NAME) as Dexie & {
        DATABASE_NAME: EntityTable<
            ISaleCard,
            'id'
        >;
    };

    $.version(1).stores({
        DATABASE_NAME: "++id, position"
    })

    const getAllRecord = async () => {
        return $.DATABASE_NAME.toArray()
    }

    const getRecord = async (id: number) => {
        return $.DATABASE_NAME.get(id)
    }

    const createRecord = async (card: Omit<ISaleCard, 'id'>) => {
        return $.DATABASE_NAME.add({
            ...card
        })
    }

    const updateRecord = async (id: number, card: Partial<Omit<ISaleCard, 'id'>>) => {
        return $.DATABASE_NAME.update(id, {...card});
    }

    const removeRecord = async (id: number) => {
        return $.DATABASE_NAME.where({id}).delete();
    }

    const nextRecordID = async () => {
        const record = await $.DATABASE_NAME.orderBy('id').last();
        let id = 1;
        if (record)
            id = record.id + 1
        return id
    }

    return {getAllRecord, createRecord, updateRecord, removeRecord, getRecord, nextRecordID}


}