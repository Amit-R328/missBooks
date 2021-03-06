import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookDetails } from './book-details.jsx'


export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
        selectedBook: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    onSelectBook = (book) => {
        this.setState({ selectedBook: book })
    }

    render() {
        const { books, selectedBook } = this.state
        return <section className='book-app'>
            {!selectedBook && <React.Fragment>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} onSelectBook={this.onSelectBook} />
            </React.Fragment>
            }

            {selectedBook && <BookDetails book={selectedBook} 
                onGoBack={() => {this.onSelectBook(null)}}/>}
        </section>
    }
}


