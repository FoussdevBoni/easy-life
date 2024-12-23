
function calculeTotalToArray(dataArray , prop) {
    const total = dataArray.reduce((acc, element) => {
         return acc + parseFloat(element[prop])
    ;
}, 0);

 return total
}




export default calculeTotalToArray;

