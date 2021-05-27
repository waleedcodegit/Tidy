
const current_state = {
    user:{data:{},is_login:false},
    services_modal:false,
    vendor:{is_login:false,data:{}}
}
const reducer = (state = current_state,action) =>{
    if(action.type == 'CHANGE_USER'){
        return {
            ...state,
            user:action.payload
        }
    }else if(action.type == 'CHANGE_SERVICES_MODAL'){
        return {
            ...state,
            services_modal:action.payload
        }
    }else if(action.type == 'CHANGE_VENDOR'){
        return {
            ...state,
            vendor:action.payload
        }
    }
   
    return state;
}

export default reducer;