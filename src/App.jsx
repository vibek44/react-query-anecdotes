import  Anecdote  from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { getAll,voteAnecdote } from './services/communication'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'


const App = () => {
  const queryClient=useQueryClient()
  const [,notificationDispatch]=useContext(NotificationContext)

  const result=useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll,
    retry:false,
    refetchOnWindowFocus:false
  })

  const voteAnecdoteMutation=useMutation({
    mutationFn:voteAnecdote,
    onSuccess:(changedAnecdote)=>{
    //queryClient.invalidateQueries('anecdotes')//automatic updating but increases server work load
      const anecdotes=queryClient.getQueryData(['anecdotes']) //manual code but lessen server workload(optimization)
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(anecdote=>anecdote.id!==changedAnecdote.id
          ?anecdote
          :changedAnecdote
        )
      )
    }
  })
  /*const {isPending,isError,data,error}=useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll,
    retry:false //prevent  useQuery from doing multiple request
  })*/
  //console.log(JSON.parse(JSON.stringify(result)))

  const handleVote = (anecdote) => {
    const votedAnecdote={...anecdote,votes:anecdote.votes+1}
    voteAnecdoteMutation.mutate(votedAnecdote)
    notificationDispatch({type:'SETVOTE',payload: anecdote.content})
    setTimeout(()=>{
      notificationDispatch({type:'REMOVE'})
    },5000)
  }
  
  if(result.isPending)
  return<p>Loading...</p>
  
  if(result.isError)
  return <p>Error : Anecdote service not available due to problems in server</p>
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />  
      {result.data.map(anecdote => 
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          handleVote={handleVote}/>
      )} 
    </div>
  )
}

export default App