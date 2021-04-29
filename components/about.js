import Layout from './layout'
import {default as NavInner, MobileNav } from './nav/nav-inner'
import Logo from './ui/logo'
import { SOCIALS } from '../lib/constants'

const {
    replyLink,
    myTwitter,
    wdTwitter,
    mediumLink,
    roughNotationLink,
    paperLink,
    relativeLink,
    githubLink,
    email,
    discordServer
} = SOCIALS;

export default class Feedback extends React.Component {
    render() {
        return (
            <Layout theme="light" subtitle="about">
                <MobileNav />
                <div className="about">
                    <div className="about__nav">
                        <Logo />
                        <div className="nav-inner">
                            <NavInner />
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="about__content">
                            <strong>But why?</strong>
                            <p>
                            Writey drawey was created by <a target="_blank" href={ myTwitter }>Colton Brown</a> as a social experiment to bring an in-person party game onto the web. You can read the blog post <a target="_blank" href={ mediumLink }>here</a> to learn about the project’s history and musings about digital spaces.
                            </p>
                            <strong>Q&A</strong>
                            <p>
                            If you'd like to leave feedback you can make submission on <a target="_blank" href={ replyLink }>rep.ly</a> or dm <a target="_blank" href={ wdTwitter }>@writey_drawey</a> on twitter to say hi.
                            </p>
                            <strong>tech + design</strong>
                            <p>
                            Hover animations were acheived with the <a target="_blank" href={ roughNotationLink } >rough-notation</a> library; drawing mechanism uses <a target="_blank" href={ paperLink }>paper.js</a>. The typeface used throughout the site and is the logo is colophon's <a target="_blank" href={ relativeLink }>relative</a>.
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
                            <h3 className="mono">
                                <a target="_blank" href={ discordServer }>
                                    discord
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}