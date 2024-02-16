const Anecdote=({anecdote,handleVote})=>{
return(
  <>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote)}>vote</button>
    </div>
  </>
)
}

export default Anecdote