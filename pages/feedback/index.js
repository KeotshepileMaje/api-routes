import { buildFeedbackPath, extractFeedback } from "@/helpers/api-utils"
import { useState, Fragment } from 'react'

export default function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState()
    const {feedbackItems} = props

    function loadFeedbackhandler(id){
        fetch(`/api/feedback/${id}`)
            .then( res => res.json())
            .then( data => setFeedbackData(data.feedback))
    }
    console.log(feedbackData)

    return (
        <Fragment>
            <div>
                {feedbackData && <p>{feedbackData.email}</p>}
            </div>
            <ul>
                {feedbackItems.map(
                    (item) => (
                        <li key={item.id}>
                            <span>{item.text}</span>
                            <button onClick={loadFeedbackhandler.bind(null, item.id)}>Show More Details</button>
                        </li>
                    )
                )}
            </ul>
        </Fragment>
    )
}

export async function getStaticProps() {
    const fileData = buildFeedbackPath()
    const data = extractFeedback(fileData) 

    return {
        props: {
            feedbackItems: data
        },

    }
}