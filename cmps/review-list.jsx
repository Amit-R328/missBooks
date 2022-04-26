
import { ReviewPreview } from "./review-preview.jsx";

export function ReviewList(props){

    return (
        <section className="review-list">
            <h2>Reviews</h2>
            {props.reviews.content.map((review, idx) => <ReviewPreview review={review} key={idx} removeReview={props.removeReview}/>
            )}
        </section>
    )
}