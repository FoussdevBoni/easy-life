import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";


import { StyleSheet } from "react-native";
import { colors } from "../../../../assets/colors/colors";
import Banner from "../../../../components/SUPERMARKET/sections/Banner";
import TabAppBar from "../../../../components/SUPERMARKET/sections/TabAppbar";
import ArticlesListSection from "../../../../components/SUPERMARKET/sections/ArticlesListSection";
import SupermarketListSection from "../../../../components/SUPERMARKET/sections/SupermarketsListSection";
import CategoriesListSection from "../../../../components/SUPERMARKET/sections/CategoriesListSection";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../../reducer/searchSlice";
import SearchBar from "../../../../components/SUPERMARKET/sections/SearchBar";
import Br from "../../../../components/widgets/Br/Br";
import ScrollingMessage from "../../../../components/COMMON/section/ScrollingMessage";

export default function Home({ user }) {
   const navigation = useNavigation();
   const cart = useSelector(state=>(state.cart.cartData))
   const favorites = useSelector(state=>(state.favorites.favoritesData))

   const coursesCart = cart.filter(item=>(item.layout==='supermarket'))
   const  articlesFavorites = favorites.filter(item=>(item.layout==='supermarket'))

   const handleNavigate = (screen) => {
     navigation.navigate(screen);
   };
   // Temporary badge counts
   const cartBadgeCount = coursesCart.length; // Example badge count for the cart
   const serviceBadgeCount = 0; 
   const favoritesBadgeCount = articlesFavorites.length
   const [searchQuery, setSearchQuery] = useState("");
    const searchHistory = useSelector(state => state.search.searchData); 
    const dispatch = useDispatch();
    const handleSearch = () => {
         navigation.navigate('search-results' , {query: searchQuery })
        dispatch(setSearch([...searchHistory , {searchQuery: searchQuery , layout: 'supermarket'}])); 
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabAppBar user={user} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Banner />
        
        <View style={styles.categoriesContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Catégories</Text>
            <TouchableOpacity  onPress={()=>{
              navigation.navigate('categories')
            }}>
              <Text style={styles.headerAction}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <CategoriesListSection horizontal={true}  />
        </View>

         <View >
           <ScrollingMessage message={`L'équipe d’easy Life vous souhaite bonne fête de fin d'année`}/>
         </View>
          
         <View style={styles.platContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Meilleurs offres</Text>
            <TouchableOpacity  onPress={() => {
                navigation.navigate("articles-list", { data: { title: "Meilleurs offres" , orderBy: 'note'  } });
              }}>
              <Text style={styles.headerAction}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <ArticlesListSection orderBy={'note'} horizontal={true} user={user} />
        </View>

          <View style={styles.platContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Produits populaires</Text>
            <TouchableOpacity  onPress={()=>{
              navigation.navigate('articles-list' , { data: { title: "Produits populaires" , orderBy: 'commandes' } })
            }}>
              <Text style={styles.headerAction}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <ArticlesListSection orderBy={'commandesNbr'} horizontal={true} user={user} />
        </View>

         <View style={styles.restoContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Super-marchés proches</Text>
            <TouchableOpacity  onPress={()=>{
              navigation.navigate('supermarkets-list')
            }}>
              <Text style={styles.headerAction}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <SupermarketListSection location={100}  horizontal={true} user={user} />
        </View>

         <View style={styles.platContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Nouveau sur Easy-life</Text>
            <TouchableOpacity  onPress={()=>{
              navigation.navigate('articles-list')
            }}>
              <Text style={styles.headerAction}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <ArticlesListSection horizontal={true} user={user} />
        </View>
       <Br size={80}/>
      </ScrollView>

         <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.tabButtonActive}>
                      <View style={styles.activeIconWrapper}>
                        <Image
                          source={require("../../../../assets/images/icons/home.png")}
                          style={styles.activeTabIcon}
                        />
                      </View>
                    </TouchableOpacity>
            
                    {/* Cart Icon with Badge */}
                    <TouchableOpacity style={styles.tabButton} onPress={() => handleNavigate("cart")}>
                      <View>
                        <Image
                          source={require("../../../../assets/images/icons/cart.png")}
                          style={styles.tabIcon}
                        />
                        {cartBadgeCount > 0 && (
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartBadgeCount}</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
            
                    {/* Service Icon with Badge */}
                    <TouchableOpacity style={styles.tabButton} onPress={() => handleNavigate("chat-box")}>
                      <View>
                        <Image
                          source={require("../../../../assets/images/icons/service.png")}
                          style={styles.tabIcon}
                        />
                        {serviceBadgeCount > 0 && (
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>{serviceBadgeCount}</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.tabButton} onPress={() => handleNavigate("favorites")}>
                      <Image
                        source={require("../../../../assets/images/icons/heart-outline.png")}
                        style={styles.tabIcon}
                      />
                       {favoritesBadgeCount > 0 && (
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>{favoritesBadgeCount}</Text>
                          </View>
                        )}
                    </TouchableOpacity>
                  </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 20,
  },
  restoContainer: {
    marginBottom: 20,
  },
  platContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary
  },
  headerAction: {
    fontSize: 14,
    color: '#007BFF',
  },
  
  
  // Bottom bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
  tabButtonActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: 50,
    padding: 10,
  },
  activeIconWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  activeTabIcon: {
    width: 35,
    height: 35,
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#F9690E",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
