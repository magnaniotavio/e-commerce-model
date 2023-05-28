import SetProductRoutes from "./SetProductsRoutes"
import { MakeFilteredSearch } from "../searchComponents/FilteredSearch"

// Show products by classification
export function ShirtsRoute() {
  return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:ShirtM"]} />)
}
  export function TrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:TrouserM"]} />)
  }
  export function ShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Masculine", "classification:ShoeM"]} />)
  }
  export function FeminineShirtsRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:ShirtF"]} />)
  //  return SetProductRoutes("classification", "Shirt (Feminine)")
  }
  export function FeminineTrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:TrouserF"]} />)
  }
  export function FemininineShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Feminine", "classification:ShoeF"]} />)
  }
  export function KidsShirtsRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:ShirtK"]} />)
  }
  export function KidsTrousersRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:TrouserK"]} />)
  }
  export function KidsShoesRoute() {
    return (<MakeFilteredSearch selectedFilters={["targetPublic:Kids", "classification:ShoeK"]} />)
  }
  
