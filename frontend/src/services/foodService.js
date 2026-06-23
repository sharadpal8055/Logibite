import api from './api'
export const getFoods=()=>{
  
return  api.get('/foods/all')
}
export const getFood=(id)=>{
 return api.get(`/foods/${id}`);
}
export const getRestaurantFoods = (id) =>
  api.get(`/foods/restaurant/${id}`);