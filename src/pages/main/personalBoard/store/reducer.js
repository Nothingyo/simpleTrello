
const defaultState = {
    isAddBoard:false,
    boards: [],
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'openAddBoard':
                return Object.assign({},state,{
                    isAddBoard:action.isAddBoard,
                })
        // case 'addBoard':
        //     return Object.assign({},state,{
        //         isAddBoard:action.isAddBoard,
        //         boards:action.value
        //     })
        case 'closeAddBoard':
            return Object.assign({},state,{
                isAddBoard:action.isAddBoard,
            })
        default:
            return state
    }
}