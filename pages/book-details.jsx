import { LongTxt } from "../cmps/long-txt.jsx"
import { Review } from "../cmps/review.jsx"
import { ReviewList } from "../cmps/review-list.jsx"
import { storageService } from "../services/storage.service.js"

 export class BookDetails extends React.Component{
    state = {
        book: this.props.book,
        isLongTxtShown: false,
        btnDescription: 'More',
        reviews: {bookId: '', content: []}
    } 

    componentDidMount(){
        this.loadReviews()
    }

    get readingDescription(){
        const {book} = this.state
        if(book.pageCount > 500) return 'Long Reading'
        else if(book.pageCount > 200) return 'Decent Reading'
        else if(book.pageCount < 100) return 'Light Reading'
    }

    get BookAge(){
        const {book} = this.state
        const currYear = new Date().getFullYear()
        if(currYear - book.publishedDate > 10) return 'Veteran Book'
        else if(currYear - book.publishedDate < 1) return 'New!'
    }

    get color(){
        const {book} = this.state
        if(book.listPrice.amount > 150) return 'red'
        else if(book.listPrice.amount < 20) return 'green'
    }

    toggleDescription = () => {
        const {isLongTxtShown} = this.state
        this.setState({isLongTxtShown: !isLongTxtShown, btnDescription: (isLongTxtShown) ? 'more' : 'less'})
    }
    
    onWriteReview = (review, bookId) =>{
        const KEY = 'reviewsDB'
        const {reviews} = this.state
        let reviewsUpdated = reviews.content.slice()
        reviewsUpdated.splice(0,0,review)
        this.setState({reviews: {bookId: bookId, content: reviewsUpdated}},() => {
           storageService.saveToStorage(KEY, this.state.reviews)
        })
    }

    loadReviews = () => {
        const KEY = 'reviewsDB'
        let newReviews = storageService.loadFromStorage(KEY)
        if(!newReviews.content || !newReviews.content.length) {
            return 'No reviews yet...'
        }
        if(this.props.book.id === newReviews.bookId){
            console.log('from load reviews',newReviews.bookId)
            console.log('reviews:', newReviews)
            this.setState((prevState) => ({reviews: {...prevState.reviews, reviews: newReviews}}))
            console.log('state',this.state)
        }
        
        
    }

    removeReview = (id) => {
        const reviewIdx = this.state.reviews.content.find((review) => review.id === id)
        const newReivews = [...this.state.reviews.content]
        newReivews.splice(reviewIdx,1)
        this.setState({reviews: {bookId: this.state.book.Id, content: newReivews}})
    }



    render(){
        const {book} = this.state
        

        return <section className="book-details">
            <h3 className={this.color}>Title: {book.title} {this.BookAge}</h3>
            {book.listPrice.isOnSale && <img className="sale" src='assets\img\sale.jpg'/>} 
            <h4>Subtitle: {book.subtitle}</h4>
            <h4>Authors: {book.authors}</h4>
            <h4>Publish Date: {book.publishedDate}</h4>
            <h4>Page Count: {book.pageCount} {this.readingDescription}</h4>
            <div className="img-container">
                <img src={book.thumbnail} />
            </div>
            <p>Categories: {book.categories.join(', ')}</p>
            <p>Description:</p>
            <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown}/>
            <button className="Description-btn" onClick={()=>{this.toggleDescription()}}>{this.state.btnDescription}</button>
            <p>Language: {book.language}</p>
            <hr/>
            
            <Review onWriteReview={this.onWriteReview} book={book}/>
            <ReviewList reviews={this.state.reviews} removeReview={this.removeReview} />

            <button onClick={this.props.onGoBack}>Go Back!</button> 
        </section>
    }
 }