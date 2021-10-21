import YGOClient from '../src'

const client = new YGOClient()

client.load().then(() => {
  const card = client.getByName('Dark Magician')
  
  console.log(card)
})
