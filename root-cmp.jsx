import { BookApp } from "./pages/book-app.jsx";
import { Home } from "./pages/home.jsx";
import { About } from "./pages/about.jsx";
import { BookDetails } from "./pages/book-details.jsx";
import { AppHeader } from "./cmps/app-header.jsx";

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App(){
    return <Router>
        <AppHeader/>
        <section className="app">
            <Switch>
                <Route path="/book/:bookId" component={BookDetails}/>
                <Route path="/book" component={BookApp}/>
                <Route path="/about" component={About}/>
                <Route path="/" component={Home}/>
            </Switch>
        </section>
    </Router>
}