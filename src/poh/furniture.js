/**
 * Furniture tiers for every POH hotspot.
 *
 * Generated from OSRS Wiki room pages (action=parse, prop=text) on 2026-09-27.
 * User-Agent: G-I-Clickerz-POH-Planner/1.0 (clan site research; contact clickerz.cc).
 *
 * `cost` is the wiki's coin figure for that row (the Total Cost column when the
 * page lists an upgrade cost and a total). Those numbers are Grand Exchange
 * prices at fetch time, so they move. A range is stored in `costLabel` when the
 * wiki gives one (usually nails). Materials are the wiki row, including the
 * previous build when that row is an upgrade.
 *
 * `role` "stairs" is a staircase (skill hall, quest hall, or the bottom of a
 * dungeon stair room). `role` "dungeon-entrance" is a dungeon entrance built
 * in a garden or formal garden centrepiece. The upper floor starts on stairs.
 * The dungeon starts under a dungeon entrance.
 */
export const FURNITURE = {
  "dining-room:bell-pull": [
    {
      "id": "rope-bell-pull",
      "name": "Rope bell-pull",
      "level": 26,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 588,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "bell-pull",
      "name": "Bell-pull",
      "level": 37,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 1
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 1662,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "posh-bell-pull",
      "name": "Posh bell-pull",
      "level": 60,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 1
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140613,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "dining-room:curtain": [
    {
      "id": "torn-curtains",
      "name": "Torn curtains",
      "level": 2,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true,
      "costLabel": "1,581–7,059"
    },
    {
      "id": "curtains",
      "name": "Curtains",
      "level": 18,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 2712,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "opulent-curtains",
      "name": "Opulent curtains",
      "level": 40,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 3846,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "raging-echoes-curtains",
      "name": "Raging echoes curtains",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Raging echoes curtains",
          "qty": 1
        }
      ],
      "cost": 214300,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "dining-room:decoration": [
    {
      "id": "gilded-decoration",
      "name": "Gilded decoration",
      "level": 56,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 284223,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "dining-room:fireplace": [
    {
      "id": "clay-fireplace",
      "name": "Clay fireplace",
      "level": 3,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 3
        }
      ],
      "cost": 366,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "stone-fireplace",
      "name": "Stone fireplace",
      "level": 33,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "marble-fireplace",
      "name": "Marble fireplace",
      "level": 63,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "dining-room:seating": [
    {
      "id": "wooden-bench",
      "name": "Wooden bench",
      "level": 10,
      "materials": [
        {
          "name": "Plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true,
      "costLabel": "588–7,892"
    },
    {
      "id": "oak-bench",
      "name": "Oak bench",
      "level": 22,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "carved-oak-bench",
      "name": "Carved oak bench",
      "level": 31,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "teak-dining-bench",
      "name": "Teak dining bench",
      "level": 38,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "carved-teak-bench",
      "name": "Carved teak bench",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "mahogany-bench",
      "name": "Mahogany bench",
      "level": 52,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 8428,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "gilded-bench",
      "name": "Gilded bench",
      "level": 61,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 4
        }
      ],
      "cost": 564232,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "dining-room:table": [
    {
      "id": "wood-dining-table",
      "name": "Wood dining table",
      "level": 10,
      "materials": [
        {
          "name": "Plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true,
      "costLabel": "588–7,892"
    },
    {
      "id": "oak-dining-table",
      "name": "Oak dining table",
      "level": 22,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "carved-oak-table",
      "name": "Carved oak table",
      "level": 31,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 6
        }
      ],
      "cost": 3144,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "teak-table",
      "name": "Teak table",
      "level": 38,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "carved-teak-table",
      "name": "Carved teak table",
      "level": 45,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 6
        },
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 6932,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "mahogany-table",
      "name": "Mahogany table",
      "level": 52,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        }
      ],
      "cost": 12642,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    },
    {
      "id": "opulent-table",
      "name": "Opulent table",
      "level": 72,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        },
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 4
        },
        {
          "name": "Marble block",
          "qty": 2
        }
      ],
      "cost": 1247050,
      "source": "https://oldschool.runescape.wiki/w/Dining_room",
      "verified": true
    }
  ],
  "garden:big-plant-1": [
    {
      "id": "fern",
      "name": "Fern",
      "level": 1,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        }
      ],
      "cost": 1839,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "greenman-statue",
      "name": "Greenman statue",
      "level": 1,
      "materials": [
        {
          "name": "Greenman statue",
          "qty": 1
        }
      ],
      "cost": 66699,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "bush",
      "name": "Bush",
      "level": 6,
      "materials": [
        {
          "name": "Bagged plant 2",
          "qty": 1
        }
      ],
      "cost": 6677,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "tall-plant",
      "name": "Tall plant",
      "level": 12,
      "materials": [
        {
          "name": "Bagged plant 3",
          "qty": 1
        }
      ],
      "cost": 13310,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:big-plant-2": [
    {
      "id": "short-plant",
      "name": "Short plant",
      "level": 1,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        }
      ],
      "cost": 1839,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "greenman-statue",
      "name": "Greenman statue",
      "level": 1,
      "materials": [
        {
          "name": "Greenman statue",
          "qty": 1
        }
      ],
      "cost": 66699,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "large-leaf-bush",
      "name": "Large leaf bush",
      "level": 6,
      "materials": [
        {
          "name": "Bagged plant 2",
          "qty": 1
        }
      ],
      "cost": 6677,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "huge-plant",
      "name": "Huge plant",
      "level": 12,
      "materials": [
        {
          "name": "Bagged plant 3",
          "qty": 1
        }
      ],
      "cost": 13310,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:big-tree": [
    {
      "id": "tree",
      "name": "Tree",
      "level": 5,
      "materials": [
        {
          "name": "Bagged dead tree",
          "qty": 1
        }
      ],
      "cost": 1447,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "nice-tree",
      "name": "Nice tree",
      "level": 10,
      "materials": [
        {
          "name": "Bagged nice tree",
          "qty": 1
        }
      ],
      "cost": 3149,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "oak-tree",
      "name": "Oak tree",
      "level": 15,
      "materials": [
        {
          "name": "Bagged oak tree",
          "qty": 1
        }
      ],
      "cost": 7065,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "willow-tree",
      "name": "Willow tree",
      "level": 30,
      "materials": [
        {
          "name": "Bagged willow tree",
          "qty": 1
        }
      ],
      "cost": 13606,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "maple-tree",
      "name": "Maple tree",
      "level": 45,
      "materials": [
        {
          "name": "Bagged maple tree",
          "qty": 1
        }
      ],
      "cost": 18235,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "yew-tree",
      "name": "Yew tree",
      "level": 60,
      "materials": [
        {
          "name": "Bagged yew tree",
          "qty": 1
        }
      ],
      "cost": 22751,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "magic-tree",
      "name": "Magic tree",
      "level": 75,
      "materials": [
        {
          "name": "Bagged magic tree",
          "qty": 1
        }
      ],
      "cost": 53658,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:tree": [
    {
      "id": "tree",
      "name": "Tree",
      "level": 5,
      "materials": [
        {
          "name": "Bagged dead tree",
          "qty": 1
        }
      ],
      "cost": 1447,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "nice-tree",
      "name": "Nice tree",
      "level": 10,
      "materials": [
        {
          "name": "Bagged nice tree",
          "qty": 1
        }
      ],
      "cost": 3149,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "oak-tree",
      "name": "Oak tree",
      "level": 15,
      "materials": [
        {
          "name": "Bagged oak tree",
          "qty": 1
        }
      ],
      "cost": 7065,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "willow-tree",
      "name": "Willow tree",
      "level": 30,
      "materials": [
        {
          "name": "Bagged willow tree",
          "qty": 1
        }
      ],
      "cost": 13606,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "maple-tree",
      "name": "Maple tree",
      "level": 45,
      "materials": [
        {
          "name": "Bagged maple tree",
          "qty": 1
        }
      ],
      "cost": 18235,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "yew-tree",
      "name": "Yew tree",
      "level": 60,
      "materials": [
        {
          "name": "Bagged yew tree",
          "qty": 1
        }
      ],
      "cost": 22751,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "magic-tree",
      "name": "Magic tree",
      "level": 75,
      "materials": [
        {
          "name": "Bagged magic tree",
          "qty": 1
        }
      ],
      "cost": 53658,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:centrepiece": [
    {
      "id": "exit-portal",
      "name": "Exit portal",
      "level": 1,
      "materials": [
        {
          "name": "Iron bar",
          "qty": 10
        }
      ],
      "cost": 2010,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "greenman-statue",
      "name": "Greenman statue",
      "level": 1,
      "materials": [
        {
          "name": "Greenman statue",
          "qty": 1
        }
      ],
      "cost": 66699,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "exit-portal-annihilation-unlock",
      "name": "Exit portal (Annihilation unlock)",
      "level": 1,
      "materials": [
        {
          "name": "Iron bar",
          "qty": 10
        },
        {
          "name": "Annihilation exit portal blueprints",
          "qty": 1
        }
      ],
      "cost": 2010,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "decorative-rock",
      "name": "Decorative rock",
      "level": 5,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 5
        }
      ],
      "cost": 1695,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "pond",
      "name": "Pond",
      "level": 10,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 10
        }
      ],
      "cost": 1220,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "imp-statue",
      "name": "Imp statue",
      "level": 15,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 5
        },
        {
          "name": "Soft clay",
          "qty": 5
        }
      ],
      "cost": 2305,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "dungeon-entrance",
      "name": "Dungeon entrance",
      "level": 70,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true,
      "role": "dungeon-entrance"
    }
  ],
  "garden:small-plant-1": [
    {
      "id": "plant",
      "name": "Plant",
      "level": 1,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        }
      ],
      "cost": 1839,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "small-fern",
      "name": "Small fern",
      "level": 6,
      "materials": [
        {
          "name": "Bagged plant 2",
          "qty": 1
        }
      ],
      "cost": 6677,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "fern",
      "name": "Fern",
      "level": 12,
      "materials": [
        {
          "name": "Bagged plant 3",
          "qty": 1
        }
      ],
      "cost": 13310,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:small-plant-2": [
    {
      "id": "dock-leaf",
      "name": "Dock leaf",
      "level": 1,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        }
      ],
      "cost": 1839,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "thistle",
      "name": "Thistle",
      "level": 6,
      "materials": [
        {
          "name": "Bagged plant 2",
          "qty": 1
        }
      ],
      "cost": 6677,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    },
    {
      "id": "reeds",
      "name": "Reeds",
      "level": 12,
      "materials": [
        {
          "name": "Bagged plant 3",
          "qty": 1
        }
      ],
      "cost": 13310,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "garden:tip-jar": [
    {
      "id": "tip-jar",
      "name": "Tip jar",
      "level": 40,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Platinum token",
          "qty": 5
        }
      ],
      "cost": 148253,
      "source": "https://oldschool.runescape.wiki/w/Garden",
      "verified": true
    }
  ],
  "workshop:clockmaking": [
    {
      "id": "crafting-table-1",
      "name": "Crafting table 1",
      "level": 16,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "crafting-table-2",
      "name": "Crafting table 2",
      "level": 25,
      "materials": [
        {
          "name": "Crafting table 1",
          "qty": 1
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 2184,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "crafting-table-3",
      "name": "Crafting table 3",
      "level": 34,
      "materials": [
        {
          "name": "Crafting table 2",
          "qty": 1
        },
        {
          "name": "Molten glass",
          "qty": 2
        }
      ],
      "cost": 2360,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "crafting-table-4",
      "name": "Crafting table 4",
      "level": 42,
      "materials": [
        {
          "name": "Crafting table 3",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 3408,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    }
  ],
  "workshop:heraldry": [
    {
      "id": "pluming-stand",
      "name": "Pluming stand",
      "level": 16,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "shield-easel",
      "name": "Shield easel",
      "level": 41,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "banner-easel",
      "name": "Banner easel",
      "level": 66,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 8
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 4952,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    }
  ],
  "workshop:repair": [
    {
      "id": "repair-bench",
      "name": "Repair bench",
      "level": 15,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "whetstone",
      "name": "Whetstone",
      "level": 35,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 2435,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "armour-stand",
      "name": "Armour stand",
      "level": 55,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 8
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 4531,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    }
  ],
  "workshop:tool": [
    {
      "id": "tool-store-1",
      "name": "Tool store 1",
      "level": 15,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "tool-store-2",
      "name": "Tool store 2",
      "level": 25,
      "materials": [
        {
          "name": "Tool store 1",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "tool-store-3",
      "name": "Tool store 3",
      "level": 35,
      "materials": [
        {
          "name": "Tool store 2",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 3144,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "tool-store-4",
      "name": "Tool store 4",
      "level": 44,
      "materials": [
        {
          "name": "Tool store 3",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 4192,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "tool-store-5",
      "name": "Tool store 5",
      "level": 55,
      "materials": [
        {
          "name": "Tool store 4",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    }
  ],
  "workshop:workbench": [
    {
      "id": "wooden-workbench",
      "name": "Wooden workbench",
      "level": 17,
      "materials": [
        {
          "name": "Plank",
          "qty": 5
        },
        {
          "name": "Nails",
          "qty": 5
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true,
      "costLabel": "735–9,865"
    },
    {
      "id": "oak-workbench",
      "name": "Oak workbench",
      "level": 32,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        }
      ],
      "cost": 2620,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "steel-framed-workbench",
      "name": "Steel framed workbench",
      "level": 46,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 6
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 5468,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "bench-with-vice",
      "name": "Bench with vice",
      "level": 62,
      "materials": [
        {
          "name": "Steel framed workbench",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Steel bar",
          "qty": 1
        }
      ],
      "cost": 7097,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    },
    {
      "id": "bench-with-lathe",
      "name": "Bench with lathe",
      "level": 77,
      "materials": [
        {
          "name": "Bench with vice",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Steel bar",
          "qty": 1
        }
      ],
      "cost": 8726,
      "source": "https://oldschool.runescape.wiki/w/Workshop",
      "verified": true
    }
  ],
  "dungeon-corridor:decoration": [
    {
      "id": "decorative-blood",
      "name": "Decorative blood",
      "level": 72,
      "materials": [
        {
          "name": "Red dye",
          "qty": 4
        }
      ],
      "cost": 1364,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "decorative-pipe",
      "name": "Decorative pipe",
      "level": 83,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hanging-skeleton",
      "name": "Hanging skeleton",
      "level": 94,
      "materials": [
        {
          "name": "Skull (item)",
          "qty": 2
        },
        {
          "name": "Bones",
          "qty": 6
        }
      ],
      "cost": 240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:decoration": [
    {
      "id": "decorative-blood",
      "name": "Decorative blood",
      "level": 72,
      "materials": [
        {
          "name": "Red dye",
          "qty": 4
        }
      ],
      "cost": 1364,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "decorative-pipe",
      "name": "Decorative pipe",
      "level": 83,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hanging-skeleton",
      "name": "Hanging skeleton",
      "level": 94,
      "materials": [
        {
          "name": "Skull (item)",
          "qty": 2
        },
        {
          "name": "Bones",
          "qty": 6
        }
      ],
      "cost": 240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:decoration": [
    {
      "id": "decorative-blood",
      "name": "Decorative blood",
      "level": 72,
      "materials": [
        {
          "name": "Red dye",
          "qty": 4
        }
      ],
      "cost": 1364,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "decorative-pipe",
      "name": "Decorative pipe",
      "level": 83,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hanging-skeleton",
      "name": "Hanging skeleton",
      "level": 94,
      "materials": [
        {
          "name": "Skull (item)",
          "qty": 2
        },
        {
          "name": "Bones",
          "qty": 6
        }
      ],
      "cost": 240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-corridor:door": [
    {
      "id": "oak-door",
      "name": "Oak door",
      "level": 74,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "steel-plated-door",
      "name": "Steel-plated door",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 11050,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-door",
      "name": "Marble door",
      "level": 94,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:door": [
    {
      "id": "oak-door",
      "name": "Oak door",
      "level": 74,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "steel-plated-door",
      "name": "Steel-plated door",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 11050,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-door",
      "name": "Marble door",
      "level": 94,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:door": [
    {
      "id": "oak-door",
      "name": "Oak door",
      "level": 74,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "steel-plated-door",
      "name": "Steel-plated door",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 11050,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-door",
      "name": "Marble door",
      "level": 94,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-corridor:guard": [
    {
      "id": "skeleton-guard",
      "name": "Skeleton guard",
      "level": 70,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "guard-dog",
      "name": "Guard dog",
      "level": 74,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hobgoblin",
      "name": "Hobgoblin",
      "level": 78,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "baby-red-dragon",
      "name": "Baby red dragon",
      "level": 82,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "huge-spider",
      "name": "Huge spider",
      "level": 86,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "troll-guard",
      "name": "Troll guard",
      "level": 90,
      "materials": [],
      "cost": 1000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hellhound",
      "name": "Hellhound",
      "level": 94,
      "materials": [],
      "cost": 5000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:guard": [
    {
      "id": "skeleton-guard",
      "name": "Skeleton guard",
      "level": 70,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "guard-dog",
      "name": "Guard dog",
      "level": 74,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hobgoblin",
      "name": "Hobgoblin",
      "level": 78,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "baby-red-dragon",
      "name": "Baby red dragon",
      "level": 82,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "huge-spider",
      "name": "Huge spider",
      "level": 86,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "troll-guard",
      "name": "Troll guard",
      "level": 90,
      "materials": [],
      "cost": 1000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hellhound",
      "name": "Hellhound",
      "level": 94,
      "materials": [],
      "cost": 5000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:guard": [
    {
      "id": "skeleton-guard",
      "name": "Skeleton guard",
      "level": 70,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "guard-dog",
      "name": "Guard dog",
      "level": 74,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hobgoblin",
      "name": "Hobgoblin",
      "level": 78,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "baby-red-dragon",
      "name": "Baby red dragon",
      "level": 82,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "huge-spider",
      "name": "Huge spider",
      "level": 86,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "troll-guard",
      "name": "Troll guard",
      "level": 90,
      "materials": [],
      "cost": 1000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "hellhound",
      "name": "Hellhound",
      "level": 94,
      "materials": [],
      "cost": 5000000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-corridor:lighting": [
    {
      "id": "candle",
      "name": "Candle",
      "level": 72,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit candle",
          "qty": 4
        }
      ],
      "cost": 3240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "torches",
      "name": "Torches",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "skull-torches",
      "name": "Skull torches",
      "level": 94,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        },
        {
          "name": "Skull (item)",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:lighting": [
    {
      "id": "candle",
      "name": "Candle",
      "level": 72,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit candle",
          "qty": 4
        }
      ],
      "cost": 3240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "torches",
      "name": "Torches",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "skull-torches",
      "name": "Skull torches",
      "level": 94,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        },
        {
          "name": "Skull (item)",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:lighting": [
    {
      "id": "candle",
      "name": "Candle",
      "level": 72,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit candle",
          "qty": 4
        }
      ],
      "cost": 3240,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "torches",
      "name": "Torches",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "skull-torches",
      "name": "Skull torches",
      "level": 94,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        },
        {
          "name": "Skull (item)",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-corridor:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:stair": [
    {
      "id": "oak-staircase",
      "name": "Oak staircase",
      "level": 27,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 7564,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "teak-staircase",
      "name": "Teak staircase",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 11344,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "limestone-spiral-staircase",
      "name": "Limestone spiral staircase",
      "level": 67,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Limestone brick",
          "qty": 7
        }
      ],
      "cost": 11393,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-staircase",
      "name": "Marble staircase",
      "level": 82,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 5
        }
      ],
      "cost": 1703245,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-spiral",
      "name": "Marble spiral",
      "level": 97,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Marble block",
          "qty": 7
        }
      ],
      "cost": 2378814,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true,
      "role": "stairs"
    }
  ],
  "dungeon-corridor:trap": [
    {
      "id": "spike-trap",
      "name": "Spike trap",
      "level": 72,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "man-trap",
      "name": "Man trap",
      "level": 76,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "tangle-vine",
      "name": "Tangle vine",
      "level": 80,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-trap",
      "name": "Marble trap",
      "level": 84,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "teleport-trap",
      "name": "Teleport trap",
      "level": 88,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-junction:trap": [
    {
      "id": "spike-trap",
      "name": "Spike trap",
      "level": 72,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "man-trap",
      "name": "Man trap",
      "level": 76,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "tangle-vine",
      "name": "Tangle vine",
      "level": 80,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-trap",
      "name": "Marble trap",
      "level": 84,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "teleport-trap",
      "name": "Teleport trap",
      "level": 88,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "dungeon-stairs:trap": [
    {
      "id": "spike-trap",
      "name": "Spike trap",
      "level": 72,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "man-trap",
      "name": "Man trap",
      "level": 76,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "tangle-vine",
      "name": "Tangle vine",
      "level": 80,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "marble-trap",
      "name": "Marble trap",
      "level": 84,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    },
    {
      "id": "teleport-trap",
      "name": "Teleport trap",
      "level": 88,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
      "verified": true
    }
  ],
  "games-room:elemental-balance": [
    {
      "id": "lesser-magical-balance",
      "name": "Lesser magical balance",
      "level": 37,
      "materials": [
        {
          "name": "Air rune",
          "qty": 500
        },
        {
          "name": "Earth rune",
          "qty": 500
        },
        {
          "name": "Fire rune",
          "qty": 500
        },
        {
          "name": "Water rune",
          "qty": 500
        }
      ],
      "cost": 11000,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "medium-balance",
      "name": "Medium balance",
      "level": 57,
      "materials": [
        {
          "name": "Air rune",
          "qty": 1000
        },
        {
          "name": "Earth rune",
          "qty": 1000
        },
        {
          "name": "Fire rune",
          "qty": 1000
        },
        {
          "name": "Water rune",
          "qty": 1000
        }
      ],
      "cost": 22000,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "greater-magical-balance",
      "name": "Greater magical balance",
      "level": 77,
      "materials": [
        {
          "name": "Air rune",
          "qty": 2000
        },
        {
          "name": "Earth rune",
          "qty": 2000
        },
        {
          "name": "Fire rune",
          "qty": 2000
        },
        {
          "name": "Water rune",
          "qty": 2000
        }
      ],
      "cost": 44000,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    }
  ],
  "games-room:game": [
    {
      "id": "jester",
      "name": "Jester",
      "level": 39,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "treasure-hunt",
      "name": "Treasure hunt",
      "level": 49,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 8
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 9540,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "hangman",
      "name": "Hangman",
      "level": 59,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 12
        },
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 14310,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    }
  ],
  "games-room:prize-chest": [
    {
      "id": "oak-prize-chest",
      "name": "Oak prize chest",
      "level": 34,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "teak-prize-chest",
      "name": "Teak prize chest",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 142559,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "mahogany-prize-chest",
      "name": "Mahogany prize chest",
      "level": 54,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 147379,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    }
  ],
  "games-room:ranging": [
    {
      "id": "hoop-and-stick",
      "name": "Hoop and stick",
      "level": 30,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "dartboard",
      "name": "Dartboard",
      "level": 54,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Steel bar",
          "qty": 1
        }
      ],
      "cost": 3287,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "archery-target",
      "name": "Archery target",
      "level": 81,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 6
        },
        {
          "name": "Steel bar",
          "qty": 3
        }
      ],
      "cost": 7155,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    }
  ],
  "games-room:stone": [
    {
      "id": "clay-attack-stone",
      "name": "Clay attack stone",
      "level": 39,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 10
        }
      ],
      "cost": 1220,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "limestone-attack-stone",
      "name": "Limestone attack stone",
      "level": 59,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 10
        }
      ],
      "cost": 3390,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    },
    {
      "id": "marble-attack-stone",
      "name": "Marble attack stone",
      "level": 79,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Games_room",
      "verified": true
    }
  ],
  "study:bookcase": [
    {
      "id": "wooden-bookcase",
      "name": "Wooden bookcase",
      "level": 4,
      "materials": [
        {
          "name": "Plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true,
      "costLabel": "588–7,892"
    },
    {
      "id": "oak-bookcase",
      "name": "Oak bookcase",
      "level": 29,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "mahogany-bookcase",
      "name": "Mahogany bookcase",
      "level": 40,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "study:crystal-ball": [
    {
      "id": "crystal-ball",
      "name": "Crystal ball",
      "level": 42,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Unpowered orb",
          "qty": 1
        }
      ],
      "cost": 2786,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "elemental-sphere",
      "name": "Elemental sphere",
      "level": 54,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Unpowered orb",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 141737,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "crystal-of-power",
      "name": "Crystal of power",
      "level": 66,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Unpowered orb",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 282196,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "study:globe": [
    {
      "id": "globe",
      "name": "Globe",
      "level": 41,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "ornamental-globe",
      "name": "Ornamental globe",
      "level": 50,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "lunar-globe",
      "name": "Lunar globe",
      "level": 59,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 141657,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "celestial-globe",
      "name": "Celestial globe",
      "level": 68,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 141657,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "armillary-sphere",
      "name": "Armillary sphere",
      "level": 77,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 2
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 284440,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "small-orrery",
      "name": "Small orrery",
      "level": 86,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 3
        }
      ],
      "cost": 423174,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "large-orrery",
      "name": "Large orrery",
      "level": 95,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 5
        }
      ],
      "cost": 701076,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "study:lectern": [
    {
      "id": "oak-lectern",
      "name": "Oak lectern",
      "level": 40,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 1
        }
      ],
      "cost": 524,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "eagle-lectern",
      "name": "Eagle lectern",
      "level": 47,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "demon-lectern",
      "name": "Demon lectern",
      "level": 47,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "teak-eagle-lectern",
      "name": "Teak eagle lectern",
      "level": 57,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "teak-demon-lectern",
      "name": "Teak demon lectern",
      "level": 57,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "mahogany-eagle-lectern",
      "name": "Mahogany eagle lectern",
      "level": 67,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 143165,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "mahogany-demon-lectern",
      "name": "Mahogany demon lectern",
      "level": 67,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 143165,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "marble-lectern",
      "name": "Marble lectern",
      "level": 77,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        },
        {
          "name": "Magic stone",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 1475344,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "study:telescope": [
    {
      "id": "oak-telescope",
      "name": "Oak telescope",
      "level": 44,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 1136,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "teak-telescope",
      "name": "Teak telescope",
      "level": 64,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 1892,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "mahogany-telescope",
      "name": "Mahogany telescope",
      "level": 84,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 4302,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "study:wall-chart": [
    {
      "id": "s-t-a-s-h-chart",
      "name": "S.t.a.s.h chart",
      "level": 40,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "S.t.a.s.h blueprint",
          "qty": 1
        }
      ],
      "cost": 380,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "alchemical-chart",
      "name": "Alchemical chart",
      "level": 43,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 760,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "astronomical-chart",
      "name": "Astronomical chart",
      "level": 63,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 1140,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    },
    {
      "id": "infernal-chart",
      "name": "Infernal chart",
      "level": 83,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Study",
      "verified": true
    }
  ],
  "achievement-gallery:adventure-log": [
    {
      "id": "mahogany-adventure-log",
      "name": "Mahogany adventure log",
      "level": 83,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Papyrus",
          "qty": 2
        },
        {
          "name": "Enchanted gem",
          "qty": 1
        }
      ],
      "cost": 6552,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "gilded-adventure-log",
      "name": "Gilded adventure log",
      "level": 88,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 2
        },
        {
          "name": "Enchanted gem",
          "qty": 1
        }
      ],
      "cost": 284224,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "marble-adventure-log",
      "name": "Marble adventure log",
      "level": 93,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Limestone brick",
          "qty": 4
        },
        {
          "name": "Enchanted gem",
          "qty": 1
        }
      ],
      "cost": 678441,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "achievement-gallery:altar": [
    {
      "id": "ancient-altar",
      "name": "Ancient altar",
      "level": 80,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 10
        },
        {
          "name": "Magic stone",
          "qty": 1
        },
        {
          "name": "Ancient signet",
          "qty": 1
        },
        {
          "name": "Pharaoh's sceptre",
          "qty": 1
        }
      ],
      "cost": 9795187,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "lunar-altar",
      "name": "Lunar altar",
      "level": 80,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 10
        },
        {
          "name": "Magic stone",
          "qty": 1
        },
        {
          "name": "Lunar signet",
          "qty": 1
        },
        {
          "name": "Astral rune",
          "qty": 10000
        }
      ],
      "cost": 2151243,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "dark-altar",
      "name": "Dark altar",
      "level": 80,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 10
        },
        {
          "name": "Magic stone",
          "qty": 1
        },
        {
          "name": "Arceuus signet",
          "qty": 1
        },
        {
          "name": "Blood rune",
          "qty": 5000
        },
        {
          "name": "Soul rune",
          "qty": 5000
        }
      ],
      "cost": 4626241,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "occult-altar",
      "name": "Occult altar",
      "level": 90,
      "materials": [],
      "cost": 14570189,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "achievement-gallery:boss-lair": [
    {
      "id": "boss-lair-display",
      "name": "Boss lair display",
      "level": 87,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 4
        },
        {
          "name": "Molten glass",
          "qty": 5
        },
        {
          "name": "Mahogany plank",
          "qty": 10
        }
      ],
      "cost": 23834,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "achievement-gallery:display": [
    {
      "id": "mounted-emblem",
      "name": "Mounted emblem",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Decorative emblem",
          "qty": 1
        }
      ],
      "cost": 477493,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "mounted-coins",
      "name": "Mounted coins",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 100477493,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "cape-hanger",
      "name": "Cape hanger",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 477493,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "achievement-gallery:jewellery-box": [
    {
      "id": "basic-jewellery-box",
      "name": "Basic jewellery box",
      "level": 81,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Steel bar",
          "qty": 1
        },
        {
          "name": "Games necklace(8)",
          "qty": 3
        },
        {
          "name": "Ring of dueling(8)",
          "qty": 3
        }
      ],
      "cost": 6271,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "fancy-jewellery-box",
      "name": "Fancy jewellery box",
      "level": 86,
      "materials": [
        {
          "name": "Basic jewellery box",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Skills necklace(4)",
          "qty": 5
        },
        {
          "name": "Combat bracelet(4)",
          "qty": 5
        }
      ],
      "cost": 268917,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    },
    {
      "id": "ornate-jewellery-box",
      "name": "Ornate jewellery box",
      "level": 91,
      "materials": [
        {
          "name": "Fancy jewellery box",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 2
        },
        {
          "name": "Amulet of glory(4)",
          "qty": 8
        },
        {
          "name": "Ring of wealth (5)",
          "qty": 8
        }
      ],
      "cost": 742931,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "achievement-gallery:quest-list": [
    {
      "id": "quest-list",
      "name": "Quest list",
      "level": 80,
      "materials": [
        {
          "name": "Papyrus",
          "qty": 10
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140101,
      "source": "https://oldschool.runescape.wiki/w/Achievement_gallery",
      "verified": true
    }
  ],
  "portal-chamber:centrepiece": [
    {
      "id": "teleport-focus",
      "name": "Teleport focus",
      "level": 50,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "greater-teleport-focus",
      "name": "Greater teleport focus",
      "level": 65,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "scrying-pool",
      "name": "Scrying pool",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    }
  ],
  "portal-chamber:portal1": [
    {
      "id": "teak-portal",
      "name": "Teak portal",
      "level": 50,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "mahogany-portal",
      "name": "Mahogany portal",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "marble-portal",
      "name": "Marble portal",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1015626,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "raging-echoes-portal",
      "name": "Raging echoes portal",
      "level": 80,
      "materials": [
        {
          "name": "Raging echoes portal scroll",
          "qty": 1
        }
      ],
      "cost": 341375,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    }
  ],
  "portal-chamber:portal2": [
    {
      "id": "teak-portal",
      "name": "Teak portal",
      "level": 50,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "mahogany-portal",
      "name": "Mahogany portal",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "marble-portal",
      "name": "Marble portal",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1015626,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "raging-echoes-portal",
      "name": "Raging echoes portal",
      "level": 80,
      "materials": [
        {
          "name": "Raging echoes portal scroll",
          "qty": 1
        }
      ],
      "cost": 341375,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    }
  ],
  "portal-chamber:portal3": [
    {
      "id": "teak-portal",
      "name": "Teak portal",
      "level": 50,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "mahogany-portal",
      "name": "Mahogany portal",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "marble-portal",
      "name": "Marble portal",
      "level": 80,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1015626,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    },
    {
      "id": "raging-echoes-portal",
      "name": "Raging echoes portal",
      "level": 80,
      "materials": [
        {
          "name": "Raging echoes portal scroll",
          "qty": 1
        }
      ],
      "cost": 341375,
      "source": "https://oldschool.runescape.wiki/w/Portal_chamber",
      "verified": true
    }
  ],
  "superior-garden:fence": [
    {
      "id": "redwood-fence",
      "name": "Redwood fence",
      "level": 75,
      "materials": [
        {
          "name": "Redwood logs",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 9002,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "marble-wall",
      "name": "Marble wall",
      "level": 79,
      "materials": [
        {
          "name": "Marble block",
          "qty": 8
        }
      ],
      "cost": 2708336,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "obsidian-fence",
      "name": "Obsidian fence",
      "level": 83,
      "materials": [
        {
          "name": "Toktz-mej-tal",
          "qty": 10
        },
        {
          "name": "Tzhaar-ket-om",
          "qty": 2
        },
        {
          "name": "Toktz-xil-ul",
          "qty": 25
        }
      ],
      "cost": 5585084,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:pool": [
    {
      "id": "restoration-pool",
      "name": "Restoration pool",
      "level": 65,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 5
        },
        {
          "name": "Bucket of water",
          "qty": 5
        },
        {
          "name": "Soul rune",
          "qty": 1000
        },
        {
          "name": "Body rune",
          "qty": 1000
        }
      ],
      "cost": 397865,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "revitalisation-pool",
      "name": "Revitalisation pool",
      "level": 70,
      "materials": [
        {
          "name": "Restoration pool",
          "qty": 1
        },
        {
          "name": "Stamina potion(4)",
          "qty": 10,
          "note": "unnoted"
        }
      ],
      "cost": 436495,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "rejuvenation-pool",
      "name": "Rejuvenation pool",
      "level": 80,
      "materials": [
        {
          "name": "Revitalisation pool",
          "qty": 1
        },
        {
          "name": "Prayer potion(4)",
          "qty": 10,
          "note": "unnoted"
        }
      ],
      "cost": 533745,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "fancy-rejuvenation-pool",
      "name": "Fancy rejuvenation pool",
      "level": 85,
      "materials": [
        {
          "name": "Rejuvenation pool",
          "qty": 1
        },
        {
          "name": "Super restore(4)",
          "qty": 10,
          "note": "unnoted"
        },
        {
          "name": "Marble block",
          "qty": 2
        }
      ],
      "cost": 1310949,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "ornate-rejuvenation-pool",
      "name": "Ornate rejuvenation pool",
      "level": 90,
      "materials": [
        {
          "name": "Fancy rejuvenation pool",
          "qty": 1
        },
        {
          "name": "Anti-venom(4)",
          "qty": 10,
          "note": "unnoted"
        },
        {
          "name": "Gold leaf",
          "qty": 5
        },
        {
          "name": "Blood rune",
          "qty": 1000
        }
      ],
      "cost": 2447084,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:teleport": [
    {
      "id": "spirit-tree",
      "name": "Spirit tree",
      "level": 83,
      "materials": [
        {
          "name": "Spirit sapling",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "obelisk",
      "name": "Obelisk",
      "level": 80,
      "materials": [
        {
          "name": "Ancient crystal",
          "qty": 4
        },
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1957508,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "fairy-ring",
      "name": "Fairy ring",
      "level": 85,
      "materials": [
        {
          "name": "Mushroom",
          "qty": 10
        },
        {
          "name": "Fairy enchantment",
          "qty": 1
        }
      ],
      "cost": 2080,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "spirit-tree-fairy-ring",
      "name": "Spirit tree & fairy ring",
      "level": 83,
      "materials": [
        {
          "name": "Spirit sapling",
          "qty": 1
        },
        {
          "name": "Mushroom",
          "qty": 10
        },
        {
          "name": "Fairy enchantment",
          "qty": 1
        }
      ],
      "cost": 2080,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:theme": [
    {
      "id": "zen-theme",
      "name": "Zen theme",
      "level": 65,
      "materials": [
        {
          "name": "Bucket of sand",
          "qty": 6
        },
        {
          "name": "Pink dye",
          "qty": 1
        },
        {
          "name": "Bagged nice tree",
          "qty": 1
        }
      ],
      "cost": 3217,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "otherworldly-theme",
      "name": "Otherworldly theme",
      "level": 75,
      "materials": [
        {
          "name": "Supercompost",
          "qty": 8
        },
        {
          "name": "Blue dye",
          "qty": 1
        },
        {
          "name": "Mushroom",
          "qty": 4
        },
        {
          "name": "Magic secateurs",
          "qty": 1
        }
      ],
      "cost": 41316,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "volcanic-theme",
      "name": "Volcanic theme",
      "level": 85,
      "materials": [
        {
          "name": "Granite (5kg)",
          "qty": 2
        },
        {
          "name": "Onyx",
          "qty": 6
        },
        {
          "name": "Fire rune",
          "qty": 1000
        },
        {
          "name": "Lava rune",
          "qty": 2000
        }
      ],
      "cost": 16911168,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:topiary": [
    {
      "id": "topiary-bush",
      "name": "Topiary bush",
      "level": 65,
      "materials": [
        {
          "name": "Topiary hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 26969,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:seating": [
    {
      "id": "teak-garden-bench",
      "name": "Teak garden bench",
      "level": 66,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 6
        }
      ],
      "cost": 5412,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "gnome-bench",
      "name": "Gnome bench",
      "level": 77,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        }
      ],
      "cost": 12642,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "marble-decorative-bench",
      "name": "Marble decorative bench",
      "level": 88,
      "materials": [
        {
          "name": "Marble block",
          "qty": 6
        }
      ],
      "cost": 2031252,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "obsidian-decorative-bench",
      "name": "Obsidian decorative bench",
      "level": 98,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        },
        {
          "name": "Onyx",
          "qty": 1
        },
        {
          "name": "Fire rune",
          "qty": 250
        },
        {
          "name": "Lava rune",
          "qty": 500
        }
      ],
      "cost": 3839374,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "superior-garden:seating-2": [
    {
      "id": "teak-garden-bench",
      "name": "Teak garden bench",
      "level": 66,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 6
        }
      ],
      "cost": 5412,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "gnome-bench",
      "name": "Gnome bench",
      "level": 77,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        }
      ],
      "cost": 12642,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "marble-decorative-bench",
      "name": "Marble decorative bench",
      "level": 88,
      "materials": [
        {
          "name": "Marble block",
          "qty": 6
        }
      ],
      "cost": 2031252,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    },
    {
      "id": "obsidian-decorative-bench",
      "name": "Obsidian decorative bench",
      "level": 98,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        },
        {
          "name": "Onyx",
          "qty": 1
        },
        {
          "name": "Fire rune",
          "qty": 250
        },
        {
          "name": "Lava rune",
          "qty": 500
        }
      ],
      "cost": 3839374,
      "source": "https://oldschool.runescape.wiki/w/Superior_garden",
      "verified": true
    }
  ],
  "menagerie-indoor:arena": [
    {
      "id": "simple-arena",
      "name": "Simple arena",
      "level": 63,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 1492,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "advanced-arena",
      "name": "Advanced arena",
      "level": 73,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 2248,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "glorious-arena",
      "name": "Glorious arena",
      "level": 83,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 4658,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:arena": [
    {
      "id": "simple-arena",
      "name": "Simple arena",
      "level": 63,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 1492,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "advanced-arena",
      "name": "Advanced arena",
      "level": 73,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 2248,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "glorious-arena",
      "name": "Glorious arena",
      "level": 83,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 4658,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-indoor:habitat": [
    {
      "id": "grassland-habitat",
      "name": "Grassland habitat",
      "level": 37,
      "materials": [
        {
          "name": "Bagged dead tree",
          "qty": 1
        },
        {
          "name": "Compost",
          "qty": 2
        }
      ],
      "cost": 1469,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "forest-habitat",
      "name": "Forest habitat",
      "level": 47,
      "materials": [
        {
          "name": "Bagged nice tree",
          "qty": 1
        },
        {
          "name": "Compost",
          "qty": 3
        }
      ],
      "cost": 3182,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "desert-habitat",
      "name": "Desert habitat",
      "level": 57,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        },
        {
          "name": "Bucket of sand",
          "qty": 5
        }
      ],
      "cost": 1879,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "polar-habitat",
      "name": "Polar habitat",
      "level": 67,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Water rune",
          "qty": 2000
        },
        {
          "name": "Ice cooler",
          "qty": 5
        }
      ],
      "cost": 11577,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "volcanic-habitat",
      "name": "Volcanic habitat",
      "level": 77,
      "materials": [
        {
          "name": "Granite (5kg)",
          "qty": 5
        },
        {
          "name": "Lava rune",
          "qty": 100
        }
      ],
      "cost": 5950,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:habitat": [
    {
      "id": "grassland-habitat",
      "name": "Grassland habitat",
      "level": 37,
      "materials": [
        {
          "name": "Bagged dead tree",
          "qty": 1
        },
        {
          "name": "Compost",
          "qty": 2
        }
      ],
      "cost": 1469,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "forest-habitat",
      "name": "Forest habitat",
      "level": 47,
      "materials": [
        {
          "name": "Bagged nice tree",
          "qty": 1
        },
        {
          "name": "Compost",
          "qty": 3
        }
      ],
      "cost": 3182,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "desert-habitat",
      "name": "Desert habitat",
      "level": 57,
      "materials": [
        {
          "name": "Bagged plant 1",
          "qty": 1
        },
        {
          "name": "Bucket of sand",
          "qty": 5
        }
      ],
      "cost": 1879,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "polar-habitat",
      "name": "Polar habitat",
      "level": 67,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Water rune",
          "qty": 2000
        },
        {
          "name": "Ice cooler",
          "qty": 5
        }
      ],
      "cost": 11577,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "volcanic-habitat",
      "name": "Volcanic habitat",
      "level": 77,
      "materials": [
        {
          "name": "Granite (5kg)",
          "qty": 5
        },
        {
          "name": "Lava rune",
          "qty": 100
        }
      ],
      "cost": 5950,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-indoor:pet-feeder": [
    {
      "id": "oak-feeder",
      "name": "Oak feeder",
      "level": 37,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        }
      ],
      "cost": 1611,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-feeder",
      "name": "Teak feeder",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        }
      ],
      "cost": 2745,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-feeder",
      "name": "Mahogany feeder",
      "level": 59,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 147418,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:pet-feeder": [
    {
      "id": "oak-feeder",
      "name": "Oak feeder",
      "level": 37,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        }
      ],
      "cost": 1611,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-feeder",
      "name": "Teak feeder",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        }
      ],
      "cost": 2745,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-feeder",
      "name": "Mahogany feeder",
      "level": 59,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Bucket of milk",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 147418,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-indoor:pet-house": [
    {
      "id": "oak-house",
      "name": "Oak house",
      "level": 37,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-house",
      "name": "Teak house",
      "level": 48,
      "materials": [
        {
          "name": "Oak house",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 5704,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-house",
      "name": "Mahogany house",
      "level": 59,
      "materials": [
        {
          "name": "Teak house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 14132,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "consecrated-house",
      "name": "Consecrated house",
      "level": 70,
      "materials": [
        {
          "name": "Mahogany house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Magic stone",
          "qty": 1
        }
      ],
      "cost": 1020411,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "desecrated-house",
      "name": "Desecrated house",
      "level": 81,
      "materials": [
        {
          "name": "Consecrated house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 1022857,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "nature-house",
      "name": "Nature house",
      "level": 92,
      "materials": [
        {
          "name": "Desecrated house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Bucket of water",
          "qty": 2
        },
        {
          "name": "Supercompost",
          "qty": 3
        }
      ],
      "cost": 1025095,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:pet-house": [
    {
      "id": "oak-house",
      "name": "Oak house",
      "level": 37,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-house",
      "name": "Teak house",
      "level": 48,
      "materials": [
        {
          "name": "Oak house",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 5704,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-house",
      "name": "Mahogany house",
      "level": 59,
      "materials": [
        {
          "name": "Teak house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 14132,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "consecrated-house",
      "name": "Consecrated house",
      "level": 70,
      "materials": [
        {
          "name": "Mahogany house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Magic stone",
          "qty": 1
        }
      ],
      "cost": 1020411,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "desecrated-house",
      "name": "Desecrated house",
      "level": 81,
      "materials": [
        {
          "name": "Consecrated house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 1022857,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "nature-house",
      "name": "Nature house",
      "level": 92,
      "materials": [
        {
          "name": "Desecrated house",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Bucket of water",
          "qty": 2
        },
        {
          "name": "Supercompost",
          "qty": 3
        }
      ],
      "cost": 1025095,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-indoor:pet-list": [
    {
      "id": "pet-list",
      "name": "Pet list",
      "level": 38,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Papyrus",
          "qty": 1
        }
      ],
      "cost": 1543,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:pet-list": [
    {
      "id": "pet-list",
      "name": "Pet list",
      "level": 38,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Papyrus",
          "qty": 1
        }
      ],
      "cost": 1543,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-indoor:scratching-post": [
    {
      "id": "oak-scratching-post",
      "name": "Oak scratching post",
      "level": 39,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 1112,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-scratching-post",
      "name": "Teak scratching post",
      "level": 49,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 2207,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-scratching-post",
      "name": "Mahogany scratching post",
      "level": 59,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 4617,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "menagerie-outdoor:scratching-post": [
    {
      "id": "oak-scratching-post",
      "name": "Oak scratching post",
      "level": 39,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        }
      ],
      "cost": 1112,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "teak-scratching-post",
      "name": "Teak scratching post",
      "level": 49,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 2207,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    },
    {
      "id": "mahogany-scratching-post",
      "name": "Mahogany scratching post",
      "level": 59,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Limestone brick",
          "qty": 1
        }
      ],
      "cost": 4617,
      "source": "https://oldschool.runescape.wiki/w/Menagerie",
      "verified": true
    }
  ],
  "costume-room:armour-case": [
    {
      "id": "oak-armour-case",
      "name": "Oak armour case",
      "level": 46,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-armour-case",
      "name": "Teak armour case",
      "level": 64,
      "materials": [
        {
          "name": "Oak armour case",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 4278,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-armour-case",
      "name": "Mahogany armour case",
      "level": 82,
      "materials": [
        {
          "name": "Teak armour case",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 10599,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "costume-room:cape-rack": [
    {
      "id": "oak-cape-rack",
      "name": "Oak cape rack",
      "level": 54,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-cape-rack",
      "name": "Teak cape rack",
      "level": 63,
      "materials": [
        {
          "name": "Oak cape rack",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 5704,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-cape-rack",
      "name": "Mahogany cape rack",
      "level": 72,
      "materials": [
        {
          "name": "Teak cape rack",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 14132,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "gilded-cape-rack",
      "name": "Gilded cape rack",
      "level": 81,
      "materials": [
        {
          "name": "Mahogany cape rack",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 161511,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "marble-cape-rack",
      "name": "Marble cape rack",
      "level": 90,
      "materials": [
        {
          "name": "Gilded cape rack",
          "qty": 1
        },
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 500053,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "magical-cape-rack",
      "name": "Magical cape rack",
      "level": 99,
      "materials": [
        {
          "name": "Marble cape rack",
          "qty": 1
        },
        {
          "name": "Magic stone",
          "qty": 1
        }
      ],
      "cost": 1497904,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "costume-room:fancy-dress": [
    {
      "id": "oak-fancy-dress-box",
      "name": "Oak fancy dress box",
      "level": 44,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-fancy-dress-box",
      "name": "Teak fancy dress box",
      "level": 62,
      "materials": [
        {
          "name": "Oak fancy dress box",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 2852,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-fancy-dress-box",
      "name": "Mahogany fancy dress box",
      "level": 80,
      "materials": [
        {
          "name": "Teak fancy dress box",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 7066,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "costume-room:magic-wardrobe": [
    {
      "id": "oak-magic-wardrobe",
      "name": "Oak magic wardrobe",
      "level": 42,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "carved-oak-magic-wardrobe",
      "name": "Carved oak magic wardrobe",
      "level": 51,
      "materials": [
        {
          "name": "Oak magic wardrobe",
          "qty": 1
        },
        {
          "name": "Oak plank",
          "qty": 6
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-magic-wardrobe",
      "name": "Teak magic wardrobe",
      "level": 60,
      "materials": [
        {
          "name": "Carved oak magic wardrobe",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 8848,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "carved-teak-magic-wardrobe",
      "name": "Carved teak magic wardrobe",
      "level": 69,
      "materials": [
        {
          "name": "Teak magic wardrobe",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 6
        }
      ],
      "cost": 14260,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-magic-wardrobe",
      "name": "Mahogany magic wardrobe",
      "level": 78,
      "materials": [
        {
          "name": "Carved teak magic wardrobe",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 22688,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "gilded-magic-wardrobe",
      "name": "Gilded magic wardrobe",
      "level": 87,
      "materials": [
        {
          "name": "Mahogany magic wardrobe",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 170067,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "marble-magic-wardrobe",
      "name": "Marble magic wardrobe",
      "level": 96,
      "materials": [
        {
          "name": "Gilded magic wardrobe",
          "qty": 1
        },
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 508609,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "costume-room:toy-box": [
    {
      "id": "oak-toy-box",
      "name": "Oak toy box",
      "level": 50,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-toy-box",
      "name": "Teak toy box",
      "level": 68,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-toy-box",
      "name": "Mahogany toy box",
      "level": 86,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 4214,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "costume-room:treasure-chest": [
    {
      "id": "oak-treasure-chest",
      "name": "Oak treasure chest",
      "level": 48,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "teak-treasure-chest",
      "name": "Teak treasure chest",
      "level": 66,
      "materials": [
        {
          "name": "Oak treasure chest",
          "qty": 1
        },
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 2852,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    },
    {
      "id": "mahogany-treasure-chest",
      "name": "Mahogany treasure chest",
      "level": 84,
      "materials": [
        {
          "name": "Teak treasure chest",
          "qty": 1
        },
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 7066,
      "source": "https://oldschool.runescape.wiki/w/Costume_room",
      "verified": true
    }
  ],
  "skill-hall:armour": [
    {
      "id": "cw-armour-1",
      "name": "Cw armour 1",
      "level": 28,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Decorative helm (red)",
          "qty": 1
        },
        {
          "name": "Decorative armour (red platebody)",
          "qty": 1
        },
        {
          "name": "Decorative shield (red)",
          "qty": 1
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "costLabel": "1,048 + 18"
    },
    {
      "id": "cw-armour-2",
      "name": "Cw armour 2",
      "level": 28,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Decorative helm (white)",
          "qty": 1
        },
        {
          "name": "Decorative armour (white platebody)",
          "qty": 1
        },
        {
          "name": "Decorative shield (white)",
          "qty": 1
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "costLabel": "1,048 + 180"
    },
    {
      "id": "cw-armour-3",
      "name": "Cw armour 3",
      "level": 28,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Decorative helm (gold)",
          "qty": 1
        },
        {
          "name": "Decorative armour (gold platebody)",
          "qty": 1
        },
        {
          "name": "Decorative shield (gold)",
          "qty": 1
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "costLabel": "1,048 + 1,800"
    },
    {
      "id": "mithril-armour",
      "name": "Mithril armour",
      "level": 68,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Mithril full helm",
          "qty": 1
        },
        {
          "name": "Mithril platebody",
          "qty": 1
        },
        {
          "name": "Mithril plateskirt",
          "qty": 1
        }
      ],
      "cost": 5437,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "adamantite-armour",
      "name": "Adamantite armour",
      "level": 88,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Adamant full helm",
          "qty": 1
        },
        {
          "name": "Adamant platebody",
          "qty": 1
        },
        {
          "name": "Adamant plateskirt",
          "qty": 1
        }
      ],
      "cost": 15880,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "runite-armour",
      "name": "Runite armour",
      "level": 99,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Rune full helm",
          "qty": 1
        },
        {
          "name": "Rune platebody",
          "qty": 1
        },
        {
          "name": "Rune plateskirt",
          "qty": 1
        }
      ],
      "cost": 98166,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    }
  ],
  "skill-hall:head-trophy": [
    {
      "id": "teak-display",
      "name": "Teak display",
      "level": 38,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "mahogany-display",
      "name": "Mahogany display",
      "level": 58,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 4214,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "gilded-display",
      "name": "Gilded display",
      "level": 78,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 282116,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    }
  ],
  "skill-hall:fishing-trophy": [
    {
      "id": "oak-display",
      "name": "Oak display",
      "level": 36,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "teak-display",
      "name": "Teak display",
      "level": 56,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "mahogany-display",
      "name": "Mahogany display",
      "level": 76,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 4214,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    }
  ],
  "skill-hall:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    }
  ],
  "skill-hall:stair": [
    {
      "id": "oak-staircase",
      "name": "Oak staircase",
      "level": 27,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 7564,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "teak-staircase",
      "name": "Teak staircase",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 11344,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "limestone-spiral-staircase",
      "name": "Limestone spiral staircase",
      "level": 67,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Limestone brick",
          "qty": 7
        }
      ],
      "cost": 11393,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-staircase",
      "name": "Marble staircase",
      "level": 82,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 5
        }
      ],
      "cost": 1703245,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-spiral",
      "name": "Marble spiral",
      "level": 97,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Marble block",
          "qty": 7
        }
      ],
      "cost": 2378814,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true,
      "role": "stairs"
    }
  ],
  "skill-hall:rune-case": [
    {
      "id": "rune-case-1",
      "name": "Rune case 1",
      "level": 14,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 2
        },
        {
          "name": "Air rune",
          "qty": 1
        },
        {
          "name": "Earth rune",
          "qty": 1
        },
        {
          "name": "Fire rune",
          "qty": 1
        },
        {
          "name": "Water rune",
          "qty": 1
        }
      ],
      "cost": 2002,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "rune-case-2",
      "name": "Rune case 2",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 2
        },
        {
          "name": "Body rune",
          "qty": 1
        },
        {
          "name": "Chaos rune",
          "qty": 1
        },
        {
          "name": "Cosmic rune",
          "qty": 1
        },
        {
          "name": "Nature rune",
          "qty": 1
        }
      ],
      "cost": 2349,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    },
    {
      "id": "rune-case-3",
      "name": "Rune case 3",
      "level": 90,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 2
        },
        {
          "name": "Blood rune",
          "qty": 1
        },
        {
          "name": "Death rune",
          "qty": 1
        },
        {
          "name": "Law rune",
          "qty": 1
        },
        {
          "name": "Soul rune",
          "qty": 1
        }
      ],
      "cost": 3015,
      "source": "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
      "verified": true
    }
  ],
  "bedroom:bed": [
    {
      "id": "wooden-bed",
      "name": "Wooden bed",
      "level": 20,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true,
      "costLabel": "1,201–6,679"
    },
    {
      "id": "oak-bed",
      "name": "Oak bed",
      "level": 30,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 2332,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "large-oak-bed",
      "name": "Large oak bed",
      "level": 34,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 3380,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "teak-bed",
      "name": "Teak bed",
      "level": 40,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 3466,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "large-teak-bed",
      "name": "Large teak bed",
      "level": 45,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 5270,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "4-poster",
      "name": "4-poster",
      "level": 53,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 7081,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "gilded-4-poster",
      "name": "Gilded 4-poster",
      "level": 60,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 289197,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:corner": [
    {
      "id": "oak-clock",
      "name": "Oak clock",
      "level": 25,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Clockwork",
          "qty": 1
        }
      ],
      "cost": 1880,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "teak-clock",
      "name": "Teak clock",
      "level": 55,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Clockwork",
          "qty": 1
        }
      ],
      "cost": 2636,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "servants-money-bag",
      "name": "Servant's money bag",
      "level": 58,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 143545,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "gilded-clock",
      "name": "Gilded clock",
      "level": 85,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Clockwork",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 143997,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:curtain": [
    {
      "id": "torn-curtains",
      "name": "Torn curtains",
      "level": 2,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true,
      "costLabel": "1,581–7,059"
    },
    {
      "id": "curtains",
      "name": "Curtains",
      "level": 18,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 2712,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "opulent-curtains",
      "name": "Opulent curtains",
      "level": 40,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 3846,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "raging-echoes-curtains",
      "name": "Raging echoes curtains",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Raging echoes curtains",
          "qty": 1
        }
      ],
      "cost": 214300,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:dresser": [
    {
      "id": "shaving-stand",
      "name": "Shaving stand",
      "level": 21,
      "materials": [
        {
          "name": "Plank",
          "qty": 1
        },
        {
          "name": "Nails",
          "qty": 1
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true,
      "costLabel": "235–2,061"
    },
    {
      "id": "oak-shaving-stand",
      "name": "Oak shaving stand",
      "level": 29,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 1
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 612,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "oak-dresser",
      "name": "Oak dresser",
      "level": 37,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 1136,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "teak-dresser",
      "name": "Teak dresser",
      "level": 46,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 1892,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "fancy-teak-dresser",
      "name": "Fancy teak dresser",
      "level": 56,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 2
        }
      ],
      "cost": 1980,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "mahogany-dresser",
      "name": "Mahogany dresser",
      "level": 64,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        }
      ],
      "cost": 4302,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "gilded-dresser",
      "name": "Gilded dresser",
      "level": 74,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 143341,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:fireplace": [
    {
      "id": "clay-fireplace",
      "name": "Clay fireplace",
      "level": 3,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 3
        }
      ],
      "cost": 366,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "stone-fireplace",
      "name": "Stone fireplace",
      "level": 33,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "marble-fireplace",
      "name": "Marble fireplace",
      "level": 63,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:rug": [
    {
      "id": "brown-rug",
      "name": "Brown rug",
      "level": 2,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 760,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "bedroom:wardrobe": [
    {
      "id": "shoe-box",
      "name": "Shoe box",
      "level": 20,
      "materials": [
        {
          "name": "Plank",
          "qty": 2
        },
        {
          "name": "Nails",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true,
      "costLabel": "294–3,946"
    },
    {
      "id": "oak-drawers",
      "name": "Oak drawers",
      "level": 27,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "oak-wardrobe",
      "name": "Oak wardrobe",
      "level": 39,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "teak-drawers",
      "name": "Teak drawers",
      "level": 51,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "teak-wardrobe",
      "name": "Teak wardrobe",
      "level": 63,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "mahogany-wardrobe",
      "name": "Mahogany wardrobe",
      "level": 75,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    },
    {
      "id": "gilded-wardrobe",
      "name": "Gilded wardrobe",
      "level": 87,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 145272,
      "source": "https://oldschool.runescape.wiki/w/Bedroom",
      "verified": true
    }
  ],
  "chapel:altar": [
    {
      "id": "oak-altar",
      "name": "Oak altar",
      "level": 45,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "teak-altar",
      "name": "Teak altar",
      "level": 50,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "cloth-altar",
      "name": "Cloth altar",
      "level": 56,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 4368,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "mahogany-altar",
      "name": "Mahogany altar",
      "level": 60,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 9188,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "limestone-altar",
      "name": "Limestone altar",
      "level": 64,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        },
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 14080,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "marble-altar",
      "name": "Marble altar",
      "level": 70,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 677844,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "gilded-altar",
      "name": "Gilded altar",
      "level": 75,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 4
        }
      ],
      "cost": 1233648,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:lamp": [
    {
      "id": "steel-torches",
      "name": "Steel torches",
      "level": 45,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 1162,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "wooden-torches",
      "name": "Wooden torches",
      "level": 49,
      "materials": [
        {
          "name": "Plank",
          "qty": 2
        },
        {
          "name": "Nails",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true,
      "costLabel": "294–3,946"
    },
    {
      "id": "steel-candlesticks",
      "name": "Steel candlesticks",
      "level": 53,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        },
        {
          "name": "Candle",
          "qty": 6
        }
      ],
      "cost": 5202,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "gold-candlesticks",
      "name": "Gold candlesticks",
      "level": 57,
      "materials": [
        {
          "name": "Gold bar",
          "qty": 6
        },
        {
          "name": "Candle",
          "qty": 6
        }
      ],
      "cost": 2118,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "oak-incense-burners",
      "name": "Oak incense burners",
      "level": 61,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 3258,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "mahogany-incense-burners",
      "name": "Mahogany incense burners",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 9590,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "marble-incense-burners",
      "name": "Marble incense burners",
      "level": 69,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 678246,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:icon": [
    {
      "id": "gnome-child-icon",
      "name": "Gnome child icon",
      "level": 45,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Gnome child icon",
          "qty": 1
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "grid-master-icon",
      "name": "Grid Master Icon",
      "level": 45,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Grid master altar icon scroll",
          "qty": 1
        }
      ],
      "cost": 85945,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "guthix-symbol",
      "name": "Guthix symbol",
      "level": 48,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "saradomin-symbol",
      "name": "Saradomin symbol",
      "level": 48,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "zamorak-symbol",
      "name": "Zamorak symbol",
      "level": 48,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "guthix-icon",
      "name": "Guthix icon",
      "level": 59,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 281510,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "saradomin-icon",
      "name": "Saradomin icon",
      "level": 59,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 281510,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "zamorak-icon",
      "name": "Zamorak icon",
      "level": 59,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 281510,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:musical": [
    {
      "id": "windchimes",
      "name": "Windchimes",
      "level": 49,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true,
      "costLabel": "4,432–11,736"
    },
    {
      "id": "bells",
      "name": "Bells",
      "level": 58,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 7094,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "organ",
      "name": "Organ",
      "level": 69,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 11914,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:statue": [
    {
      "id": "small-statue",
      "name": "Small statue",
      "level": 49,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "medium-statue",
      "name": "Medium statue",
      "level": 69,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "large-statue",
      "name": "Large statue",
      "level": 89,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1015626,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:window": [
    {
      "id": "shuttered-window",
      "name": "Shuttered window",
      "level": 49,
      "materials": [
        {
          "name": "Plank",
          "qty": 8
        },
        {
          "name": "Nails",
          "qty": 8
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true,
      "costLabel": "1,176–15,784"
    },
    {
      "id": "decorative-window",
      "name": "Decorative window",
      "level": 69,
      "materials": [
        {
          "name": "Molten glass",
          "qty": 8
        }
      ],
      "cost": 704,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "stained-glass",
      "name": "Stained glass",
      "level": 89,
      "materials": [
        {
          "name": "Molten glass",
          "qty": 16
        }
      ],
      "cost": 1408,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "chapel:rug": [
    {
      "id": "brown-rug",
      "name": "Brown rug",
      "level": 2,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 760,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Chapel",
      "verified": true
    }
  ],
  "portal-nexus:amulet": [
    {
      "id": "mounted-xerics-talisman",
      "name": "Mounted xeric's talisman",
      "level": 72,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Xeric's talisman (inert)",
          "qty": 1
        },
        {
          "name": "Lizardman fang",
          "qty": 5000
        }
      ],
      "cost": 186058,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "mounted-digsite-pendant",
      "name": "Mounted digsite pendant",
      "level": 82,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Curator's medallion",
          "qty": 1
        }
      ],
      "cost": 336858,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    }
  ],
  "portal-nexus:curtain": [
    {
      "id": "torn-curtains",
      "name": "Torn curtains",
      "level": 2,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true,
      "costLabel": "1,581–7,059"
    },
    {
      "id": "curtains",
      "name": "Curtains",
      "level": 18,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 2712,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "opulent-curtains",
      "name": "Opulent curtains",
      "level": 40,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 3846,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "raging-echoes-curtains",
      "name": "Raging echoes curtains",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Raging echoes curtains",
          "qty": 1
        }
      ],
      "cost": 214300,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    }
  ],
  "portal-nexus:rug": [
    {
      "id": "brown-rug",
      "name": "Brown rug",
      "level": 2,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 760,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    }
  ],
  "portal-nexus:nexus": [
    {
      "id": "marble-portal-nexus",
      "name": "Marble portal nexus",
      "level": 72,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "gilded-portal-nexus",
      "name": "Gilded portal nexus",
      "level": 82,
      "materials": [
        {
          "name": "Marble portal nexus",
          "qty": 1
        },
        {
          "name": "Marble block",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 2986238,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    },
    {
      "id": "crystalline-portal-nexus",
      "name": "Crystalline portal nexus",
      "level": 92,
      "materials": [
        {
          "name": "Gilded portal nexus",
          "qty": 1
        },
        {
          "name": "Magic stone",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 5259842,
      "source": "https://oldschool.runescape.wiki/w/Portal_nexus",
      "verified": true
    }
  ],
  "league-hall:banner": [
    {
      "id": "banner-stand",
      "name": "Banner stand",
      "level": 30,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "ornate-banner-stand",
      "name": "Ornate banner stand",
      "level": 66,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 816035,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "trailblazer-rug",
      "name": "Trailblazer rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Trailblazer rug",
          "qty": 1
        }
      ],
      "cost": 1871593,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:outfit": [
    {
      "id": "oak-outfit-stand",
      "name": "Oak outfit stand",
      "level": 34,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        }
      ],
      "cost": 2096,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "mahogany-outfit-stand",
      "name": "Mahogany outfit stand",
      "level": 74,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 147379,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:pedestal": [
    {
      "id": "trophy-pedestal",
      "name": "Trophy pedestal",
      "level": 27,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 4
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Red dye",
          "qty": 1
        }
      ],
      "cost": 8833,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "ornate-trophy-pedestal",
      "name": "Ornate trophy pedestal",
      "level": 64,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Rope",
          "qty": 1
        },
        {
          "name": "Red dye",
          "qty": 1
        }
      ],
      "cost": 1154982,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:scroll": [
    {
      "id": "league-accomplishments-scroll",
      "name": "League accomplishments scroll",
      "level": 48,
      "materials": [
        {
          "name": "Papyrus",
          "qty": 10
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140101,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:statue": [
    {
      "id": "league-statue",
      "name": "League statue",
      "level": 32,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 6
        }
      ],
      "cost": 2034,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "trailblazer-globe",
      "name": "Trailblazer globe",
      "level": 32,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        },
        {
          "name": "Trailblazer globe",
          "qty": 1
        }
      ],
      "cost": 1518612,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "ornate-league-statue",
      "name": "Ornate league statue",
      "level": 68,
      "materials": [
        {
          "name": "Marble block",
          "qty": 6
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 2170203,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "league-hall:trophy-case": [
    {
      "id": "oak-trophy-case",
      "name": "Oak trophy case",
      "level": 36,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 6
        }
      ],
      "cost": 3144,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    },
    {
      "id": "mahogany-trophy-case",
      "name": "Mahogany trophy case",
      "level": 78,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 6
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 290544,
      "source": "https://oldschool.runescape.wiki/w/League_hall",
      "verified": true
    }
  ],
  "kitchen:barrel": [
    {
      "id": "beer-barrel",
      "name": "Beer barrel",
      "level": 5,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "441–5,919"
    },
    {
      "id": "cider-barrel",
      "name": "Cider barrel",
      "level": 14,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        },
        {
          "name": "Cider",
          "qty": 8
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "1,473–6,951"
    },
    {
      "id": "asgarnian-ale",
      "name": "Asgarnian ale",
      "level": 24,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Asgarnian ale",
          "qty": 8
        }
      ],
      "cost": 2852,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "greenmans-ale",
      "name": "Greenman's ale",
      "level": 29,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Greenman's ale",
          "qty": 8
        }
      ],
      "cost": 3580,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "dragon-bitter",
      "name": "Dragon bitter",
      "level": 39,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Steel bar",
          "qty": 2
        },
        {
          "name": "Dragon bitter",
          "qty": 8
        }
      ],
      "cost": 4342,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "chefs-delight",
      "name": "Chef's delight",
      "level": 44,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Steel bar",
          "qty": 2
        },
        {
          "name": "Chef's delight",
          "qty": 8
        }
      ],
      "cost": 4638,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:cat-basket": [
    {
      "id": "cat-blanket",
      "name": "Cat blanket",
      "level": 5,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 1
        }
      ],
      "cost": 380,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "cat-basket",
      "name": "Cat basket",
      "level": 19,
      "materials": [
        {
          "name": "Plank",
          "qty": 2
        },
        {
          "name": "Nails",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "294–3,946"
    },
    {
      "id": "cushioned-basket",
      "name": "Cushioned basket",
      "level": 33,
      "materials": [
        {
          "name": "Plank",
          "qty": 2
        },
        {
          "name": "Nails",
          "qty": 2
        },
        {
          "name": "Wool",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "324–3,976"
    }
  ],
  "kitchen:larder": [
    {
      "id": "wooden-larder",
      "name": "Wooden larder",
      "level": 9,
      "materials": [
        {
          "name": "Plank",
          "qty": 8
        },
        {
          "name": "Nails",
          "qty": 8
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "1,176–15,784"
    },
    {
      "id": "oak-larder",
      "name": "Oak larder",
      "level": 33,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 8
        }
      ],
      "cost": 4192,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "teak-larder",
      "name": "Teak larder",
      "level": 43,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 8
        },
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 7976,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:shelf": [
    {
      "id": "wooden-shelves-1",
      "name": "Wooden shelves 1",
      "level": 6,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "441–5,919"
    },
    {
      "id": "wooden-shelves-2",
      "name": "Wooden shelves 2",
      "level": 12,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "1,173–6,651"
    },
    {
      "id": "wooden-shelves-3",
      "name": "Wooden shelves 3",
      "level": 23,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "1,173–6,651"
    },
    {
      "id": "oak-shelves-1",
      "name": "Oak shelves 1",
      "level": 34,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        }
      ],
      "cost": 2304,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "oak-shelves-2",
      "name": "Oak shelves 2",
      "level": 45,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        }
      ],
      "cost": 2304,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "teak-shelves-1",
      "name": "Teak shelves 1",
      "level": 56,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        }
      ],
      "cost": 3438,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "teak-shelves-2",
      "name": "Teak shelves 2",
      "level": 67,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 281340,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:sink": [
    {
      "id": "pump-and-drain",
      "name": "Pump and drain",
      "level": 7,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 5
        }
      ],
      "cost": 2905,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "pump-and-tub",
      "name": "Pump and tub",
      "level": 27,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 5810,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "sink",
      "name": "Sink",
      "level": 47,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 15
        }
      ],
      "cost": 8715,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "gold-sink",
      "name": "Gold sink",
      "level": 47,
      "materials": [
        {
          "name": "Condensed gold",
          "qty": 10
        },
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Gold leaf",
          "qty": 5
        }
      ],
      "cost": 106155780,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:spice-rack": [
    {
      "id": "spice-rack",
      "name": "Spice rack",
      "level": 60,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 6
        },
        {
          "name": "Brown spice (4)",
          "qty": 1
        },
        {
          "name": "Orange spice (4)",
          "qty": 1
        },
        {
          "name": "Red spice (4)",
          "qty": 1
        },
        {
          "name": "Yellow spice (4)",
          "qty": 1
        }
      ],
      "cost": 3438,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:stove": [
    {
      "id": "firepit",
      "name": "Firepit",
      "level": 5,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 1
        },
        {
          "name": "Soft clay",
          "qty": 2
        }
      ],
      "cost": 825,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "firepit-with-hook",
      "name": "Firepit with hook",
      "level": 11,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 2
        },
        {
          "name": "Soft clay",
          "qty": 2
        }
      ],
      "cost": 1406,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "firepit-with-pot",
      "name": "Firepit with pot",
      "level": 17,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 3
        },
        {
          "name": "Soft clay",
          "qty": 2
        }
      ],
      "cost": 1987,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "small-oven",
      "name": "Small oven",
      "level": 24,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 2324,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "large-oven",
      "name": "Large oven",
      "level": 29,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 5
        }
      ],
      "cost": 2905,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "steel-range",
      "name": "Steel range",
      "level": 34,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "fancy-range",
      "name": "Fancy range",
      "level": 42,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 8
        }
      ],
      "cost": 4648,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "kitchen:table": [
    {
      "id": "kitchen-table",
      "name": "Kitchen table",
      "level": 12,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true,
      "costLabel": "441–5,919"
    },
    {
      "id": "oak-kitchen-table",
      "name": "Oak kitchen table",
      "level": 32,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    },
    {
      "id": "teak-kitchen-table",
      "name": "Teak kitchen table",
      "level": 52,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        }
      ],
      "cost": 2706,
      "source": "https://oldschool.runescape.wiki/w/Kitchen",
      "verified": true
    }
  ],
  "formal-garden:big-plant": [
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "sunflower",
      "name": "Sunflower",
      "level": 66,
      "materials": [
        {
          "name": "Bagged sunflower",
          "qty": 1
        }
      ],
      "cost": 6286,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "marigolds",
      "name": "Marigolds",
      "level": 71,
      "materials": [
        {
          "name": "Bagged marigolds",
          "qty": 1
        }
      ],
      "cost": 11597,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "roses",
      "name": "Roses",
      "level": 76,
      "materials": [
        {
          "name": "Bagged roses",
          "qty": 1
        }
      ],
      "cost": 18191,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:small-plant": [
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "sunflower",
      "name": "Sunflower",
      "level": 66,
      "materials": [
        {
          "name": "Bagged sunflower",
          "qty": 1
        }
      ],
      "cost": 6286,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "marigolds",
      "name": "Marigolds",
      "level": 71,
      "materials": [
        {
          "name": "Bagged marigolds",
          "qty": 1
        }
      ],
      "cost": 11597,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "roses",
      "name": "Roses",
      "level": 76,
      "materials": [
        {
          "name": "Bagged roses",
          "qty": 1
        }
      ],
      "cost": 18191,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:big-plant-2": [
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "rosemary",
      "name": "Rosemary",
      "level": 66,
      "materials": [
        {
          "name": "Bagged flower",
          "qty": 1
        }
      ],
      "cost": 6381,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "daffodils",
      "name": "Daffodils",
      "level": 71,
      "materials": [
        {
          "name": "Bagged daffodils",
          "qty": 1
        }
      ],
      "cost": 12076,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "bluebells",
      "name": "Bluebells",
      "level": 76,
      "materials": [
        {
          "name": "Bagged bluebells",
          "qty": 1
        }
      ],
      "cost": 18006,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:small-plant-2": [
    {
      "id": "pumpkin",
      "name": "Pumpkin",
      "level": 1,
      "materials": [
        {
          "name": "Magical pumpkin",
          "qty": 1
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-1",
      "name": "Beehive (style 1)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "beehive-style-2",
      "name": "Beehive (style 2)",
      "level": 1,
      "materials": [
        {
          "name": "Sturdy beehive parts",
          "qty": 10
        }
      ],
      "cost": 0,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "rosemary",
      "name": "Rosemary",
      "level": 66,
      "materials": [
        {
          "name": "Bagged flower",
          "qty": 1
        }
      ],
      "cost": 6381,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "daffodils",
      "name": "Daffodils",
      "level": 71,
      "materials": [
        {
          "name": "Bagged daffodils",
          "qty": 1
        }
      ],
      "cost": 12076,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "bluebells",
      "name": "Bluebells",
      "level": 76,
      "materials": [
        {
          "name": "Bagged bluebells",
          "qty": 1
        }
      ],
      "cost": 18006,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:centrepiece": [
    {
      "id": "exit-portal",
      "name": "Exit portal",
      "level": 1,
      "materials": [
        {
          "name": "Iron bar",
          "qty": 10
        }
      ],
      "cost": 2010,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "greenman-statue",
      "name": "Greenman statue",
      "level": 1,
      "materials": [
        {
          "name": "Greenman statue",
          "qty": 1
        }
      ],
      "cost": 66699,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "exit-portal-annihilation-unlock",
      "name": "Exit portal (Annihilation unlock)",
      "level": 1,
      "materials": [
        {
          "name": "Iron bar",
          "qty": 10
        },
        {
          "name": "Annihilation exit portal blueprints",
          "qty": 1
        }
      ],
      "cost": 2010,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "gazebo",
      "name": "Gazebo",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 8
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 19180,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "dungeon-entrance",
      "name": "Dungeon entrance",
      "level": 70,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true,
      "role": "dungeon-entrance"
    },
    {
      "id": "small-fountain",
      "name": "Small fountain",
      "level": 71,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "large-fountain",
      "name": "Large fountain",
      "level": 75,
      "materials": [
        {
          "name": "Marble block",
          "qty": 2
        }
      ],
      "cost": 677084,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "posh-fountain",
      "name": "Posh fountain",
      "level": 81,
      "materials": [
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1015626,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:fencing": [
    {
      "id": "boundary-stones",
      "name": "Boundary stones",
      "level": 55,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 10
        }
      ],
      "cost": 1220,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "wooden-fence",
      "name": "Wooden fence",
      "level": 59,
      "materials": [
        {
          "name": "Plank",
          "qty": 10
        }
      ],
      "cost": 1440,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "stone-wall",
      "name": "Stone wall",
      "level": 63,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 10
        }
      ],
      "cost": 3390,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "iron-railings",
      "name": "Iron railings",
      "level": 67,
      "materials": [
        {
          "name": "Iron bar",
          "qty": 10
        },
        {
          "name": "Limestone brick",
          "qty": 6
        }
      ],
      "cost": 4044,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "picket-fence",
      "name": "Picket fence",
      "level": 71,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 6402,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "garden-fence",
      "name": "Garden fence",
      "level": 75,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 10182,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "marble-wall",
      "name": "Marble wall",
      "level": 79,
      "materials": [
        {
          "name": "Marble block",
          "qty": 8
        }
      ],
      "cost": 2708336,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:hedging": [
    {
      "id": "thorny-hedge",
      "name": "Thorny hedge",
      "level": 56,
      "materials": [
        {
          "name": "Thorny hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 5584,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "nice-hedge",
      "name": "Nice hedge",
      "level": 60,
      "materials": [
        {
          "name": "Nice hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 11687,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "small-box-hedge",
      "name": "Small box hedge",
      "level": 64,
      "materials": [
        {
          "name": "Small box hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 16252,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "topiary-hedge",
      "name": "Topiary hedge",
      "level": 68,
      "materials": [
        {
          "name": "Topiary hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 26969,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "fancy-hedge",
      "name": "Fancy hedge",
      "level": 72,
      "materials": [
        {
          "name": "Fancy hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 28018,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "tall-fancy-hedge",
      "name": "Tall fancy hedge",
      "level": 76,
      "materials": [
        {
          "name": "Tall fancy hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 49699,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    },
    {
      "id": "tall-box-hedge",
      "name": "Tall box hedge",
      "level": 80,
      "materials": [
        {
          "name": "Tall box hedge (bagged)",
          "qty": 1
        }
      ],
      "cost": 110154,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "formal-garden:tip-jar": [
    {
      "id": "tip-jar",
      "name": "Tip jar",
      "level": 40,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Molten glass",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        },
        {
          "name": "Platinum token",
          "qty": 5
        }
      ],
      "cost": 148253,
      "source": "https://oldschool.runescape.wiki/w/Formal_garden",
      "verified": true
    }
  ],
  "parlour:bookcase": [
    {
      "id": "wooden-bookcase",
      "name": "Wooden bookcase",
      "level": 4,
      "materials": [
        {
          "name": "Plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true,
      "costLabel": "588–7,892"
    },
    {
      "id": "oak-bookcase",
      "name": "Oak bookcase",
      "level": 29,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "mahogany-bookcase",
      "name": "Mahogany bookcase",
      "level": 40,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    }
  ],
  "parlour:chair": [
    {
      "id": "crude-wooden-chair",
      "name": "Crude wooden chair",
      "level": 1,
      "materials": [
        {
          "name": "Plank",
          "qty": 2
        },
        {
          "name": "Nails",
          "qty": 2
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true,
      "costLabel": "294–3,946"
    },
    {
      "id": "wooden-chair",
      "name": "Wooden chair",
      "level": 8,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true,
      "costLabel": "441–5,919"
    },
    {
      "id": "rocking-chair",
      "name": "Rocking chair",
      "level": 14,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true,
      "costLabel": "441–5,919"
    },
    {
      "id": "oak-chair",
      "name": "Oak chair",
      "level": 19,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "oak-armchair",
      "name": "Oak armchair",
      "level": 26,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "teak-armchair",
      "name": "Teak armchair",
      "level": 35,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "mahogany-armchair",
      "name": "Mahogany armchair",
      "level": 50,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        }
      ],
      "cost": 4214,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    }
  ],
  "parlour:curtain": [
    {
      "id": "torn-curtains",
      "name": "Torn curtains",
      "level": 2,
      "materials": [
        {
          "name": "Plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Nails",
          "qty": 3
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true,
      "costLabel": "1,581–7,059"
    },
    {
      "id": "curtains",
      "name": "Curtains",
      "level": 18,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 2712,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "opulent-curtains",
      "name": "Opulent curtains",
      "level": 40,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        }
      ],
      "cost": 3846,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "raging-echoes-curtains",
      "name": "Raging echoes curtains",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Bolt of cloth",
          "qty": 3
        },
        {
          "name": "Raging echoes curtains",
          "qty": 1
        }
      ],
      "cost": 214300,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    }
  ],
  "parlour:fireplace": [
    {
      "id": "clay-fireplace",
      "name": "Clay fireplace",
      "level": 3,
      "materials": [
        {
          "name": "Soft clay",
          "qty": 3
        }
      ],
      "cost": 366,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "stone-fireplace",
      "name": "Stone fireplace",
      "level": 33,
      "materials": [
        {
          "name": "Limestone brick",
          "qty": 2
        }
      ],
      "cost": 678,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "marble-fireplace",
      "name": "Marble fireplace",
      "level": 63,
      "materials": [
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 338542,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    }
  ],
  "parlour:rug": [
    {
      "id": "brown-rug",
      "name": "Brown rug",
      "level": 2,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 2
        }
      ],
      "cost": 760,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Parlour",
      "verified": true
    }
  ],
  "combat-room:ring": [
    {
      "id": "boxing-ring",
      "name": "Boxing ring",
      "level": 32,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 6
        },
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 4664,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "fencing-ring",
      "name": "Fencing ring",
      "level": 41,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 8
        },
        {
          "name": "Bolt of cloth",
          "qty": 6
        }
      ],
      "cost": 6472,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "combat-ring",
      "name": "Combat ring",
      "level": 51,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 6
        },
        {
          "name": "Bolt of cloth",
          "qty": 6
        }
      ],
      "cost": 7692,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "ranging-pedestals",
      "name": "Ranging pedestals",
      "level": 71,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 8
        }
      ],
      "cost": 7216,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "balance-beam",
      "name": "Balance beam",
      "level": 81,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 5
        }
      ],
      "cost": 11925,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    }
  ],
  "combat-room:decoration": [
    {
      "id": "gilded-decoration",
      "name": "Gilded decoration",
      "level": 56,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 284223,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    }
  ],
  "combat-room:storage": [
    {
      "id": "boxing-glove-rack",
      "name": "Boxing glove rack",
      "level": 34,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "weapons-rack",
      "name": "Weapons rack",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        }
      ],
      "cost": 1804,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "extra-weapons-rack",
      "name": "Extra weapons rack",
      "level": 54,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 5932,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    }
  ],
  "treasure-room:decoration": [
    {
      "id": "round-shield",
      "name": "Round shield",
      "level": 66,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "decorative-blood",
      "name": "Decorative blood",
      "level": 72,
      "materials": [
        {
          "name": "Red dye",
          "qty": 4
        }
      ],
      "cost": 1364,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "square-shield",
      "name": "Square shield",
      "level": 76,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "decorative-pipe",
      "name": "Decorative pipe",
      "level": 83,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "kite-shield",
      "name": "Kite shield",
      "level": 86,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "hanging-skeleton",
      "name": "Hanging skeleton",
      "level": 94,
      "materials": [
        {
          "name": "Skull (item)",
          "qty": 2
        },
        {
          "name": "Bones",
          "qty": 6
        }
      ],
      "cost": 240,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    }
  ],
  "treasure-room:door": [
    {
      "id": "oak-door",
      "name": "Oak door",
      "level": 74,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        }
      ],
      "cost": 5240,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "steel-plated-door",
      "name": "Steel-plated door",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 11050,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "marble-door",
      "name": "Marble door",
      "level": 94,
      "materials": [
        {
          "name": "Marble block",
          "qty": 4
        }
      ],
      "cost": 1354168,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    }
  ],
  "treasure-room:lighting": [
    {
      "id": "candle",
      "name": "Candle",
      "level": 72,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit candle",
          "qty": 4
        }
      ],
      "cost": 3240,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "torches",
      "name": "Torches",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "skull-torches",
      "name": "Skull torches",
      "level": 94,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        },
        {
          "name": "Skull (item)",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    }
  ],
  "treasure-room:monster": [
    {
      "id": "demon",
      "name": "Demon",
      "level": 75,
      "materials": [],
      "cost": 500000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "kalphite-soldier",
      "name": "Kalphite soldier",
      "level": 80,
      "materials": [],
      "cost": 750000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "tok-xil",
      "name": "Tok-Xil",
      "level": 85,
      "materials": [],
      "cost": 5000000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "dagannoth",
      "name": "Dagannoth",
      "level": 90,
      "materials": [],
      "cost": 7500000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "steel-dragon",
      "name": "Steel dragon",
      "level": 95,
      "materials": [],
      "cost": 10000000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "rune-dragon",
      "name": "Rune dragon",
      "level": 99,
      "materials": [],
      "cost": 25000000,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    }
  ],
  "treasure-room:treasure": [
    {
      "id": "wooden-crate",
      "name": "Wooden crate",
      "level": 75,
      "materials": [
        {
          "name": "Plank",
          "qty": 5
        },
        {
          "name": "Nails",
          "qty": 5
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true,
      "costLabel": "735–9,865"
    },
    {
      "id": "oak-chest",
      "name": "Oak chest",
      "level": 79,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 3782,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "teak-chest",
      "name": "Teak chest",
      "level": 83,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 6834,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "mahogany-chest",
      "name": "Mahogany chest",
      "level": 87,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 149486,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    },
    {
      "id": "magic-chest",
      "name": "Magic chest",
      "level": 91,
      "materials": [
        {
          "name": "Magic stone",
          "qty": 1
        }
      ],
      "cost": 997851,
      "source": "https://oldschool.runescape.wiki/w/Treasure_room",
      "verified": true
    }
  ],
  "throne-room:decoration": [
    {
      "id": "gilded-decoration",
      "name": "Gilded decoration",
      "level": 56,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Gold leaf",
          "qty": 2
        }
      ],
      "cost": 284223,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "round-shield",
      "name": "Round shield",
      "level": 66,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 2
        }
      ],
      "cost": 1048,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "square-shield",
      "name": "Square shield",
      "level": 76,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "kite-shield",
      "name": "Kite shield",
      "level": 86,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "throne-room:floor": [
    {
      "id": "floor-decoration",
      "name": "Floor decoration",
      "level": 61,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        }
      ],
      "cost": 10535,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "steel-cage",
      "name": "Steel cage",
      "level": 68,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Steel bar",
          "qty": 20
        }
      ],
      "cost": 22155,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "trapdoor",
      "name": "Trapdoor",
      "level": 74,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Clockwork",
          "qty": 10
        }
      ],
      "cost": 18855,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "lesser-magic-cage",
      "name": "Lesser magic cage",
      "level": 82,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Magic stone",
          "qty": 2
        }
      ],
      "cost": 2006237,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "greater-magic-cage",
      "name": "Greater magic cage",
      "level": 89,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Magic stone",
          "qty": 4
        }
      ],
      "cost": 4001939,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "throne-room:lever": [
    {
      "id": "oak-lever",
      "name": "Oak lever",
      "level": 68,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        }
      ],
      "cost": 2620,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "teak-lever",
      "name": "Teak lever",
      "level": 78,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        }
      ],
      "cost": 4510,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "mahogany-lever",
      "name": "Mahogany lever",
      "level": 88,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        }
      ],
      "cost": 10535,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "throne-room:seating": [
    {
      "id": "carved-teak-bench",
      "name": "Carved teak bench",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 4
        }
      ],
      "cost": 3608,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "mahogany-bench",
      "name": "Mahogany bench",
      "level": 52,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        }
      ],
      "cost": 8428,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "gilded-bench",
      "name": "Gilded bench",
      "level": 61,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 4
        }
      ],
      "cost": 564232,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "throne-room:throne": [
    {
      "id": "oak-throne",
      "name": "Oak throne",
      "level": 60,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 1
        }
      ],
      "cost": 341162,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "teak-throne",
      "name": "Teak throne",
      "level": 67,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 2
        }
      ],
      "cost": 681594,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "mahogany-throne",
      "name": "Mahogany throne",
      "level": 74,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 3
        }
      ],
      "cost": 1026161,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "gilded-throne",
      "name": "Gilded throne",
      "level": 81,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 2
        },
        {
          "name": "Gold leaf",
          "qty": 3
        }
      ],
      "cost": 1104472,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "skeleton-throne",
      "name": "Skeleton throne",
      "level": 88,
      "materials": [
        {
          "name": "Magic stone",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 4
        },
        {
          "name": "Bones",
          "qty": 5
        },
        {
          "name": "Skull (item)",
          "qty": 2
        }
      ],
      "cost": 6343623,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "crystal-throne",
      "name": "Crystal throne",
      "level": 95,
      "materials": [
        {
          "name": "Magic stone",
          "qty": 15
        }
      ],
      "cost": 14967765,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "demonic-throne",
      "name": "Demonic throne",
      "level": 99,
      "materials": [
        {
          "name": "Magic stone",
          "qty": 25
        }
      ],
      "cost": 24946275,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "throne-room:trapdoor": [
    {
      "id": "oak-trapdoor",
      "name": "Oak trapdoor",
      "level": 68,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        }
      ],
      "cost": 2620,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "teak-trapdoor",
      "name": "Teak trapdoor",
      "level": 78,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        }
      ],
      "cost": 4510,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    },
    {
      "id": "mahogany-trapdoor",
      "name": "Mahogany trapdoor",
      "level": 88,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        }
      ],
      "cost": 10535,
      "source": "https://oldschool.runescape.wiki/w/Throne_room",
      "verified": true
    }
  ],
  "quest-hall:bookcase": [
    {
      "id": "wooden-bookcase",
      "name": "Wooden bookcase",
      "level": 4,
      "materials": [
        {
          "name": "Plank",
          "qty": 4
        },
        {
          "name": "Nails",
          "qty": 4
        }
      ],
      "cost": null,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "costLabel": "588–7,892"
    },
    {
      "id": "oak-bookcase",
      "name": "Oak bookcase",
      "level": 29,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 3
        }
      ],
      "cost": 1572,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "mahogany-bookcase",
      "name": "Mahogany bookcase",
      "level": 40,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        }
      ],
      "cost": 6321,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:guild-trophy": [
    {
      "id": "anti-dragon-shield",
      "name": "Anti-dragon shield",
      "level": 47,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Anti-dragon shield",
          "qty": 1
        }
      ],
      "cost": 2818,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "amulet-of-glory",
      "name": "Amulet of glory",
      "level": 47,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Amulet of glory",
          "qty": 1
        }
      ],
      "cost": 14808,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "cape-of-legends",
      "name": "Cape of Legends",
      "level": 47,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Cape of Legends",
          "qty": 1
        }
      ],
      "cost": 3381,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "mythical-cape",
      "name": "Mythical cape",
      "level": 47,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Mythical cape",
          "qty": 1
        }
      ],
      "cost": 12706,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:landscape": [
    {
      "id": "lumbridge",
      "name": "Lumbridge",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Lumbridge painting",
          "qty": 1
        }
      ],
      "cost": 4706,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "the-desert",
      "name": "The Desert",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Desert painting",
          "qty": 1
        }
      ],
      "cost": 4706,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "morytania",
      "name": "Morytania",
      "level": 44,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 3
        },
        {
          "name": "Morytania painting",
          "qty": 1
        }
      ],
      "cost": 4706,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "karamja",
      "name": "Karamja",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Karamja painting",
          "qty": 1
        }
      ],
      "cost": 8321,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "isafdar",
      "name": "Isafdar",
      "level": 65,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Isafdar painting",
          "qty": 1
        }
      ],
      "cost": 8321,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:map": [
    {
      "id": "small-map",
      "name": "Small map",
      "level": 38,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Small map (item)",
          "qty": 1
        }
      ],
      "cost": 2804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "medium-map",
      "name": "Medium map",
      "level": 58,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 3
        },
        {
          "name": "Medium map (item)",
          "qty": 1
        }
      ],
      "cost": 7321,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "large-map",
      "name": "Large map",
      "level": 78,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 4
        },
        {
          "name": "Large map (item)",
          "qty": 1
        }
      ],
      "cost": 9428,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:portrait": [
    {
      "id": "king-arthur",
      "name": "King Arthur",
      "level": 35,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Arthur portrait",
          "qty": 1
        }
      ],
      "cost": 2804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "elena",
      "name": "Elena",
      "level": 35,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Elena portrait",
          "qty": 1
        }
      ],
      "cost": 2804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "giant-dwarf",
      "name": "Giant Dwarf",
      "level": 35,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Keldagrim portrait",
          "qty": 1
        }
      ],
      "cost": 2804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "miscellanians",
      "name": "Miscellanians",
      "level": 55,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 2
        },
        {
          "name": "Misc. portrait",
          "qty": 1
        }
      ],
      "cost": 5214,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:rug": [
    {
      "id": "rug",
      "name": "Rug",
      "level": 13,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        }
      ],
      "cost": 1520,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "deadman-rug",
      "name": "Deadman rug",
      "level": 28,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Armageddon rug",
          "qty": 1
        }
      ],
      "cost": 3772960,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "opulent-rug",
      "name": "Opulent rug",
      "level": 65,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 140471,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "raging-echoes-rug",
      "name": "Raging echoes rug",
      "level": 73,
      "materials": [
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Raging echoes rug",
          "qty": 1
        }
      ],
      "cost": 194140,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "quest-hall:stair": [
    {
      "id": "oak-staircase",
      "name": "Oak staircase",
      "level": 27,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 7564,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "teak-staircase",
      "name": "Teak staircase",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 4
        }
      ],
      "cost": 11344,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "limestone-spiral-staircase",
      "name": "Limestone spiral staircase",
      "level": 67,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Limestone brick",
          "qty": 7
        }
      ],
      "cost": 11393,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-staircase",
      "name": "Marble staircase",
      "level": 82,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        },
        {
          "name": "Marble block",
          "qty": 5
        }
      ],
      "cost": 1703245,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "role": "stairs"
    },
    {
      "id": "marble-spiral",
      "name": "Marble spiral",
      "level": 97,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 10
        },
        {
          "name": "Marble block",
          "qty": 7
        }
      ],
      "cost": 2378814,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true,
      "role": "stairs"
    }
  ],
  "quest-hall:sword": [
    {
      "id": "silverlight",
      "name": "Silverlight",
      "level": 42,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Silverlight",
          "qty": 1
        }
      ],
      "cost": 2304,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "excalibur",
      "name": "Excalibur",
      "level": 42,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Excalibur",
          "qty": 1
        }
      ],
      "cost": 2304,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    },
    {
      "id": "darklight",
      "name": "Darklight",
      "level": 42,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 2
        },
        {
          "name": "Darklight",
          "qty": 1
        }
      ],
      "cost": 2804,
      "source": "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
      "verified": true
    }
  ],
  "oubliette:decoration": [
    {
      "id": "decorative-blood",
      "name": "Decorative blood",
      "level": 72,
      "materials": [
        {
          "name": "Red dye",
          "qty": 4
        }
      ],
      "cost": 1364,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "decorative-pipe",
      "name": "Decorative pipe",
      "level": 83,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 6
        }
      ],
      "cost": 3486,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "hanging-skeleton",
      "name": "Hanging skeleton",
      "level": 94,
      "materials": [
        {
          "name": "Skull (item)",
          "qty": 2
        },
        {
          "name": "Bones",
          "qty": 6
        }
      ],
      "cost": 240,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "oubliette:floor": [
    {
      "id": "spikes",
      "name": "Spikes",
      "level": 65,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 20
        }
      ],
      "cost": 61620,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "tentacle-pool",
      "name": "Tentacle pool",
      "level": 71,
      "materials": [
        {
          "name": "Bucket of water",
          "qty": 20
        }
      ],
      "cost": 100680,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "flame-pit",
      "name": "Flame pit",
      "level": 77,
      "materials": [
        {
          "name": "Tinderbox",
          "qty": 20
        }
      ],
      "cost": 126780,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "rocnar",
      "name": "Rocnar",
      "level": 83,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "oubliette:guard": [
    {
      "id": "skeleton-guard",
      "name": "Skeleton guard",
      "level": 70,
      "materials": [],
      "cost": 50000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "guard-dog",
      "name": "Guard dog",
      "level": 74,
      "materials": [],
      "cost": 75000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "hobgoblin",
      "name": "Hobgoblin",
      "level": 78,
      "materials": [],
      "cost": 100000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "baby-red-dragon",
      "name": "Baby red dragon",
      "level": 82,
      "materials": [],
      "cost": 150000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "huge-spider",
      "name": "Huge spider",
      "level": 86,
      "materials": [],
      "cost": 200000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "troll-guard",
      "name": "Troll guard",
      "level": 90,
      "materials": [],
      "cost": 1000000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "hellhound",
      "name": "Hellhound",
      "level": 94,
      "materials": [],
      "cost": 5000000,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "oubliette:ladder": [
    {
      "id": "oak-ladder",
      "name": "Oak ladder",
      "level": 68,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 5
        }
      ],
      "cost": 2620,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "teak-ladder",
      "name": "Teak ladder",
      "level": 78,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        }
      ],
      "cost": 4510,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "mahogany-ladder",
      "name": "Mahogany ladder",
      "level": 88,
      "materials": [
        {
          "name": "Mahogany plank",
          "qty": 5
        }
      ],
      "cost": 10535,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "oubliette:lighting": [
    {
      "id": "candle",
      "name": "Candle",
      "level": 72,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit candle",
          "qty": 4
        }
      ],
      "cost": 3240,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "torches",
      "name": "Torches",
      "level": 84,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "skull-torches",
      "name": "Skull torches",
      "level": 94,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 4
        },
        {
          "name": "Lit torch",
          "qty": 4
        },
        {
          "name": "Skull (item)",
          "qty": 4
        }
      ],
      "cost": 2224,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "oubliette:prison": [
    {
      "id": "oak-cage",
      "name": "Oak cage",
      "level": 65,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 2
        }
      ],
      "cost": 6402,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "oak-and-steel-cage",
      "name": "Oak and steel cage",
      "level": 70,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Steel bar",
          "qty": 10
        }
      ],
      "cost": 11050,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "steel-cage",
      "name": "Steel cage",
      "level": 75,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 20
        }
      ],
      "cost": 11620,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "spiked-cage",
      "name": "Spiked cage",
      "level": 80,
      "materials": [
        {
          "name": "Steel bar",
          "qty": 25
        }
      ],
      "cost": 14525,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    },
    {
      "id": "bone-cage",
      "name": "Bone cage",
      "level": 85,
      "materials": [
        {
          "name": "Oak plank",
          "qty": 10
        },
        {
          "name": "Bones",
          "qty": 10
        }
      ],
      "cost": 5640,
      "source": "https://oldschool.runescape.wiki/w/Oubliette",
      "verified": true
    }
  ],
  "combat-room:dummy": [
    {
      "id": "combat-dummy",
      "name": "Combat dummy",
      "level": 48,
      "materials": [
        {
          "name": "Teak plank",
          "qty": 5
        },
        {
          "name": "Bolt of cloth",
          "qty": 4
        },
        {
          "name": "Bucket of sand",
          "qty": 5
        }
      ],
      "cost": 6070,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "undead-combat-dummy",
      "name": "Undead combat dummy",
      "level": 53,
      "materials": [
        {
          "name": "Combat dummy",
          "qty": 1
        },
        {
          "name": "Black mask",
          "qty": 1
        },
        {
          "name": "Bucket of slime",
          "qty": 4
        }
      ],
      "cost": 1091806,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    },
    {
      "id": "ornate-undead-combat-dummy",
      "name": "Ornate undead combat dummy",
      "level": 58,
      "materials": [
        {
          "name": "Undead combat dummy",
          "qty": 1
        },
        {
          "name": "Gold leaf",
          "qty": 1
        }
      ],
      "cost": 1230757,
      "source": "https://oldschool.runescape.wiki/w/Combat_room",
      "verified": true
    }
  ]
};
