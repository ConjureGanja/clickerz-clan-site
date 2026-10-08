import { useEffect, useMemo, useRef, useState } from "react";
import { ROOM_ART } from "./art";
import { BuiltFurniture } from "./art/RoomSvg";
import { GI_CLICKERZ_LAYOUT, cloneLayout, emptyLayout } from "./exampleLayout";
import { cellHint, floorProblems, roomAllowedOnFloor } from "./floors";
import { edgeState, layoutStats, rotatePoint, rotatedSides } from "./geometry";
import { newUid, normalizeLayout } from "./layout";
import "./poh.css";
import {
  FLOORS,
  GRID_SIZE,
  ROOM_BY_ID,
  ROOMS,
  doorLabel,
  formatCoins,
} from "./rooms";
import { readStore, writeStore } from "./storage";
import { formatMaterials, formatTierCost, selectedTier, tierChoice } from "./tiers";

const GROUPS = [
  { id: "outdoor", label: "Outdoor" },
  { id: "indoor", label: "Indoor" },
  { id: "dungeon", label: "Basement" },
];

const FLOOR_RULES = {
  ground: "Ground floor: indoor and outdoor rooms. A staircase in a skill hall or quest hall is what lets you start the floor above. A dungeon entrance, built as the centrepiece of a garden or formal garden, is what lets you start the dungeon.",
  upper: "Upper floor: put the first room on top of a skill hall or quest hall that already has a staircase. Further rooms have to touch that upper floor, and they can only sit on indoor rooms — not on a garden, formal garden, superior garden, or outdoor menagerie.",
  dungeon: "Dungeon: put the first room directly under a garden or formal garden whose centrepiece is a dungeon entrance. After that, dungeon rooms can extend in any direction, including under empty tiles. In game a hall staircase can also open a dungeon; this planner starts the dungeon from a dungeon entrance only.",
};

function groupOf(room) {
  if (room.placement.floors.length === 1 && room.placement.floors[0] === "dungeon") return "dungeon";
  if (room.placement.outdoor) return "outdoor";
  return "indoor";
}

function initialStore() {
  const stored = readStore();
  if (stored?.current) {
    const current = normalizeLayout(stored.current);
    if (current) {
      return {
        current,
        saved: Array.isArray(stored.saved) ? stored.saved : [],
      };
    }
  }
  return { current: cloneLayout(GI_CLICKERZ_LAYOUT), saved: [] };
}

