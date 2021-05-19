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

export { controller, getAPIResponse, getCatchAPIResponse }
