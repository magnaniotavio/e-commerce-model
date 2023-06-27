import {SetRoute} from "./SetRoutes";

/* Here we set the routes for the posts, according to their classification.
   This routes will be accessible in the main navigation bar and through links.
*/
export function Announcements() {
    return SetRoute("Announcement")
  }
  
export function Blogposts() {
    return SetRoute("Blogpost")
  }