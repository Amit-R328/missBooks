
export function ReviewPreview(props){
    return (
        <article className="review-preview" key={review.key}>
            <button className="remove-btn" onClick={() => props.removeReview(review.key)}>X</button>
            <div className="user">
                {props.review.byUser}    
            </div> 
            <div>
                {props.review.rate}
                {props.review.readAt}
            </div>
            <div className="review-content">
                {props.review.text}
            </div>
        </article>
    )
}