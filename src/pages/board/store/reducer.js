
const defaultState = {
    isShowBoard:false,
    boardId:'1',
    boardTitle:'board-title',
    listId:[]
}

export default (state=defaultState, action) => {
    switch(action.type){
        case 'getBoardId':
                return Object.assign({},state,{
                    boardId:action.boardId,
                })
        case 'isShowBoard':
            return Object.assign({},state,{
                isShowBoard:action.isShowBoard,
            })
        default:
            return state
    }
}