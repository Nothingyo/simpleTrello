
const defaultState = {
    isLogin: false,
    email:'1121181966@qq.com',
    password:'12345',
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'changeLogin':
            return Object.assign({},state,{
                isLogin:action.value
            })
        default:
            return state
    }
}