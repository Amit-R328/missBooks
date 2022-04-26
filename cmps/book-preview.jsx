export class BookPreview extends React.Component{
    state = {
        book: this.props.book
    }



    get currency(){
        const currency = this.state.book.listPrice.currencyCode
        switch(currency){
            case 'EUR':
                return '€'
            case 'ILS':
                return 'ש"ח'
            case 'USD':
                return '$'

        }
    }
    
    render(){
        if(!this.state.book) return
        return <article className="book-preview" onClick={()=>this.props.onSelectBook(this.props.book)}>
        <h3>Title: {this.state.book.title}</h3>
        <img src={this.state.book.thumbnail}/>
        <h3>Price: {this.currency}{this.state.book.listPrice.amount}</h3>

    </article>
    }
    
}