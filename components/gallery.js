import Layout from './layout'
import Nav from './nav/index'
import { getGallery } from '../lib/api'

export default class Gallery extends React.Component {

    static async getInitialProps() {
        const { contents, isTruncated } = await getGallery()
        return {
            contents,
            isTruncated
        }
    }

    constructor({ contents, isTruncated }) {
        super()
        this.state = {
            contents,
            isTruncated
        }
    }
    
    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    componentDidMount() {
        this.inteveral = window.setInterval(() => {
            const distanceFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight
            if (distanceFromBottom < window.innerHeight) {
                this.fetchData()
            }
        }, 2000)
    }

    async fetchData() {
        if (!this.state.isTruncated) {
            return
        }
        const offsetKey = this.state.contents[ this.state.contents.length - 1 ].Key
        const { contents } = await getGallery({ offsetKey })
        this.setState({
            contents: this.state.contents.concat( contents )
        })
    }

    render() {
        return (
            <Layout theme="light" subtitle="gallery">
                <Nav />
                <div className="gallery" id="scrollContainer">
                    <h1 className="center">
                        Gallery
                    </h1>
                    <div className="" >
                        <div className="gallery__content">
                        {
                            this.state.contents.map( ({ Key, url }) => (
                                <div key={ Key } className="gallery-image">
                                    <img src={ url } />
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}