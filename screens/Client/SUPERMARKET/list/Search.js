import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../../reducer/searchSlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../../../components/SUPERMARKET/sections/SearchBar';

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const searchHistory = useSelector(state => state.search.searchData).filter(item=>item.layout==='supermarket'); 

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const handleSearch = () => {
         navigation.navigate('search-results' , {query: searchQuery })
        dispatch(setSearch([...searchHistory , {
            searchQuery: searchQuery , layout: 'supermarket'
        }])); 
    };

    console.log('searchHistory' , searchHistory)

    const handleDelete = (query) => {
        // Logique pour supprimer un élément spécifique
        const filteredHistory = searchHistory.filter(item => item !== query);
        dispatch(setSearch(filteredHistory));

    };

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
            </View>
            
            {/* Historique des recherches */}
            <Text style={styles.historyTitle}>Historique des recherches :</Text>

          

            <FlatList 
            data={searchHistory}
             renderItem={({query})=>(
                      <TouchableOpacity onPress={()=>{
                     navigation.navigate('search-results' , {query: query.searchQuery })

                    }} key={index} style={styles.historyItem}>
                        {/* Icône d'historique */}
                        <Ionicons name="time-outline" size={20} color="#444" style={styles.historyIcon} />
                        
                        <Text style={styles.historyText}>{query.searchQuery}</Text>
                        
                        {/* Bouton de suppression */}
                        <TouchableOpacity onPress={() => handleDelete(query)}>
                            <Ionicons name="trash-outline" size={20} color="red" />
                        </TouchableOpacity>
                    </TouchableOpacity>
             )}
            />
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 40,
        width: '100%',
    },
    historyContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyItem: {
        flexDirection: 'row',       // Alignement en ligne
        alignItems: 'center',       // Aligner les éléments verticalement
        justifyContent: 'space-between',  // Espacer les éléments
        padding: 10,
        backgroundColor: '#f1f1f1',
        marginVertical: 5,
        borderRadius: 5,
    },
    historyIcon: {
        marginRight: 10,
    },
    historyText: {
        flex: 1,
    },
});
