import { createContext,  useReducer } from 'react';

const notificationReducer=(state,action)=>{
  switch(action.type){
    case 'SETADD':
      return `added ${action.payload}`
    case 'SETVOTE':
      return `voted ${action.payload}`
    case 'SETERROR':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state

  }
}

const NotificationContext = createContext()


export const NotificationContextProvider=(props)=>{
const [notification, notificationDispatch]=useReducer(notificationReducer,'')
return(<NotificationContext.Provider value={[notification,notificationDispatch]}>
  {props.children}
</NotificationContext.Provider>)

}


export default NotificationContext