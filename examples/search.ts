import YGOClient from "../src"

const client = new YGOClient()

client.load().then(() => {
  client.search('melffy').map(card => console.log(card.name))
})
