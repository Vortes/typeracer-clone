import words from '../commonWords.json'

const getRandomParagraph = (numberOfWords) => { 
    return words.sort(() => Math.random() - Math.random()).slice(0, numberOfWords)
}

export default getRandomParagraph