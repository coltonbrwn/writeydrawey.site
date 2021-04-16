import Layout from './layout'
import NavInner from './nav/nav-inner'
import Logo from './ui/logo'

const replyLink = "https://rep.ly/writey_drawey"
const myTwitter = "https://twitter.com/coltontbrown"
const wdTwitter = "https://twitter.com/writey_drawey"
const mediumLink = "https://rep.ly/writey_drawey"
const roughNotationLink = "https://roughnotation.com/"
const paperLink = "http://paperjs.org/"
const relativeLink = "https://www.colophon-foundry.org/typefaces/relative/"
const githubLink = "https://github.com/coltonTB/writeydrawey.site"
const email = "mailto:mail@writeydrawey.site"

export default class Feedback extends React.Component {
    render() {
        return (
            <Layout theme="light" subtitle="about">
                <div className="about">
                    <div className="about__nav">
                        <Logo />
                        <div className="nav-inner">
                            <NavInner />
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="about__content">
                            <strong>About</strong>
                            <p>
                            Writey drawey was created by <a target="_blank" href={ myTwitter }>Colton Brown</a> as a social experiment during covid lockdown. you can read the blog post <a target="_blank" href={ mediumLink }>here</a> to learn about the project’s history and learnings about digital spaces.
                            </p>
                            <strong>Q&A</strong>
                            <p>
                            if you have any questions or feedback you can submit it on <a target="_blank" href={ replyLink }>rep.ly</a> or send a DM to our <a target="_blank" href={ wdTwitter }>twitter</a>
                            </p>
                            <strong>tech + design</strong>
                            <p>
                            the site was built with react, next.js, vercel, amazon S3 and dynamoDB. Hover animations were acheived with the <a target="_blank" href={ roughNotationLink } >rough-notation</a> library; drawing mechanism use <a target="_blank" href={ paperLink }>paper.js</a>. The typeface used throughout the site and is the logo is colophon's <a target="_blank" href={ relativeLink }>relative</a>.
                            </p>
                        </div>
                        <div className="about__links">
                            <h3 className="mono">
                                <a target="_blank" href={ githubLink }>
                                    coltonTB/writeydrawey.site
                                </a>
                            </h3>
                            <h3 className="mono">
                                <a target="_blank" href={ replyLink }>
                                    rep.ly/writey_drawey
                                </a>
                            </h3>
                            <h3 className="mono">
                                <a target="_blank" href={ email }>
                                    mail@writeydrawey.site
                                </a>
                            </h3>
                            <h3 className="mono">
                                <a target="_blank" href={ wdTwitter }>
                                    @writey_drawey
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}