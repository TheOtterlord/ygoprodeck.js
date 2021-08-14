import axios from "axios"
import { ApiOptions, CardFilters } from './types'

export default class YGOApi {
  cardUrl       = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
  archetypesUrl = 'https://db.ygoprodeck.com/api/v7/archetypes.php'
  setUrl        = 'https://db.ygoprodeck.com/api/v7/cardsets.php'
  setInfoUrl    = 'https://db.ygoprodeck.com/api/v7/cardsetsinfo.php'
  randomCardUrl = 'https://db.ygoprodeck.com/api/v7/randomcard.php'

  constructor(options?: ApiOptions) {
    for (const key in options) if (options[key]) this[key] = options[key]
  }

  /**
   * Get all cards that match the given filters
  */
  async getCards(filters?: CardFilters) {
    const res = await axios.get(this.cardUrl, {
      params: {
        ...filters,
      }
    })

    return res.data.data
  }

  /**
   * Get the first card that matches the given filters
  */
  async getCard(filters?: CardFilters) {
    return await this.getCards(filters)[0]
  }

  /**
   * Get a random card
   */
  async getRandomCard() {
    const res = await axios.get(this.randomCardUrl)

    return res.data
  }

  /**
   * Get a list of all archetypes
   */
  async getArchetypes() {
    const res = await axios.get(this.archetypesUrl)

    return res.data
  }

  /**
   * Get a list of all cardsets
  */
  async getSets() {
    const res = await axios.get(this.setUrl)

    return res.data
  }

  /**
   * Get the info of a cardset
   */
  async getSetInfo(setcode: string) {
    const res = await axios.get(this.setInfoUrl, {
      params: {
        setcode,
      }
    })

    return res.data
  }
}
