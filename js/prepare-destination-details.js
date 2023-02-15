const prepareComponents = async () => {
  const destinationId = localStorage.getItem('destinationId')
  const responses = await axios.all([
    axios.get(`http://localhost:3000/services/destinations/${destinationId}`),
    axios.get(`http://localhost:3000/services/destinations?limit=3`),
  ])
  return [responses[0].data.destination, responses[1].data.result]
}
const destinationPromis = prepareComponents()
