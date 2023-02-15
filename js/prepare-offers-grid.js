const prepareComponents = async () => {
  const responses = await axios.all([
    axios.get('http://localhost:3000/services/offers'),
  ])
  return [responses[0].data.result]
}
const offersPromis = prepareComponents()

const checkAuth = async () => {
  const res = await axios.get('http://localhost:3000/accounts/isauth', {
    withCredentials: true,
  })
  return res
}
const isAuth = checkAuth()
