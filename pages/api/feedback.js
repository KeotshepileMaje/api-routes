import fs from 'fs'
import { buildFeedbackPath, extractFeedback } from "@/helpers/api-utils"


export default function handler(req, res){
    if (req.method === 'POST') {
        const email = req.body.email
        const feedbackText = req.body.text

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }

        // Store that in a database or in a file
        const filePath = buildFeedbackPath()
        const data= extractFeedback(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({ message: 'Success!', feedback: newFeedback})

    } else {
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({feedback: data})
    }
}

