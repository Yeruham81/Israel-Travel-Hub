import { guideDirectory } from "./travelGuides";

/** Explicitly chosen contextual readings for visitors browsing Israel events. */
const related = [
  {id:"israel-holidays",note:"Check dates that may affect public transport, opening hours and travel plans."},
  {id:"bestTime",note:"Compare seasons, weather and visitor crowds before choosing travel dates."},
  {id:"telAvivMuseums",note:"Find major museums and exhibition spaces around Tel Aviv."},
  {id:"haifaMuseums",note:"Explore Haifa's museums and plan a cultural stop in the north."},
  {id:"jerusalem",note:"Plan time for Jerusalem's historic quarters, sights and neighbourhoods."},
  {id:"food",note:"Explore local dishes and food traditions to try during your trip."},
  {id:"telAvivDayTrips",note:"Add an easy day trip from Tel Aviv between festival or event days."},
  {id:"israel",note:"Plan travel to late-night events and between cities using local transport."},
] as const;

export const EVENT_RELATED_GUIDES = related.flatMap(({id,note})=>{
  const guide=guideDirectory.find(item=>item.id===id&&item.photo);
  return guide?[{id,title:guide.title,to:guide.to,photo:guide.photo!,note}]:[];
});
