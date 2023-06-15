import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  domainOfApi:'https://yog-power-api.vercel.app',
  stockDataClothData:[],
  clothStockDataClearFun:()=>{},
  stockDataAuravedaData:[],
  auravedaStockDataClearFun:()=>{},
  stockDataFitnessProduct:[],
  fitnessDataClearFun:()=>{},
  stockDataFoodProduct:[],
  foodProductDataClearFun:()=>{},
  genralProduct:[],
  genralProductDataClearFun:()=>{},

}

function toConfirmBooking(state,id){
return   state.map((el)=>{
    if(el._id===id){
      return {...el,toInvoice:true}
    }
    return el
})
}

function toPreserveValOFInvoce(prevstate,newState){

 return  newState.map((el)=>{
   const obj =   prevstate.find((el2)=>el2._id===el._id)
    if(obj){
      return {...obj,item:el.item}
    }
    return el
  })
}

const toPreventToAdd = (data) =>{
return data?.some((el)=>el?.toInvoice)
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }

    // To ClothProduct 
     case 'add Stock':
      if(!toPreventToAdd(state.stockDataClothData)){
        state.stockDataClothData=  toPreserveValOFInvoce(state.stockDataClothData,rest.payload.item)  
      }
      state.clothStockDataClearFun = rest.payload.fun 
     return  { ...state, ...rest }
     case 'update add Stock':
      state.stockDataClothData=toConfirmBooking(state.stockDataClothData,rest.payload)
     return  { ...state, ...rest }
  
     
     // To AuravedaProduct 
     case 'add Auraveda':
      if(!toPreventToAdd(state.stockDataAuravedaData)){
        state.stockDataAuravedaData=toPreserveValOFInvoce(state.stockDataAuravedaData,rest.payload.item)
      }
      state.auravedaStockDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update Aurveda Product':
     state.stockDataAuravedaData=toConfirmBooking(state.stockDataAuravedaData,rest.payload)
     return  { ...state, ...rest }
     

     // To Fitness Product 
     case 'add fitnessProduct':
      if(!toPreventToAdd(state.stockDataFitnessProduct)){
        state.stockDataFitnessProduct=toPreserveValOFInvoce(state.stockDataFitnessProduct,rest.payload.item)
      }
      state.fitnessDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update fitnessProduct Product':
     state.stockDataFitnessProduct=toConfirmBooking(state.stockDataFitnessProduct,rest.payload)
     return  { ...state, ...rest }


    // To Food Product 
     case 'add foodProduct':
     if(!toPreventToAdd(state.stockDataFoodProduct)){
      state.stockDataFoodProduct=toPreserveValOFInvoce(state.stockDataFoodProduct,rest.payload.item)
    }
     state.foodProductDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update foodProduct Product':
     state.stockDataFoodProduct=toConfirmBooking(state.stockDataFoodProduct,rest.payload)
     return  { ...state, ...rest }
    


    // To genral Product 
    case 'add genral Product':
    if(!toPreventToAdd(state.genralProduct)){
        state.genralProduct=toPreserveValOFInvoce(state.genralProduct,rest.payload.item)
    }
    state.genralProductDataClearFun= rest.payload.fun 
    return  { ...state, ...rest }
    case 'update genral Product':
    state.genralProduct=toConfirmBooking(state.genralProduct,rest.payload)
    return  { ...state, ...rest }


    // clear all store 
    case 'clear Stock':
      state.stockDataClothData=[]
      state.stockDataAuravedaData=[]
      state.stockDataFitnessProduct=[]
      state.stockDataFoodProduct=[]
      state.genralProduct=[]
      return  { ...state, ...rest }

     default:
     return state
  } 

}




const store = createStore(changeState)



export default store
