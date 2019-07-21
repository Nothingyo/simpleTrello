
const defaultState = {
    isLogin: false,
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'changeLogin':
            return Object.assign({},state,{
                isLogin:action.value
            })
        case 'logout':
            localStorage.clear()
            return Object.assign({},state,{
                isLogin:false,
            })
        default:
            return state
    }
}