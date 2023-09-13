import fs from 'fs'
import path from 'path'
/**
 * 
 * @returns fefeef
 */
export function buildFeedbackPath () {
    return path.join(process.cwd(), 'data', 'feedback.json')
}
export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data= JSON.parse(fileData)
    return data
}