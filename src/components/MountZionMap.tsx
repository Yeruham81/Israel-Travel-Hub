import { useState } from "react";

export function MountZionMap() {
  const [selected, setSelected] = useState("Mount Zion");
  return <div><button type="button" onClick={() => setSelected("Zion Gate")}>{selected}</button></div>;
}
