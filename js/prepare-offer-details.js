const prepareComponents = async () => {
  const offerId = localStorage.getItem('offerId')
  const responses = await axios.all([
    axios.get(`http://localhost:3000/services/offers/${offerId}`),
    axios.get(`http://localhost:3000/services/offers?limit=3`),
  ])
  return [responses[0].data.offer, responses[1].data.result]
}
const offerPromis = prepareComponents()
