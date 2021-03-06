
const defaultState = {
    boardId: 1,
    isSearch:false
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'searchBoard':
            return Object.assign({},state,{
                boardId:action.value,
                isSearch:true
            })
        default:
            return state
    }
}