// ─────────────────────────────────────────────────────────────
// Clan Bingo card — play, edit, save and share.
//
// Data flow, in one picture: `store` is the single source of truth
// (the current card + saved versions). Every change goes through
// commitCard(), which also updates the saved version you're playing on —
// like Group Ironman shared storage: deposit once, everyone's view updates.
// A useEffect then writes the whole store to localStorage after each change.
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Dices,
  Link as LinkIcon,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Shuffle,
  Trash2,
} from "lucide-react";
import "./bingo.css";
import {
  ALL_TIERS,
  cloneCard,
  completedLines,
  decodeCard,
  defaultCard,
  encodeCard,
  isDone,
  makeTile,
  randomTaskIds,
  resizeCard,
  shuffled,
} from "./cardLogic";
import { readStore, writeStore } from "./storage";
import { CARD_SIZES, TASKS, TASK_BY_ID, TIERS } from "./tasks";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "low", label: "Low" },
  { id: "mid", label: "Mid" },
  { id: "high", label: "High" },
];

// Lazy initial state: runs once on first render, so we read storage a single time.
function initialStore() {
  const stored = readStore();
  if (stored) return stored;
  return { card: defaultCard(), versions: [], activeVersion: null };
}

// If someone opened a share link (/bingo#card=...), decode it so we can offer to load it.
// We ask first instead of loading straight away, so a link never silently replaces your card.
function initialSharedCard() {
  try {
    const match = window.location.hash.match(/card=([A-Za-z0-9_-]+)/);
    return match ? decodeCard(match[1]) : null;
  } catch {
    return null;
  }
}

function clearShareHash() {
  if (window.location.hash) {
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }
}

