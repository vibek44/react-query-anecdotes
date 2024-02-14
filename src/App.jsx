import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './services/communication'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }
  
  /*const result=useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll
  })*/
  const {isPending,isError,data,error}=useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll
  })
  
  if(isPending)
  return<p>Loading...</p>
  
  if(isError)
  return <p>Error : Anecdote service not available due to problems in server</p>
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App