import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  
  {
    "description": "⌨️ Macintosh Mods",
    "manipulators": [
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "left_option",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_command"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "left_command",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_option"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "right_option",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_command"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "right_command",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_option"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "non_us_backslash",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "grave_accent_and_tilde"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 1241
              },
              {
                "vendor_id": 2131
              },
              {
                "vendor_id": 9494
              }
            ]
          }
        ],
        "from": {
          "key_code": "grave_accent_and_tilde",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "non_us_backslash"
          }
        ],
        "type": "basic"
      }
    ]
  },
  {
    "description": "⌨️ Realforce",
    "manipulators": [
      {
        "conditions": [
          {
            "type": "device_if",
            "identifiers": [
              {
                "vendor_id": 2131
              }
            ]
          }
        ],
        "from": {
          "key_code": "application"
        },
        "to": [
          {
            "key_code": "fn"
          }
        ],
        "type": "basic"
      }
    ]
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      p: open("https://pdm.konenet.com"),
      y: open("https://youtube.com"),
      f: open("https://facebook.com"),
      r: open("https://reddit.com"),
      i: open("https://il.fi"),
      h: open("https://hs.fi"),
      s: open("https://www.porssisahkoa.fi"),
    },
    // o = "Open" applications
    o: {
      c: app("Microsoft Teams"),
      b: app("Safari"),
      n: app("Notes"),
      m: app("Microsoft Outlook"),
      t: app("Warp"),
      g: app("Telegram"),
      v: app("Visual Studio Code"),
      f: app("Finder"),
      i: app("Messages"),
      s: app("Spotify"),
      d: app("Things3"),
      p: app("Preview"),
      e: app("Microsoft Excel"),
      w: app("Microsoft Word"),
      r: app("Microsoft PowerPoint"),
    },

    // w = "Window" via Rectangle
    w: {
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      c: rectangle("center"),
      "delete_or_backspace": rectangle("restore"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: cycle windows",
        to: [
          {
            key_code: "equal_sign",
            modifiers: ["right_command", "right_shift"],
          },
        ],
      },
      m: {
        description: "Mission control",
        to: [
          {
            key_code: "up_arrow",
            modifiers: ["right_control"],
          },
        ],
      },
      e: {
        description: "Expose",
        to: [
          {
            key_code: "down_arrow",
            modifiers: ["right_control"],
          },
        ],
      },
      d: {
        description: "Show Desktop",
        to: [
          {
            key_code: "f11",
            modifiers: ["fn"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    // so that hjkl work like they do in vim 
    h: {
      to: [{ key_code: "left_arrow" }],
    },
    j: {
      to: [{ key_code: "down_arrow" }],
    },
    k: {
      to: [{ key_code: "up_arrow" }],
    },
    l: {
      to: [{ key_code: "right_arrow" }],
    },
    g: {
      to: [
        {
        key_code: "up_arrow",
        modifiers: ["right_command"],
        },
      ],
    },
    "left_shift": {
      g: {
        to: [
          {
          key_code: "down_arrow",
          modifiers: ["right_command"],
          },
        ],
      }
    },
  
    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      f: open(
        "raycast://extensions/raycast/file-search/search-files"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
