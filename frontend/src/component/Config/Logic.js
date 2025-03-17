export const isPresentInFavorites=(favorites, restaurant)=>{
    if (!Array.isArray(favorites)) {
        console.error('Favorites is not an array:', favorites);
        return false; 
      }
    for(let item of favorites){
        if(restaurant.id === item.id){
            return true;
        }
    }
    return false;
}