import YGOApi from '../src'

const ygo = new YGOApi()

ygo.getCard({name: 'Dark Magician'}).then(console.log)
