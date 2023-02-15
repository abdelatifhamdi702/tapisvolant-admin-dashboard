const prepareComponents = async () => {
  const responses = await axios.all([
    axios.get('http://localhost:3000/services/offers'),
    axios.get('http://localhost:3000/services/destinations'),
    axios.get('http://localhost:3000/services/destinations?limit=5'),
    axios.get('http://localhost:3000/demands/planes/frequent?limit=6'),
    axios.get('http://localhost:3000/communications/testimonials'),
  ])
  return [
    responses[0].data.result,
    responses[1].data.result,
    responses[2].data.result,
    responses[3].data.result,
    responses[4].data.result,
  ]
}
const checkAuth = async () => {
  const res = await axios.get('http://localhost:3000/accounts/isauth', {
    withCredentials: true,
  })
  return res
}
const isAuth = checkAuth()
const dataPromis = prepareComponents()
