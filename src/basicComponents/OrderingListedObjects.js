/* The functions below will be used wheneve we wish to present a simple list of objects,
   and order them according to specific properties, e.g., ordering posts by creation date */

/* This function does a simple sorting operation. Numbers must be sorted in descending order,
   while strings must be sorted in ascending order */
export function sortProductsFromFirstToLast(listItens, prop) {
    if (typeof prop == "number") {
    return listItens.sort((item1, item2) => {
        // Compare the property values of two posts and sort them in descending order
      if (item1[prop] > item2[prop]) {
        return -1;
      } else if (item1[prop] < item2[prop]) {
        return 1;
      } else {
        return 0;
      }
    });}

    if (typeof prop == "string") {
      return listItens.sort((item1, item2) => {
        // Compare the property values of two posts and sort them in ascending (A-Z) order
        if (item1[prop] < item2[prop]) {
          return -1;
        } else if (item1[prop] > item2[prop]) {
          return 1;
        } else {
          return 0;
        }
      });}
  }

/* Allows the user to change the way the posts are sorted according to the parameter setOrderCriterion,
   which will change the state of the ordering in the component; initially, all components which are lists of objects
   will have their sorting criterion set to 'creationDate', but this will be changeable through this function. */
export function changeSortingCriterion(event, sortingCriterion, setOrderCriterion) {
  event.preventDefault();
  // Set the new sorting criterion by calling the provided function with the sorting criterion parameter
  setOrderCriterion(sortingCriterion)
}

// This simply shows the sorted list
export function shownDataList(orderingFunction, retrievedData, Component) {
    // Sorts the objects
    const sortedData = sortProductsFromFirstToLast(retrievedData, orderingFunction);
    const dataList = sortedData.map((currentData, i) => (
      <Component data={currentData} key={i} />
    )); 
    return dataList;
  }
    

    