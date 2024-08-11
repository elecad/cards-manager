import {defineStore} from "pinia";
import {ref} from "vue";
import {cardService, ISaleCard, ISaleCardTransport} from "../service/card.service.ts";
import {notFoundIcon} from "../config/cardPatterns.ts";

export type ICreateCard = Omit<ISaleCard, 'id' | 'position'>

export const PlaceholderCard: ISaleCard = {
    id: 0,
    data: "",
    position: -1,
    type: "",
    name: "",
    barcode: "",
    icon: notFoundIcon,
    description: ""
}

export const PlaceholderCreatedData: ISaleCardTransport = {
    type: "",
    data: "",
    barcode: ""
}

export const useCardStore = defineStore('card', () => {
    const {getAllRecord, createRecord, nextRecordID, updateRecord, removeRecord} = cardService()
    const cards = ref<ISaleCard[]>([])

    const selectedCard = ref<ISaleCard>(PlaceholderCard)
    const createdData = ref<ISaleCardTransport>(PlaceholderCreatedData)
    const isLoading = ref(true)


    const getAll = async () => {
        isLoading.value = true
        cards.value = await getAllRecord()
        isLoading.value = false
    }

    const add = async (newCard: ICreateCard) => {
        const position = await nextRecordID()
        const id = await createRecord({...newCard, position})
        cards.value.push({id, ...newCard, position})
    }

    const get = (id: number) => {
        return cards.value.find((el) => el.id === id)
    }

    const getByPosition = (position: number) => {
        return cards.value.find((el) => el.position === position)
    }

    const update = (newCard: ISaleCard) => {
        return updateRecord(newCard.id, newCard)
    }

    const remove = (id: number) => {
        return removeRecord(id)
    }

    const select = (card: ISaleCard) => {
        selectedCard.value = card
    }

    const saveCreateData = (data: ISaleCardTransport) => {
        createdData.value = data
    }


    return {
        cards,
        isLoading,
        add,
        get,
        update,
        remove,
        select,
        selectedCard,
        createdData,
        saveCreateData,
        getAll,
        getByPosition
    }
})