// A saved snapshot. Lives outside the component because it reads the clock.
function makeVersion(name, card) {
  const now = Date.now();
  return { id: `v${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, name, savedAt: now, card: cloneCard(card) };
}

function formatWhen(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function BingoApp() {
  const [store, setStore] = useState(initialStore);
  const [sharedCard, setSharedCard] = useState(initialSharedCard);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newTiers, setNewTiers] = useState(ALL_TIERS);
  const [saveName, setSaveName] = useState("");
  const [importCode, setImportCode] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const storageWarningShown = useRef(false);

  const { card, versions, activeVersion } = store;

  // Persist after every change. If storage is blocked, tell the player once
  // (deferred a tick, so we never set state synchronously inside the effect).
  useEffect(() => {
    let active = true;
    if (!writeStore(store) && !storageWarningShown.current) {
      Promise.resolve().then(() => {
        if (active && !storageWarningShown.current) {
          storageWarningShown.current = true;
          setToast("Browser storage is off — changes last only while this page stays open.");
        }
      });
    }
    return () => { active = false; };
  }, [store]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function flash(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  }

  // ── One door for every card change ──
  function commitCard(nextCard) {
    setStore((prev) => ({
      ...prev,
      card: nextCard,
      versions: prev.activeVersion
        ? prev.versions.map((v) => (v.id === prev.activeVersion ? { ...v, card: cloneCard(nextCard), savedAt: Date.now() } : v))
        : prev.versions,
    }));
  }

  // Replace the card without touching any saved version (new card, import, shared link).
  function replaceCard(nextCard) {
    setStore((prev) => ({ ...prev, card: nextCard, activeVersion: null }));
    setSelected(null);
  }

  function updateTile(index, change) {
    commitCard({ ...card, tiles: card.tiles.map((tile, i) => (i === index ? change({ ...tile }) : tile)) });
  }

  // ── Derived values (recomputed only when the card changes) ──
  const lines = useMemo(() => completedLines(card), [card]);
  const doneCount = card.tiles.filter(isDone).length;
  const pct = card.tiles.length ? Math.round((doneCount / card.tiles.length) * 100) : 0;
  const shareCode = useMemo(() => encodeCard(card), [card]);
  const shareLink = `${window.location.origin}${window.location.pathname}#card=${shareCode}`;
  const activeVersionName = versions.find((v) => v.id === activeVersion)?.name || "";

  const selectedTile = editing && selected !== null ? card.tiles[selected] : null;
  const selectedTask = selectedTile ? TASK_BY_ID[selectedTile.taskId] : null;

  const options = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TASKS.filter((task) =>
      (filter === "all" || task.tier === filter) &&
      (!q || `${task.t} ${task.h} ${task.cat}`.toLowerCase().includes(q)),
    );
  }, [filter, search]);
  // Keep the current task in the dropdown so the <select> never shows the wrong value.
  const selectOptions = selectedTask && !options.includes(selectedTask) ? [selectedTask, ...options] : options;

  // ── Actions ──
  function clickTile(index) {
    if (editing) {
      setSelected(index);
      return;
    }
    updateTile(index, (tile) => ({ ...tile, count: isDone(tile) ? 0 : tile.target }));
  }

  function replaceSelected(taskId) {
    if (selected === null || !TASK_BY_ID[taskId]) return;
    updateTile(selected, () => makeTile(taskId));
  }

  function toggleTier(tier) {
    const next = { ...newTiers, [tier]: !newTiers[tier] };
    if (!next.low && !next.mid && !next.high) return; // at least one tier stays on
    setNewTiers(next);
  }

  function newRandomCard() {
    const ids = randomTaskIds(card.cols * card.rows, newTiers);
    replaceCard({ ...card, tiles: ids.map(makeTile) });
    flash("New card rolled — save it to keep it.");
  }

  function randomForSelected() {
    const tiers = filter === "all" ? ALL_TIERS : { [filter]: true };
    replaceSelected(randomTaskIds(1, tiers, card.tiles.map((tile) => tile.taskId))[0]);
  }

  function saveVersion() {
    const version = makeVersion(saveName.trim() || card.name, card);
    setStore((prev) => ({ ...prev, versions: [...prev.versions, version], activeVersion: version.id }));
    setSaveName("");
    flash(`Saved “${version.name}”. It keeps updating as you play.`);
  }

  function loadVersion(version) {
    setStore((prev) => ({ ...prev, card: cloneCard(version.card), activeVersion: version.id }));
    setSelected(null);
    flash(`Loaded “${version.name}”.`);
  }

  function deleteVersion(version) {
    setStore((prev) => ({
      ...prev,
      versions: prev.versions.filter((v) => v.id !== version.id),
      activeVersion: prev.activeVersion === version.id ? null : prev.activeVersion,
    }));
  }

  async function copyText(text, message) {
    try {
      await navigator.clipboard.writeText(text);
      flash(message);
    } catch {
      flash("Couldn't copy automatically — select the text and copy it.");
    }
  }

  function importFromCode() {
    try {
      const imported = decodeCard(importCode.includes("card=") ? importCode.split("card=")[1] : importCode);
      replaceCard(imported);
      setImportCode("");
      flash(`Loaded “${imported.name}”. Save it to keep a copy.`);
    } catch {
      flash("That code didn't work — check it was copied in full.");
    }
  }

  function acceptShared() {
    replaceCard(sharedCard);
    setSharedCard(null);
    clearShareHash();
    flash(`Loaded “${sharedCard.name}”. Save it to keep a copy.`);
  }

  function dismissShared() {
    setSharedCard(null);
    clearShareHash();
  }

  // ── Render ──
  return (
    <div className="bingo-app">
      <div className="bingo-shell">
        {sharedCard && (
          <div className="bingo-banner" role="status">
            <span>
              Someone shared <strong>{sharedCard.name}</strong> with you ({sharedCard.cols}×{sharedCard.rows}).
              Loading it replaces the card on screen; your saved cards stay put.
            </span>
            <div className="bingo-row">
              <button type="button" className="bingo-btn bingo-btn--gold" onClick={acceptShared}>Load shared card</button>
              <button type="button" className="bingo-btn" onClick={dismissShared}>Keep mine</button>
            </div>
          </div>
        )}

        {/* Title + progress */}
        <header className="bingo-head">
          <div className="bingo-head__title">
            {editing ? (
              <label className="bingo-field">
                <span>Card name</span>
                <input
                  className="bingo-input bingo-input--title"
                  value={card.name}
                  maxLength={60}
                  onChange={(e) => commitCard({ ...card, name: e.target.value })}
                />
              </label>
            ) : (
              <h2 className="bingo-title">{card.name}</h2>
            )}
            <p className="bingo-muted">
              Click a tile when it's done. Tiles with a number need that many to complete.
              Finish a full row or column for a bingo.
            </p>
          </div>
          <div className="bingo-progress">
            <div className="bingo-progress__label">
              <span>Progress</span>
              <span>
                {doneCount} / {card.tiles.length} tiles ·{" "}
                <strong>{lines.count} {lines.count === 1 ? "bingo" : "bingos"}</strong>
              </span>
            </div>
            <div className="bingo-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Card progress">
              <div style={{ width: `${pct}%` }} />
            </div>
            {activeVersionName && <div className="bingo-saved-note">Auto-saving to “{activeVersionName}”</div>}
          </div>
        </header>

        {/* Toolbar */}
        <div className="bingo-toolbar">
          <button
            type="button"
            className={`bingo-btn ${editing ? "bingo-btn--blue" : "bingo-btn--gold"}`}
            onClick={() => { setEditing((v) => !v); setSelected(null); }}
          >
            <Pencil size={16} aria-hidden="true" /> {editing ? "Done editing" : "Edit card"}
          </button>
          <button
            type="button"
            className="bingo-btn"
            onClick={() => { commitCard({ ...card, tiles: shuffled(card.tiles) }); flash("Tiles shuffled."); }}
          >
            <Shuffle size={16} aria-hidden="true" /> Shuffle tiles
          </button>
          <button type="button" className="bingo-btn" onClick={newRandomCard}>
            <Dices size={16} aria-hidden="true" /> New random card
          </button>
          <div className="bingo-row" role="group" aria-label="Levels used for a new random card">
            <span className="bingo-muted">from</span>
            {Object.entries(TIERS).map(([id, tier]) => (
              <button
                key={id}
                type="button"
                className={`bingo-pill ${newTiers[id] ? "is-on" : ""}`}
                aria-pressed={newTiers[id]}
                onClick={() => toggleTier(id)}
              >
                <span className="bingo-dot" style={{ background: tier.color }} aria-hidden="true" />
                {tier.label}
              </button>
            ))}
          </div>
          <div className="bingo-row" role="group" aria-label="Card size">
            <span className="bingo-muted">Size</span>
            {CARD_SIZES.map((size) => {
              const on = card.cols === size.cols && card.rows === size.rows;
              return (
                <button
                  key={`${size.cols}x${size.rows}`}
                  type="button"
                  className={`bingo-pill ${on ? "is-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => { commitCard(resizeCard(card, size.cols, size.rows, newTiers)); setSelected(null); }}
                >
                  {size.cols}×{size.rows}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="bingo-btn bingo-btn--danger bingo-push"
            onClick={() => commitCard({ ...card, tiles: card.tiles.map((tile) => ({ ...tile, count: 0 })) })}
          >
            <RotateCcw size={16} aria-hidden="true" /> Reset progress
          </button>
        </div>

        <div className="bingo-layout">
          {/* ── The card ── */}
          <div className="bingo-board-wrap">
            <div className="bingo-board" style={{ gridTemplateColumns: `repeat(${card.cols}, minmax(0, 1fr))` }}>
              {card.tiles.map((tile, index) => {
                const task = TASK_BY_ID[tile.taskId];
                const done = isDone(tile);
                const multi = tile.target > 1;
                const title = tile.title || task.t;
                const classes = [
                  "bingo-tile",
                  done && "is-done",
                  lines.hit.has(index) && "is-line",
                  editing && selected === index && "is-selected",
                ].filter(Boolean).join(" ");
                return (
                  // Index keys are fine here: tiles are positions on a grid, not reorderable list items.
                  <div key={index} className={classes}>
                    <button
                      type="button"
                      className="bingo-tile__main"
                      onClick={() => clickTile(index)}
                      aria-pressed={done}
                      aria-label={`${title}${editing ? " — select to edit" : done ? " — completed, select to undo" : " — select to mark complete"}`}
                    >
                      <span className="bingo-tile__title">{title}</span>
                      <span className="bingo-tile__art">
                        <img src={task.img} alt="" loading="lazy" />
                      </span>
                      <span className="bingo-tile__hint">{tile.hint || task.h}</span>
                    </button>
                    <span className="bingo-dot bingo-tile__tier" style={{ background: TIERS[task.tier].color }} aria-hidden="true" />
                    {done && (
                      <span className="bingo-tile__check" aria-hidden="true"><Check size={16} strokeWidth={3.2} /></span>
                    )}
                    <div className="bingo-tile__counter">
                      {multi && !editing && (
                        <button type="button" className="bingo-step" aria-label={`Remove one from ${title}`}
                          onClick={() => updateTile(index, (t) => ({ ...t, count: Math.max(0, t.count - 1) }))}>
                          <Minus size={14} aria-hidden="true" />
                        </button>
                      )}
                      <span className="bingo-tile__count">
                        {multi ? `${Math.min(tile.count, tile.target)}/${tile.target}` : done ? "1" : "0"}
                      </span>
                      {multi && !editing && (
                        <button type="button" className="bingo-step" aria-label={`Add one to ${title}`}
                          onClick={() => updateTile(index, (t) => ({ ...t, count: Math.min(t.target, t.count + 1) }))}>
                          <Plus size={14} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bingo-legend">
              {Object.entries(TIERS).map(([id, tier]) => (
                <span key={id}><span className="bingo-dot" style={{ background: tier.color }} />{tier.label} level</span>
              ))}
              <span><span className="bingo-legend__line" />Part of a completed line</span>
            </div>
          </div>

          {/* ── Side panel ── */}
          <aside className="bingo-side">
            <section className="bingo-panel">
              <h3>Edit tile</h3>
              {!selectedTile ? (
                <p className="bingo-muted">
                  {editing ? "Pick any tile on the card to change its task, title, hint or amount." : "Turn on “Edit card”, then pick a tile to change it."}
                </p>
              ) : (
                <>
                  <div className="bingo-selected">
                    <img src={selectedTask.img} alt="" />
                    <div>
                      <strong>{selectedTile.title || selectedTask.t}</strong>
                      <span className="bingo-muted">Tile {selected + 1} · {TIERS[selectedTask.tier].label} level · {selectedTask.cat}</span>
                    </div>
                  </div>

                  <div className="bingo-row" role="group" aria-label="Filter tasks by level">
                    {FILTERS.map((f) => (
                      <button key={f.id} type="button" className={`bingo-pill ${filter === f.id ? "is-on" : ""}`}
                        aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <label className="bingo-field">
                    <span>Search</span>
                    <input className="bingo-input" value={search} placeholder="e.g. clue, pet, raid…" onChange={(e) => setSearch(e.target.value)} />
                  </label>

                  <label className="bingo-field">
                    <span>Task ({options.length} available)</span>
                    <select className="bingo-input" value={selectedTile.taskId} onChange={(e) => replaceSelected(e.target.value)}>
                      {selectOptions.map((task) => (
                        <option key={task.id} value={task.id}>{task.t} — {TIERS[task.tier].label} · {task.cat}</option>
                      ))}
                    </select>
                  </label>

                  <div className="bingo-picks">
                    {options.slice(0, 18).map((task) => (
                      <button key={task.id} type="button" title={task.t} aria-label={`Use ${task.t}`}
                        className={`bingo-pick ${task.id === selectedTile.taskId ? "is-on" : ""}`}
                        onClick={() => replaceSelected(task.id)}>
                        <img src={task.img} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>

                  <label className="bingo-field">
                    <span>Tile title (optional rename)</span>
                    <input className="bingo-input" value={selectedTile.title} maxLength={40} placeholder={selectedTask.t}
                      onChange={(e) => updateTile(selected, (t) => ({ ...t, title: e.target.value }))} />
                  </label>
                  <label className="bingo-field">
                    <span>How to unlock (short hint)</span>
                    <input className="bingo-input" value={selectedTile.hint} maxLength={60} placeholder={selectedTask.h}
                      onChange={(e) => updateTile(selected, (t) => ({ ...t, hint: e.target.value }))} />
                  </label>
                  <label className="bingo-field">
                    <span>Amount needed to complete</span>
                    <input className="bingo-input bingo-input--short" type="number" min={1} max={999} value={selectedTile.target}
                      onChange={(e) => {
                        const target = Math.max(1, Math.min(999, Number.parseInt(e.target.value, 10) || 1));
                        updateTile(selected, (t) => ({ ...t, target, count: Math.min(t.count, target) }));
                      }} />
                  </label>

                  <div className="bingo-row">
                    <button type="button" className="bingo-btn bingo-grow" onClick={randomForSelected}>
                      <Dices size={16} aria-hidden="true" /> Random {filter === "all" ? "any-level" : `${TIERS[filter].label.toLowerCase()}-level`} task
                    </button>
                    <button type="button" className="bingo-btn bingo-btn--ghost" onClick={() => setSelected(null)}>Done</button>
                  </div>
                </>
              )}
            </section>

            <section className="bingo-panel">
              <h3>Saved cards</h3>
              <label className="bingo-field">
                <span>Save this card as</span>
                <input className="bingo-input" value={saveName} maxLength={60} placeholder={card.name} onChange={(e) => setSaveName(e.target.value)} />
              </label>
              <button type="button" className="bingo-btn bingo-btn--gold" onClick={saveVersion}>Save as new version</button>
              {versions.length === 0 ? (
                <p className="bingo-muted">Saved versions keep updating as you mark tiles, so every card stays current.</p>
              ) : (
                <ul className="bingo-versions">
                  {[...versions].sort((a, b) => b.savedAt - a.savedAt).map((version) => {
                    const isActive = version.id === activeVersion;
                    const vDone = version.card.tiles.filter(isDone).length;
                    return (
                      <li key={version.id} className={isActive ? "is-active" : ""}>
                        <div className="bingo-versions__info">
                          <strong>{version.name}</strong>
                          <span className="bingo-muted">
                            {isActive ? "Active · " : ""}{vDone}/{version.card.tiles.length} done · {formatWhen(version.savedAt)}
                          </span>
                        </div>
                        <button type="button" className="bingo-btn bingo-btn--small" onClick={() => loadVersion(version)} disabled={isActive}>
                          {isActive ? "Loaded" : "Load"}
                        </button>
                        <button type="button" className="bingo-icon-btn" aria-label={`Delete ${version.name}`} onClick={() => deleteVersion(version)}>
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="bingo-panel">
              <h3>Share &amp; import</h3>
              <p className="bingo-muted">
                A share link opens this exact card — tiles, names and progress — on anyone's device.
              </p>
              <button type="button" className="bingo-btn bingo-btn--gold" onClick={() => copyText(shareLink, "Share link copied — paste it in Discord.")}>
                <LinkIcon size={16} aria-hidden="true" /> Copy share link
              </button>
              <button type="button" className="bingo-btn" onClick={() => copyText(shareCode, "Share code copied.")}>
                <Copy size={16} aria-hidden="true" /> Copy share code only
              </button>
              <label className="bingo-field">
                <span>Load a card from a code or link</span>
                <input className="bingo-input bingo-input--mono" value={importCode} placeholder="Paste a share code or link"
                  onChange={(e) => setImportCode(e.target.value)} />
              </label>
              <button type="button" className="bingo-btn" onClick={importFromCode} disabled={!importCode.trim()}>Load card</button>
            </section>
          </aside>
        </div>

        <p className="bingo-credit">Item images from the <a href="https://oldschool.runescape.wiki/" target="_blank" rel="noreferrer">Old School RuneScape Wiki</a> (CC BY-NC-SA 3.0).</p>
      </div>

      {toast && <div className="bingo-toast" role="status">{toast}</div>}
    </div>
  );
}
