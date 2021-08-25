
const current_state = {
    user:{data:{},is_login:false,is_apicall:false},
    services_modal:false,
    vendor:{is_login:false,data:{}},
    booking_step:1,
    select_service_state:{},
    add_information:{},
    auth_type:'login',
    customer_location:{}
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
    }else if(action.type == 'CHANGE_BOOKING_STEP'){
        window.scrollTo(0,0);
        return {

            ...state,
            booking_step:action.payload
        }
    }
    else if(action.type == 'CHANGE_SELECT_SERVICE'){
        console.log(action.payload)
        return {
            ...state,
            select_service_state:action.payload
        }
    }
    else if(action.type == 'ADD_INFORMATION'){
        console.log(action.payload)
        return {
            ...state,
            add_information:action.payload
        }
    }
    else if(action.type == 'CHANGE_AUTH_TYPE'){
        console.log(action.payload)
        return {
            ...state,
            auth_type:action.payload
        }
    }
    else if(action.type == 'CHANGE_CUSTOMER_LOCATION'){
        return {
            ...state,
            customer_location:action.payload
        }
    }
    return state;
}

export default reducer;