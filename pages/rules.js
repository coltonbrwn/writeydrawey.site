import Layout from '../components/layout';
import Nav from '../components/nav';

import "../styles/styles.scss";

export default function(props) {
  return (
    <Layout theme="light">
      <div className="full-height">
        <Nav noLogo/>
        <div className="rules">
          <h1>Rules</h1>
          <p>
            Writey Drawey is kind of like <i>telephone</i> meets <i>pictionary</i>. First, each player chooses a secret phrase. In the first round, the phrases are rotated around the circle, and each player attempts to illustrate the phrase they are given. Next, the drawings rotate, and players describe with words the drawing they’ve received. The cycle continues until the game is over.
          </p>
          <p>
            To start a new game, click <u>new game</u>, then copy and share the unique game link with your friends
          </p>
        </div>
      </div>
    </Layout>
  )
}
