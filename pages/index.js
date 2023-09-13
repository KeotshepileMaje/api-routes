import { useRef , useState} from 'react'

export default function HomePage() {
    const [feebackItems, setFeedbackItems] = useState([])
    const emailInputRef = useRef()
    const feedbackInputRef = useRef()

    function handlerSubmitForm(event) {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredFeedback = feedbackInputRef.current.value

        const reqBody = {
            email: enteredEmail, 
            text: enteredFeedback
        }
        
        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'content-Type': 'application/json'
            }
        })
            .then( res => res.json())
            .then( data => console.log(data))
    }
    function loadFeedbackHandler() {
        fetch('/api/feedback')
            .then( res => res.json())
            .then( data => setFeedbackItems(data.feedback))
    }

    return (
        <div>
            <h1>The Home page</h1>
            <form onSubmit={handlerSubmitForm}>
                <div>
                    <label htmlFor='email'>Your Email Address</label>
                    <input type='email' id='email' ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor='feedback'>Your Feedback</label>
                    <textarea 
                        type = 'feedback' 
                        id = 'feedback' 
                        ref = {feedbackInputRef}
                        rows = '5'
                    ></textarea>
                </div>
                <button>Submit</button>
            </form>
            <hr/>
            <button onClick={loadFeedbackHandler}>Load Feedback</button>
            <ul>
                {feebackItems.map(
                    (item) => <li key={item.id}>{item.text}</li>
                )}
            </ul>
        </div>
    )
}
