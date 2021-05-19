const getAPIResponse = (data) => ({
  body: data
})

const getCatchAPIResponse = (message) => getAPIResponse({ isSuccess: false, message })

const controller =
  ({ useCase }) =>
  async (httpRequest) => {
    try {
      const response = await useCase(httpRequest)

      return getAPIResponse(response)
    } catch (e) {
      return getCatchAPIResponse(e.message)
    }
  }

const isValidEmailAddress = (text) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text)

export { controller, getAPIResponse, getCatchAPIResponse, isValidEmailAddress }
