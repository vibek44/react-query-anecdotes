import { useMutation,useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/communication'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const[ ,notificationDispatch]=useContext(NotificationContext)
  const queryClient= useQueryClient()
 
  const newAnecdoteMutation=useMutation({
    mutationFn:createAnecdote, 
    onSuccess:(newAnecdote)=>{
    //queryClient.invalidateQueries('anecdotes') // makes second async data request automatic updtae after invalidation
      const anecdotes=queryClient.getQueryData(['anecdotes'])//manulally updating  front state for optimization
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
    },
    onError:(error)=>{
      notificationDispatch({type:'SETERROR',payload:error.response.data.error})
    }
  })
 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    notificationDispatch({type:'SETADD', payload:content})
    setTimeout(()=>{
     notificationDispatch({type:'REMOVE'})
    },5000)
     //console.log(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm