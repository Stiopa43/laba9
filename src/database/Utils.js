const getDataFromGoogleApp = async (url) => {
    const response = await fetch(url)
    return await response.json()
}

export default getDataFromGoogleApp;