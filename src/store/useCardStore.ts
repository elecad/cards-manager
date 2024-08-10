import {defineStore} from "pinia";
import {ref} from "vue";
import {cardService, ISaleCard} from "../service/card.service.ts";
import {notFoundIcon} from "../config/cardPatterns.ts";

export type ICreateCard = Omit<ISaleCard, 'id' | 'position'>
export type IUpdateCard = Omit<ISaleCard, 'id' | 'position'>

const PlaceholderCard: ISaleCard = {
    id: 0,
    data: "",
    position: -1,
    type: "",
    name: "",
    barcode: "",
    icon: notFoundIcon,
    description: ""
}

export const useCardStore = defineStore('card', () => {
    const {getAllRecord, createRecord, nextRecordID, updateRecord, removeRecord} = cardService()
    const cards = ref<ISaleCard[]>([])
    const selectedCard = ref<ISaleCard>(PlaceholderCard)
    const isLoading = ref(true)
    const needInit = ref(true)

    const init = async () => {
        if (needInit.value) {
            cards.value = await getAllRecord()
            console.log(cards)
            isLoading.value = false
            needInit.value = false
        }
    }

    init()


    const add = async (newCard: ICreateCard) => {
        const position = await nextRecordID()
        const id = await createRecord({...newCard, position})
        cards.value.push({id, ...newCard, position})
    }

    const get = (id: number) => {
        return cards.value.find((el) => el.id === id)
    }

    const update = (id: number, newCard: IUpdateCard) => {
        return updateRecord(id, newCard)
    }

    const remove = (id: number) => {
        return removeRecord(id)
    }

    const select = (card: ISaleCard) => {
        selectedCard.value = card
    }


    return {cards, isLoading, add, get, update, remove, init, select, selectedCard}
})
