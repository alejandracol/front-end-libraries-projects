export default async function requestQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    if (!response.ok) throw new Error(data)
    return data
}

