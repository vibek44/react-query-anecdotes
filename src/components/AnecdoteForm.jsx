import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/communication'

const AnecdoteForm = () => {
  const queryClient= useQueryClient()
 
  const newAnecdoteMutation=useMutation({
    mutationFn:createAnecdote, 
    onSuccess:(newAnecdote)=>{
    //queryClient.invalidateQueries('anecdotes') // makes second async data request automatic updtae after invalidation
      const anecdotes=queryClient.getQueryData(['anecdotes'])//manulally updating  front state for optimization
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
    }
  })
 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
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