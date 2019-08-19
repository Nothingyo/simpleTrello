
const defaultState = {
    boardId: 1,
    isSearch:false
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'searchBoard':
            return Object.assign({},state,{
                isSearch:action.isSearch
            })
        default:
            return state
    }
}