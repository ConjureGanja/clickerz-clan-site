# POH planner

The planner is a client-side page at `/poh-planner`. Room stats come from the OSRS Wiki (level, coin cost, and which sides have doors). Layouts stay in this browser (`localStorage` key `clickerz-poh-planner-v1`) and can be exported as JSON. `public/poh-planner.html` is the same tool with the script and styles inlined, so it opens without the rest of the site.

North is the top of the 9×9 grid. Rotation is clockwise, and it turns the room art and its doors together. A gold bar on a shared edge means both rooms have a door there. A red diamond means one side is a door and the other is a wall.

The ground floor is the only grid you can edit. Saved files already have `floors.upper` and `floors.dungeon` arrays so those storeys can be added without changing the file format.

## Regenerate the offline file

```bash
npm install
npm run build:poh-html
```

That writes `public/poh-planner.html`.

## Add furniture tiers later

Each room in `src/poh/rooms.js` has a `hotspots` array. A hotspot looks like this:

```js
{
  id: "altar",
  name: "Altar",
  anchor: { x: 50, y: 22 },
  anchorVerified: false,
  anchorNote: "Why this point was chosen.",
  tiers: [
    { id: "gilded-altar", name: "Gilded altar", level: 75, source: "https://oldschool.runescape.wiki/w/Chapel", verified: true }
  ]
}
```

`tiers` currently holds only the max build. To offer a selector:

1. Append the lower options to `tiers`, cheapest first or highest first, and set `verified: true` when the name and level are copied from that hotspot's wiki table.
2. Store the picked tier on the placed room, for example `{ uid, roomId, x, y, rotation, tiers: { altar: "oak-altar" } }`. Old saves have no `tiers` field; treat a missing id as the last entry (the max).
3. In the room's SVG (`src/poh/art/Chapel.jsx` and the others), the furniture is already a `<g data-hotspot="altar">`. Swap that group's drawing based on the selected tier id. The door frame stays in `DoorWalls` and should not change with the tier.
4. Add up furniture coin costs in `layoutStats` if you want the readout to include them. Today it sums room build costs only.

Door sides live on the room as `doors: ["N", "E", "S", "W"]` in the wiki's default orientation. Do not bake doors into a single rotated image; `geometry.js` turns those sides, and the SVG is rotated by the same amount.
