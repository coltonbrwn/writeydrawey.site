import Head from 'next/head';
import { get } from 'dotty';

import {
  COLORS,
  THEME_LIGHT
} from '../lib/util';

export default class Layout extends React.Component {

  static defaultProps = {
    srollPos: 0,
    theme: THEME_LIGHT,
    subtitle: ''
  }

  render () {
    const subtitle = this.props.subtitle
    const social_img_url = '/social.png';
    const title = `Writey Drawey${ subtitle ? ` - ${ subtitle}` : '' }`;
    const ga_id = 'G-M3FG3GXZ8F'
    const url = 'https://writeydrawey.site'
    const description = "A free web game for friends, coworkers, and families"
    const themeColor = colorName => get(COLORS, [this.props.theme, colorName]);
    return (
      <div>



        <Head>
          {
            ga_id && (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') && [
              <script key='1' async src={`https://www.googletagmanager.com/gtag/js?id=${ ga_id }` }></script>,
              <script key='2' dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                    function gtag(){
                      dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', '${ ga_id }');
                `
              }} />
            ]
          }
          <link rel="shortcut icon" href="/favicon/favicon-32.png" />
          <link rel="icon" type="image/png" href="/favicon/favicon-196.png" />
          <link rel="apple-touch-icon" href="/favicon/favicon-180.png" />

          <meta name="description" content={ description } />
          <meta itemProp="name" content={ title } />
          <meta itemProp="description" content={ description } />
          <meta itemProp="image" content={ social_img_url } />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:title" content={ title } />
          <meta name="twitter:description" content={ description } />
          <meta name="twitter:image:src" content={ social_img_url } />
          <meta property="og:title" content={ title } />
          <meta property="og:image" content={ social_img_url } />
          <meta property="og:description" content={ description } />
          <meta property="og:type" content="website" />
          <meta property="og:image:height" content={ 1000 } />
          <meta property="og:image:width" content={ 1000 } />
          <meta property="og:description" content={ description } />
          <meta property="og:site_name" content={ title } />
          <meta property="og:url" content={ url } />

          {
            process.env.NEXT_PUBLIC_NODE_ENV !== 'production' && (
              <meta name="robots" content="noindex" />
            )
          }

          <title>{ title }</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <style>
            {`
              :root {
                --black-ln: ${ themeColor('black') };
                --white: ${ themeColor('white') };
                --gray: ${ themeColor('gray') };
                --lightgray: ${ themeColor('lightgray') };
              }
            `}
          </style>
        </Head>
        <div id="main">
          <div className="full-height">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
