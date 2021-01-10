import Logo from './logo'
import UserInfo from './user-info'

export default (props) => (
    <div className="content-container ctr-adjust-pad">
        <div className="nav">
            <Logo />
            <div className="links">
                <h2>
                    <a href="/new">new game</a>
                </h2>
            </div>
            <UserInfo />
        </div>
        <div className="flex-container">
          <p>This game is already in progress</p>
        </div>
    </div>
)