export default function PohPlannerApp() {
  const [store, setStore] = useState(initialStore);
  const [selectedUid, setSelectedUid] = useState("ch");
  const [armedId, setArmedId] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Drag a room onto the grid, or select one and click a tile.");
  const [hoverCell, setHoverCell] = useState(null);
  const fileRef = useRef(null);
  const layout = store.current;
  const floorId = ["ground", "upper", "dungeon"].includes(layout.activeFloor) ? layout.activeFloor : "ground";
  const ground = layout.floors.ground;
  const placed = layout.floors[floorId];

  useEffect(() => {
    let active = true;
    try {
      writeStore(store);
    } catch {
      Promise.resolve().then(() => {
        if (active) setStatus("Changes are only in this session; browser storage is unavailable.");
      });
    }
    return () => {
      active = false;
    };
  }, [store]);

  const selected = placed.find((piece) => piece.uid === selectedUid) || null;
  const selectedRoom = selected ? ROOM_BY_ID[selected.roomId] : null;
  const stats = layoutStats(layout.floors, ROOM_BY_ID);

  const warnings = useMemo(() => {
    const counts = {};
    const notes = [];
    for (const list of [layout.floors.ground, layout.floors.upper, layout.floors.dungeon]) {
      for (const piece of list) {
        const room = ROOM_BY_ID[piece.roomId];
        if (!room?.uniqueGroup) continue;
        counts[room.uniqueGroup] = (counts[room.uniqueGroup] || 0) + 1;
      }
    }
    for (const [group, count] of Object.entries(counts)) {
      if (count > 1) {
        const name = ROOMS.find((room) => room.uniqueGroup === group)?.name || group;
        notes.push(`More than one ${name.replace(" (indoor)", "").replace(" (outdoor)", "")} — the game only allows one.`);
      }
    }
    return notes;
  }, [layout.floors]);

  function commit(nextLayout, message) {
    setStore((prev) => ({ ...prev, current: nextLayout }));
    if (message) setStatus(message);
  }

  function commitFloors(nextFloors, message, clearPreset) {
    const problems = floorProblems(nextFloors, ROOM_BY_ID);
    if (problems.length) {
      setStatus(problems[0]);
      return false;
    }
    commit(
      {
        ...layout,
        presetId: clearPreset ? null : layout.presetId,
        flow: clearPreset ? [] : layout.flow,
        floors: nextFloors,
      },
      message,
    );
    return true;
  }

  function editPlaced(mutator, message, clearPreset = false) {
    const nextList = mutator(placed.map((piece) => ({ ...piece, built: piece.built ? { ...piece.built } : undefined })));
    return commitFloors({ ...layout.floors, [floorId]: nextList }, message, clearPreset && floorId === "ground");
  }

  function placeRoom(roomId, x, y) {
    const room = ROOM_BY_ID[roomId];
    if (!roomAllowedOnFloor(room, floorId)) {
      setStatus(`${room?.name || "That room"} cannot be built on this floor.`);
      return;
    }
    const occupied = placed.find((piece) => piece.x === x && piece.y === y);
    if (occupied) {
      setSelectedUid(occupied.uid);
      setStatus("That tile already has a room. Move it, or pick an empty tile.");
      return;
    }
    const piece = { uid: newUid(), roomId, x, y, rotation: 0 };
    if (editPlaced((rooms) => [...rooms, piece], `Placed ${room.name}.`, true)) {
      setSelectedUid(piece.uid);
      setArmedId(null);
    }
  }

  function moveRoom(uid, x, y) {
    const moving = placed.find((piece) => piece.uid === uid);
    if (!moving) return;
    if (moving.x === x && moving.y === y) return;
    const occupied = placed.find((piece) => piece.x === x && piece.y === y);
    if (editPlaced((rooms) => {
      if (!occupied) {
        return rooms.map((piece) => (piece.uid === uid ? { ...piece, x, y } : piece));
      }
      return rooms.map((piece) => {
        if (piece.uid === uid) return { ...piece, x, y };
        if (piece.uid === occupied.uid) return { ...piece, x: moving.x, y: moving.y };
        return piece;
      });
    }, occupied ? "Swapped the two rooms." : "Moved the room.", true)) {
      setSelectedUid(uid);
    }
  }

  function rotateRoom(uid) {
    editPlaced(
      (rooms) => rooms.map((piece) => (piece.uid === uid ? { ...piece, rotation: (piece.rotation + 1) % 4 } : piece)),
      "Rotated 90° clockwise. Doors turn with the room.",
      true,
    );
  }

  function deleteRoom(uid) {
    const piece = placed.find((room) => room.uid === uid);
    if (editPlaced(
      (rooms) => rooms.filter((room) => room.uid !== uid),
      piece ? `Removed ${ROOM_BY_ID[piece.roomId]?.name || "room"}.` : "Removed.",
      true,
    ) && selectedUid === uid) {
      setSelectedUid(null);
    }
  }

  function setTier(uid, spotId, tierId) {
    const piece = placed.find((room) => room.uid === uid);
    const room = piece ? ROOM_BY_ID[piece.roomId] : null;
    const spot = room?.hotspots.find((entry) => entry.id === spotId);
    if (!spot) return;
    if (tierId && !spot.tiers.some((tier) => tier.id === tierId)) return;
    const picked = spot.tiers.find((tier) => tier.id === tierId);
    editPlaced(
      (rooms) => rooms.map((entry) => (
        entry.uid === uid ? { ...entry, built: { ...(entry.built || {}), [spotId]: tierId } } : entry
      )),
      picked ? `Set ${spot.name} to ${picked.name}.` : `Cleared ${spot.name}.`,
      false,
    );
  }

  function showFloor(nextFloor) {
    commit({ ...layout, activeFloor: nextFloor }, null);
    setArmedId(null);
    setStatus(FLOOR_RULES[nextFloor]);
  }

  const actions = useRef({});
  useEffect(() => {
    actions.current = { selected, rotateRoom, deleteRoom, moveRoom };
  });

  useEffect(() => {
    function onKey(event) {
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const current = actions.current;
      if (!current.selected) return;
      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        current.rotateRoom(current.selected.uid);
      } else if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        current.deleteRoom(current.selected.uid);
      } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const step = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[event.key];
        const x = current.selected.x + step[0];
        const y = current.selected.y + step[1];
        if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) current.moveRoom(current.selected.uid, x, y);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onDropCell(event, x, y) {
    event.preventDefault();
    setHoverCell(null);
    const uid = event.dataTransfer.getData("text/poh-uid");
    const roomId = event.dataTransfer.getData("text/poh-room");
    if (uid) moveRoom(uid, x, y);
    else if (roomId && ROOM_BY_ID[roomId]) placeRoom(roomId, x, y);
  }

  function onCellClick(x, y) {
    const occupied = placed.find((piece) => piece.x === x && piece.y === y);
    if (armedId && !occupied) {
      placeRoom(armedId, x, y);
      return;
    }
    setSelectedUid(occupied ? occupied.uid : null);
    if (occupied && armedId) setStatus("That tile is full. The room there is selected.");
  }

  function loadPreset() {
    commit(cloneLayout(GI_CLICKERZ_LAYOUT), "Loaded the G I Clickerz team house.");
    setSelectedUid("ch");
  }

  function loadSaved(id) {
    const found = store.saved.find((entry) => entry.id === id);
    if (!found) return;
    const next = normalizeLayout(found.layout);
    if (!next) {
      setStatus("That save could not be read.");
      return;
    }
    commit(next, `Loaded “${next.name}”.`);
    setSelectedUid(null);
  }

  function saveNamed() {
    const name = layout.name.trim() || "Untitled layout";
    const entry = {
      id: newUid(),
      name,
      savedAt: new Date().toISOString(),
      layout: { ...cloneLayout(layout), name },
    };
    setStore((prev) => {
      const without = prev.saved.filter((item) => item.name !== name);
      return {
        current: { ...prev.current, name },
        saved: [entry, ...without].slice(0, 24),
      };
    });
    setStatus(`Saved “${name}” in this browser.`);
  }

  function clearLayout() {
    const occupied = layout.floors.ground.length + layout.floors.upper.length + layout.floors.dungeon.length;
    if (occupied && !window.confirm("Clear every room on the ground floor, upper floor, and dungeon?")) return;
    commit(emptyLayout("Untitled layout"), "Cleared the ground floor. Upper and dungeon lists were cleared too.");
    setSelectedUid(null);
    setArmedId(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const slug = (layout.name || "poh-layout").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = url;
    link.download = `${slug || "poh-layout"}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Exported the layout as JSON.");
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = normalizeLayout(JSON.parse(String(reader.result)));
        if (!next) {
          setStatus("That file is not a POH layout.");
          return;
        }
        commit(next, `Imported “${next.name}”.`);
        setSelectedUid(null);
      } catch {
        setStatus("Could not parse that JSON file.");
      }
    };
    reader.readAsText(file);
  }

  const filtered = ROOMS.filter((room) => {
    if (!roomAllowedOnFloor(room, floorId)) return false;
    const hay = `${room.name} ${room.level}`.toLowerCase();
    return hay.includes(query.trim().toLowerCase());
  });

  const flowFrom = new Map();
  if (floorId === "ground" && layout.presetId === "gi-clickerz") {
    for (const arrow of layout.flow || []) {
      const key = `${arrow.from[0]},${arrow.from[1]}`;
      const dir = arrow.to[0] > arrow.from[0] ? "e"
        : arrow.to[0] < arrow.from[0] ? "w"
          : arrow.to[1] > arrow.from[1] ? "s" : "n";
      const list = flowFrom.get(key) || [];
      list.push(dir);
      flowFrom.set(key, list);
    }
  }

  return (
    <div className="poh-app">
      <div className="poh-shell">
        <div className="poh-titlebar">
          <h2 className="poh-title">G I Clickerz <span>— POH planner</span></h2>
          <div className="poh-stats">
            <div className="poh-stat"><strong>{stats.count}</strong> rooms</div>
            <div className="poh-stat" title="Room shells plus the furniture currently selected. Coin figures are Grand Exchange prices from the wiki on 2026-09-27.">Build cost <strong>{formatCoins(stats.cost)}</strong></div>
            <div className="poh-stat">Highest level <strong>{stats.level || "—"}</strong></div>
          </div>
        </div>

        <div className="poh-toolbar">
          <input
            className="poh-name"
            aria-label="Layout name"
            value={layout.name}
            onChange={(event) => commit({ ...layout, name: event.target.value }, null)}
          />
          <button type="button" className="poh-btn poh-btn--gold" onClick={loadPreset}>G I Clickerz example</button>
          <button type="button" className="poh-btn" onClick={clearLayout}>New</button>
          <button type="button" className="poh-btn" onClick={saveNamed}>Save</button>
          <select
            className="poh-select"
            aria-label="Load a saved layout"
            value=""
            onChange={(event) => {
              const value = event.target.value;
              if (value === "preset") loadPreset();
              else if (value) loadSaved(value);
            }}
          >
            <option value="">Load…</option>
            <option value="preset">G I Clickerz Team House</option>
            {store.saved.map((entry) => (
              <option key={entry.id} value={entry.id}>{entry.name}</option>
            ))}
          </select>
          <button type="button" className="poh-btn" onClick={exportJson}>Export JSON</button>
          <button type="button" className="poh-btn" onClick={() => fileRef.current?.click()}>Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importJson} />
        </div>

        <div className="poh-floorbar" role="tablist" aria-label="Floors">
          {FLOORS.map((floor) => (
            <button
              key={floor.id}
              type="button"
              role="tab"
              aria-selected={floor.id === floorId}
              className={floor.id === floorId ? "poh-floor poh-floor--on" : "poh-floor"}
              title={floor.note}
              onClick={() => showFloor(floor.id)}
            >
              {floor.name}
            </button>
          ))}
        </div>
        <p className="poh-floor-rule">{FLOOR_RULES[floorId]}</p>

        <div className="poh-layout">
          <aside className="poh-palette">
            <input
              className="poh-search"
              placeholder="Search rooms"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search rooms"
            />
            {GROUPS.map((group) => {
              const rooms = filtered.filter((room) => groupOf(room) === group.id);
              if (!rooms.length) return null;
              return (
                <div key={group.id}>
                  <div className="poh-group">{group.label}</div>
                  {rooms.map((room) => {
                    const Art = ROOM_ART[room.id];
                    return (
                      <button
                        key={room.id}
                        type="button"
                        className={armedId === room.id ? "poh-card poh-card--armed" : "poh-card"}
                        draggable
                        title={roomTooltip(room)}
                        onClick={() => {
                          setArmedId(room.id);
                          setStatus(`Selected ${room.name}. Click an empty tile to place it.`);
                        }}
                        onDragStart={(event) => {
                          event.dataTransfer.setData("text/poh-room", room.id);
                          event.dataTransfer.effectAllowed = "copy";
                          setArmedId(room.id);
                        }}
                      >
                        <div className="poh-card-art">{Art ? <Art room={room} /> : null}</div>
                        <div>
                          <div className="poh-card-name">{room.name}</div>
                          <div className="poh-card-meta">Level {room.level} · {formatCoins(room.cost)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </aside>

          <div className="poh-board-wrap">
            <div className="poh-grid-scroll">
              <div className="poh-grid" role="grid" aria-label="House grid, north at the top">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                  const x = index % GRID_SIZE;
                  const y = Math.floor(index / GRID_SIZE);
                  const piece = placed.find((room) => room.x === x && room.y === y);
                  const room = piece ? ROOM_BY_ID[piece.roomId] : null;
                  const Art = room ? ROOM_ART[room.id] : null;
                  const east = piece ? edgeState(placed, ROOM_BY_ID, x, y, "E") : null;
                  const south = piece ? edgeState(placed, ROOM_BY_ID, x, y, "S") : null;
                  const arrows = floorId === "ground" ? flowFrom.get(`${x},${y}`) || [] : [];
                  const spawn = spawnPoint(room, piece);
                  const hint = cellHint(floorId, ground, ROOM_BY_ID, x, y);
                  return (
                    <div
                      key={`${x}-${y}`}
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`${room ? room.name : "Empty"}, row ${y + 1}, column ${x + 1}`}
                      className={[
                        "poh-cell",
                        piece && selectedUid === piece.uid ? "poh-cell--selected" : "",
                        hoverCell === `${x},${y}` ? "poh-cell--over" : "",
                        hint === "support" ? "poh-cell--support" : "",
                        hint === "stairs" ? "poh-cell--stairs" : "",
                        hint === "entrance" ? "poh-cell--entrance" : "",
                      ].filter(Boolean).join(" ")}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setHoverCell(`${x},${y}`);
                      }}
                      onDragLeave={() => setHoverCell((current) => (current === `${x},${y}` ? null : current))}
                      onDrop={(event) => onDropCell(event, x, y)}
                      onClick={() => onCellClick(x, y)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
                          event.preventDefault();
                          onCellClick(x, y);
                        }
                      }}
                      onContextMenu={(event) => {
                        if (!piece) return;
                        event.preventDefault();
                        setSelectedUid(piece.uid);
                        rotateRoom(piece.uid);
                      }}
                      draggable={Boolean(piece)}
                      onDragStart={(event) => {
                        if (!piece) return;
                        event.dataTransfer.setData("text/poh-uid", piece.uid);
                        event.dataTransfer.effectAllowed = "move";
                        setSelectedUid(piece.uid);
                      }}
                    >
                      {piece && Art && (
                        <div className="poh-rotator" style={{ transform: `rotate(${piece.rotation * 90}deg)` }}>
                          <BuiltFurniture built={piece.built} room={room}>
                            <Art room={room} />
                          </BuiltFurniture>
                        </div>
                      )}
                      {room && <div className="poh-tile-label">{room.shortName}</div>}
                      {!piece && hint === "stairs" && <span className="poh-cell-tag">Stairs</span>}
                      {!piece && hint === "entrance" && <span className="poh-cell-tag">Entrance</span>}
                      {spawn && (
                        <div className="poh-spawn" style={{ left: `${spawn.x}%`, top: `${spawn.y}%` }} title="Spawn, north-west of the exit portal">
                          X
                        </div>
                      )}
                      {east === "link" && <span className="poh-link poh-link-e" title="Doors connect" />}
                      {south === "link" && <span className="poh-link poh-link-s" title="Doors connect" />}
                      {east === "mismatch" && <span className="poh-mis poh-mis-e" title="Door against a wall" />}
                      {south === "mismatch" && <span className="poh-mis poh-mis-s" title="Door against a wall" />}
                      {arrows.map((dir) => <span key={dir} className={`poh-arrow poh-arrow-${dir}`} />)}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="poh-status">{status}</p>
            {warnings.map((warning) => (
              <p key={warning} className="poh-status poh-warn">{warning}</p>
            ))}

            <div className="poh-side">
              <section className="poh-inspector">
                <div className="poh-preview">
                  {selectedRoom ? (
                    <div className="poh-rotator" style={{ transform: `rotate(${selected.rotation * 90}deg)` }}>
                      {(() => {
                        const Art = ROOM_ART[selectedRoom.id];
                        return Art ? (
                          <BuiltFurniture built={selected.built} room={selectedRoom}>
                            <Art room={selectedRoom} />
                          </BuiltFurniture>
                        ) : null;
                      })()}
                    </div>
                  ) : (
                    <Compass />
                  )}
                </div>
                <div>
                  {selectedRoom ? (
                    <>
                      <p className="poh-kicker">Selected · rotation {selected.rotation * 90}°</p>
                      <h3>{selectedRoom.name}</h3>
                      <p className="poh-note">
                        Level {selectedRoom.level} · {formatCoins(selectedRoom.cost)} · {doorLabel(rotatedSides(selectedRoom.doors, selected.rotation))}
                      </p>
                      <p className="poh-note">{selectedRoom.placement.note}</p>
                      {selectedRoom.doorSourceNote && selectedRoom.id === "dungeon-corridor" && (
                        <p className="poh-note">{selectedRoom.doorSourceNote}</p>
                      )}
                      <ul className="poh-build">
                        {selectedRoom.hotspots.map((spot) => {
                          const tier = selectedTier(selected, spot);
                          const mats = tier ? formatMaterials(tier) : "Nothing built here.";
                          return (
                            <li key={spot.id}>
                              <label>
                                {spot.name}
                                <select
                                  aria-label={`${spot.name} build`}
                                  value={tierChoice(selected, spot)}
                                  title={tier ? `${tier.name}. ${mats}. ${formatTierCost(tier)}. ${tier.source}` : "Nothing built in this hotspot."}
                                  onChange={(event) => setTier(selected.uid, spot.id, event.target.value)}
                                >
                                  <option value="">Nothing built</option>
                                  {spot.tiers.map((option) => (
                                    <option key={option.id} value={option.id}>
                                      {optionLabel(option)}
                                    </option>
                                  ))}
                                </select>
                              </label>
                              <div className="poh-mats">{mats}{tier ? ` · ${formatTierCost(tier)}` : ""}</div>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="poh-note">Levels, materials, and coin costs are the wiki build rows. Coin figures are Grand Exchange prices from 2026-09-27. Staircases and dungeon entrances start empty until you choose one.</p>
                      <div className="poh-actions">
                        <button type="button" className="poh-btn poh-btn--gold" onClick={() => rotateRoom(selected.uid)}>Rotate (R)</button>
                        <button type="button" className="poh-btn" onClick={() => deleteRoom(selected.uid)}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="poh-kicker">House viewer</p>
                      <h3>Nothing selected</h3>
                      <p className="poh-note">
                        North is the top of the grid, same as the in-game house viewer. Right-click or press R to rotate. Gold bars mean two doors meet. Red diamonds mean a door faces a wall.
                      </p>
                    </>
                  )}
                </div>
              </section>

              <div className="poh-legend">
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <h3>Legend</h3>
                    <LegendRow color="var(--poh-pool)" label="Ornate pool" />
                    <LegendRow color="var(--poh-nexus)" label="Portal nexus / portals" />
                    <LegendRow color="var(--poh-gold)" label="Gilded altar" />
                    <LegendRow color="var(--poh-jewel)" label="Jewellery box" />
                    <LegendRow color="var(--poh-spawn)" label="Spawn, and the example path" />
                    <LegendRow color="#f6e27a" label="Door connection" />
                    <LegendRow color="#fb7185" label="Door / wall mismatch" />
                  </div>
                  <Compass />
                </div>
              </div>

              <div className="poh-flowcard">
                <h3>G I Clickerz guest flow</h3>
                <ol>
                  <li>Restore: spawn, west into the superior garden, pool on its east wall, then south to the jewellery box.</li>
                  <li>Teleports: spawn, east into the portal nexus (crystal on its west wall).</li>
                  <li>Prayer: spawn, south into the chapel. The gilded altar sits on the west wall, sideways to that door.</li>
                </ol>
                <p className="poh-help">
                  Hosidius house. The build cost adds the room shells and the furniture selected in each hotspot. Press R to rotate, Delete to remove, and the arrow keys to move the selected room. Upstairs starts on a built staircase. The dungeon starts under a dungeon entrance.
                  {" "}
                  <a href="/poh-planner.html">Open the offline copy</a> if you want one file with no site around it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label }) {
  return (
    <div className="poh-legend-row">
      <span className="poh-swatch" style={{ background: color }} />
      {label}
    </div>
  );
}

function Compass() {
  return (
    <svg className="poh-compass" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="30" fill="#10192d" stroke="#f0c84a" strokeWidth="2" />
      <polygon points="40,14 46,40 40,36 34,40" fill="#f0c84a" />
      <polygon points="40,66 34,40 40,44 46,40" fill="#8ea0b8" />
      <text x="40" y="12" textAnchor="middle" fill="#f0c84a" fontSize="9" fontWeight="700">N</text>
      <text x="70" y="43" textAnchor="middle" fill="#d7e6ff" fontSize="8">E</text>
      <text x="40" y="76" textAnchor="middle" fill="#d7e6ff" fontSize="8">S</text>
      <text x="10" y="43" textAnchor="middle" fill="#d7e6ff" fontSize="8">W</text>
    </svg>
  );
}

function spawnPoint(room, piece) {
  if (!room?.hasExitPortal || !piece) return null;
  const portal = room.hotspots.find((spot) => spot.id === "centrepiece");
  if (!portal) return null;
  const tier = selectedTier(piece, portal);
  if (!tier || !/exit portal/i.test(tier.name)) return null;
  const point = rotatePoint(portal.anchor.x, portal.anchor.y, piece.rotation);
  return {
    x: Math.min(88, Math.max(12, point.x - 12)),
    y: Math.min(84, Math.max(14, point.y - 12)),
  };
}

function optionLabel(tier) {
  const mats = formatMaterials(tier);
  const short = mats.length > 64 ? `${mats.slice(0, 61)}…` : mats;
  const level = typeof tier.level === "number" ? `level ${tier.level}` : "level n/a";
  return `${tier.name} — ${level} — ${short} — ${formatTierCost(tier)}`;
}

function roomTooltip(room) {
  const tierNotes = room.hotspots
    .filter((spot) => !spot.anchorVerified && spot.anchorNote)
    .slice(0, 1)
    .map((spot) => spot.anchorNote);
  return [
    `${room.name} — Construction ${room.level}, ${formatCoins(room.cost)}`,
    doorLabel(room.doors),
    room.placement.note,
    room.doorSourceNote,
    tierNotes[0],
    room.source,
  ].filter(Boolean).join("\n");
}
