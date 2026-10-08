# POH planner

The planner is a client-side page at `/poh-planner`. Room shells and furniture come from the OSRS Wiki (Construction level, materials, coin cost, and which sides have doors). Layouts stay in this browser (`localStorage` key `clickerz-poh-planner-v1`) and can be exported as JSON. `public/poh-planner.html` is the same tool with the script and styles inlined, so it opens without the rest of the site.

North is the top of the 9×9 grid. Rotation is clockwise, and it turns the room art and its doors together. A gold bar on a shared edge means both rooms have a door there. A red diamond means one side is a door and the other is a wall.

The build cost adds every room shell and the furniture tier selected in each hotspot. Coin figures are Grand Exchange prices from the wiki fetch on 2026-09-27, so they will drift from the live prices. A few rows (usually nails) are a range; those are not added into the total.

## Floors

Use the floor tabs above the grid.

**Ground floor.** Indoor and outdoor rooms. This is the only floor where gardens can be built.

**Upper floor.**

1. Build a staircase in a skill hall or a quest hall. Open that room and set the Stairs hotspot to Oak staircase, Teak staircase, a spiral, or a marble staircase. Stairs start empty.
2. Switch to Upper floor. The cell above that hall is marked Stairs.
3. Place the first upstairs room on that cell.
4. Further upstairs rooms must touch a room you already placed up there, and the cell under them must be an indoor ground room. You cannot build over a garden, formal garden, superior garden, or outdoor menagerie. The indoor menagerie can hold a room above it.

**Dungeon.**

1. On the ground floor, set the centrepiece of a garden or formal garden to Dungeon entrance.
2. Switch to Dungeon. The cell under that garden is marked Entrance.
3. Place the first dungeon room (corridor, junction, stairs, oubliette, or treasure room) on that cell.
4. After that, dungeon rooms can extend north, east, south, or west, including onto tiles with nothing built above them.

In the game, a staircase in a skill hall or quest hall can also open a dungeon. This planner starts the dungeon from a dungeon entrance only. Hall staircases are what open the upper floor.

Removing the only staircase, or the only dungeon entrance a wing depends on, is refused while those rooms are still there. Removing the ground room under an upstairs room is refused too.

## Furniture

Select a room, then use the dropdown on each hotspot. Every option lists the Construction level, the materials, and the coin cost from that hotspot's wiki table. "Nothing built" clears the hotspot. The drawing shrinks for a lower-level choice and hides when the hotspot is empty. The art itself stays the room's usual top-down picture.

Defaults: the highest option is selected, except staircases and dungeon entrances (those start empty) and a garden centrepiece (that starts as the exit portal).

The study's tea marker is a clan-guide note, not a wiki hotspot, so it has no build table.

## Regenerate the offline file

```bash
npm install
npm run build:poh-html
```

That writes `public/poh-planner.html`.

## How a layout is stored

```js
{
  version: 1,
  name: "G I Clickerz Team House",
  activeFloor: "ground",
  floors: {
    ground: [
      { uid: "ch", roomId: "chapel", x: 4, y: 4, rotation: 3, built: { altar: "gilded-altar" } }
    ],
    upper: [],
    dungeon: []
  }
}
```

`built` maps a hotspot id to a tier id from `src/poh/furniture.js`. An empty string means nothing is built. If `built` or a hotspot key is missing, the planner uses the default described above. Old saves from the ground-only planner still load.

Door sides live on the room as `doors: ["N", "E", "S", "W"]` in the wiki's default orientation. `geometry.js` turns those sides, and the SVG is rotated by the same amount.

To refresh the furniture tables, fetch each room page with `action=parse&prop=text` and rebuild `src/poh/furniture.js`. Hotspot ids in `src/poh/rooms.js` are the keys (`roomId:hotspotId`).
