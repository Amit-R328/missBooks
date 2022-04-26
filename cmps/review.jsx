import { utilService } from "../services/util.service.js"

export class Review extends React.Component{
    state = {
        review: {
            byUser: '',
            rate: 4 ,
            text: '',
            readAt: "2022-04-25",
            key: utilService.makeId()
        },
        book: this.props.book
    }

    handleChange = ({target}) => {
        const field = target.name 
        const value = target.type === 'number' ? target.value : target.value
        this.setState((prevState) => ({review: {...prevState.review, [field]:value}}))
    }

    addReview = ev => {
        ev.preventDefault()
        const review = {...this.state.review}
        console.log(review)
        this.props.onWriteReview(review, this.state.book.id)
    }

    render(){
        const { byUser, rate, text, readAt } = this.state.review
        return (
            <section className="review">
                <form onSubmit={this.addReview}>
                    <input type="text" placeholder="Full name please" name="byUser"
                    value={byUser} onChange={this.handleChange}/>
                    <select value={rate} onChange={this.handleChange} name="rate" >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <input type="date" value={readAt} name="date" onChange={this.handleChange}></input>
                    <textarea name="text" value={text} onChange={this.handleChange}></textarea>
                    <button>Post!</button>
                </form>
            </section>
        )
    }
}