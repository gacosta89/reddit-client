import config from 'config'
import renderLayout from 'server/render/layout'

const title = config.get('name')

export default (req, res) => {
    res.status(200).send(
        renderLayout({
            title,
        })
    )
}
