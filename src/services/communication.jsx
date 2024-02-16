import axios from 'axios'
const baseUrl='http://localhost:3001/anecdotes'

export const getAll=()=>axios.get(baseUrl)
  .then(res=>res.data)

export const createAnecdote=(newObject)=>axios.post(baseUrl,newObject)
  .then(res=>res.data)

export const voteAnecdote=(votedAnecdote)=>axios.put(`${baseUrl}/${votedAnecdote.id}`,votedAnecdote)
  .then(res=>res.data)




