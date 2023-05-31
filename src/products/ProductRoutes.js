import { MakeFilteredSearch } from "../searchComponents/FilteredSearch"

// Show products by classification
export function ShirtsRoute() {
  return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:ShirtM"]} isMainRoute={'yes'} />)
}
  export function TrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:TrouserM"]} isMainRoute={'yes'} />)
  }
  export function ShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:ShoeM"]} isMainRoute={'yes'} />)
  }
  export function FeminineShirtsRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:ShirtF"]} isMainRoute={'yes'} />)
  //  return SetProductRoutes("classification", "Shirt (Feminine)")
  }
  export function FeminineTrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:TrouserF"]} isMainRoute={'yes'} />)
  }
  export function FemininineShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:ShoeF"]} isMainRoute={'yes'} />)
  }
  export function KidsShirtsRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:ShirtK"]} isMainRoute={'yes'} />)
  }
  export function KidsTrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:TrouserK"]} isMainRoute={'yes'} />)
  }
  export function KidsShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:ShoeK"]} isMainRoute={'yes'}  />)
  }
  
