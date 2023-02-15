const prepareComponents = async () => {
  const responses = await axios.all([
    axios.get('http://localhost:3000/services/destinations'),
  ])
  return [responses[0].data.result]
}
const destinationsPromis = prepareComponents()
