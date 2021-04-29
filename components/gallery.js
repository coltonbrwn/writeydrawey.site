import Layout from './layout'
import Nav from './nav/index'
import { default as NavInner, MobileNav } from './nav/nav-inner'
import Logo from './ui/logo'
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
            isTruncated,
            showHoverNav: false
        }
    }
    
    componentWillUnmount() {
        window.clearInterval(this.interval1)
        window.clearInterval(this.interval2)
    }

    componentDidMount() {
        const contentContainer = document.getElementById('contentContainer')
        this.inteveral1 = window.setInterval(() => {
            const distanceFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight
            if (distanceFromBottom < window.innerHeight) {
                this.fetchData()
            }
        }, 1500)
        this.interval2 = window.setInterval(() => {
            this.setState({
                showHoverNav: Boolean(window.scrollY > contentContainer.offsetTop)
            })
        }, 50)
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
                <MobileNav />
                <div className="gallery__nav">
                    <Logo />
                    <div className="nav-inner">
                        <NavInner />
                    </div>
                </div>
                <Nav hidden={ !this.state.showHoverNav }/>
                <div className="gallery" id="scrollContainer">
                    <h1 className="center">
                        Gallery
                    </h1>
                    <div className="" >
                        <div className="gallery__content" id="contentContainer">
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