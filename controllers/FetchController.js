const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

module.exports = {
    async getIndex(request, response) {
        const { query, save } = request.body
        if (!query) return response.status(400).json('missing query')
        try {
            let duckduck = await axios.get(
                `http://api.duckduckgo.com/?q=${query}&format=json&t=backendforcialtest`
            )
            let data = await duckduck.data.RelatedTopics.reduce(
                (result, item) => {
                    if (item.FirstURL && item.Text) {
                        result.push({
                            url: item.FirstURL,
                            title: item.Result.match('(?<=>).+?(?=<)'),
                            id: uuidv4()
                        })
                    }
                    return result
                },
                []
            )
            save &&
                fs.appendFile(
                    'searchHistory.txt',
                    `${query}\n`,
                    function (err) {
                        if (err) throw err
                    }
                )

            return response.status(200).json(data)
        } catch (error) {
            return response
                .status(400)
                .json(`Error fetching query, erro: ${error}`)
        }
    },
    async postIndex(request, response) {
        const { query } = request.body
        try {
            const params = new URLSearchParams()
            params.append('q', query)
            params.append('format', 'x-www-form-urlencoded')
            params.append('t', 'backendforcialtest')
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            let duckduck = axios.post(
                `http://api.duckduckgo.com/`,
                params,
                config
            )
            /*   let data = await duckduck.data.RelatedTopics.reduce(
                (result, item) => {
                    if (item.FirstURL && item.Text) {
                        result.push({
                            url: item.FirstURL,
                            title: item.Result.match('(?<=>).+?(?=<)'),
                            id: uuidv4()
                        })
                    }
                    return result
                },
                []
            ) */
            return response
                .status(200)
                .json(
                    'apparently duckduckgo does not accept POST request, I have tried doing with urlencoded but no luck.'
                )
        } catch (error) {
            return response
                .status(400)
                .json(`Error fetching query, erro: ${error}`)
        }
    }
}
