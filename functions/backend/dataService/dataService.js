export const firestoreService = {

     getCategories  (data) {
    const filtered = data.filter(item => item.layout === 'restaurant');

    const uniqueCategories = filtered.filter(
      (item, index, self) => index === self.findIndex((t) => t.nom.trim() === item.nom.trim())
    );

 
  },

  getRestaurant(){
    
  }

 
}