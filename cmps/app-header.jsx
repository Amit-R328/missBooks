const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    // console.log('Props from header', props);
    // Almost never use goBack -> it might send the user outside of the app.
    return <header className="app-header">
        <h3 onClick={() => props.history.goBack()}>Miss Books</h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book" activeClassName="my-active">Our Books</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)