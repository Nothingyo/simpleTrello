// export const addBoard = value => ({
//     type: 'addBoard',
//     isAddBoard: false,
//     value
// })

export const closeAddBoard = () =>({
    type:'closeAddBoard',
    isAddBoard:false
})

export const openAddBoard = () => ({
    type: 'openAddBoard',
    isAddBoard: true
})
