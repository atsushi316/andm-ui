/* Design System Explorer。値は dist/style.css と computed style。Research は読まない。 */
(function () {
  var catalog = window.ANDM_CATALOG;
  var copy = window.ANDM_SERIES_COPY;
  var preview = document.getElementById("series-preview");
  var viewSeries = document.getElementById("view-series");
  var viewTokens = document.getElementById("view-tokens");
  var select = document.getElementById("series-select");
  var navSeries = document.getElementById("nav-series");
  var tokenCards = document.getElementById("token-cards");
  var tokenStatus = document.getElementById("token-status");
  var planned = document.getElementById("planned-components");
  var decls = [];
  var items = [];
  var cssReady = null;

  var categories = [
    { id: "color", label: "Color" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
    { id: "shape", label: "Shape" },
    { id: "density", label: "Density" },
    { id: "elevation", label: "Elevation" },
    { id: "motion", label: "Motion" },
    { id: "interaction", label: "Interaction" },
  ];

  var usage = {
    "--andm-color-primary": "主な操作",
    "--andm-color-on-primary": "主な操作の上の文字",
    "--andm-color-surface": "面",
    "--andm-color-on-surface": "面上の文字",
    "--andm-color-outline": "境界",
    "--andm-color-secondary-container": "弱い面",
    "--andm-font-family": "本文の書体",
    "--andm-font-size-sm": "小さい文字",
    "--andm-font-size-md": "本文の大きさ",
    "--andm-font-size-lg": "大きい文字",
    "--andm-font-weight-medium": "ボタンの字重",
    "--andm-line-height-tight": "詰めた行間",
    "--andm-btn-tracking": "ボタンの字間",
    "--andm-radius-sm": "小さい角",
    "--andm-radius-md": "中くらいの角",
    "--andm-radius-lg": "大きい角",
    "--andm-radius-pill": "pill の上限",
    "--andm-shadow-1": "低い高さ",
    "--andm-shadow-2": "高い高さ",
    "--andm-motion-duration-short1": "press の duration",
    "--andm-motion-duration-short2": "hover / focus の duration",
    "--andm-motion-duration-short3": "状態変化の duration",
    "--andm-motion-duration-short4": "形状変化の duration",
    "--andm-motion-easing-standard": "standard の曲線",
    "--andm-motion-easing-decelerate": "hover の曲線",
    "--andm-motion-easing-accelerate": "press の曲線",
    "--andm-state-hover-opacity": "hover の状態層",
    "--andm-state-pressed-opacity": "press の状態層",
    "--andm-focus-ring-width": "フォーカスリングの幅",
    "--andm-focus-ring-color": "フォーカスリングの色",
  };

  function resolvedEasing(durationName) {
    var ease = easingName(durationName);
    var fromRoot = catalog.computedValue(":root", ease);
    if (fromRoot) return fromRoot;
    var decl = decls.find(function (item) { return item.name === ease; });
    if (!decl) return "ease";
    return catalog.computedValue(decl.selector, ease) || "ease";
  }

  function easingName(durationName) {
    if (durationName.indexOf("short1") !== -1) return "--andm-motion-easing-accelerate";
    if (durationName.indexOf("short2") !== -1) return "--andm-motion-easing-decelerate";
    if (durationName.indexOf("fast-spatial") !== -1) return "--andm-motion-easing-expressive-fast-spatial";
    if (durationName.indexOf("fast-effects") !== -1) return "--andm-motion-easing-expressive-fast-effects";
    if (durationName.indexOf("short3") !== -1 || durationName.indexOf("short4") !== -1) {
      return "--andm-motion-easing-standard";
    }
    return "--andm-motion-easing-standard";
  }

  function parseRoute() {
    var raw = location.hash.replace(/^#\/?/, "");
    var parts = raw.split("/").filter(Boolean);
    if (parts[0] === "tokens") return { view: "tokens", id: parts[1] || "color" };
    if (parts[0] === "series") return { view: "series", id: parts[1] || "baseline" };
    if (parts.length === 1 && items.some(function (item) { return item.id === parts[0]; })) {
      return { view: "series", id: parts[0] };
    }
    return { view: "series", id: "baseline" };
  }

  function go(hash) {
    if (location.hash !== hash) location.hash = hash;
    else render();
  }

  function read(el, name) {
    return getComputedStyle(el).getPropertyValue(name).trim();
  }

  function fillSelect() {
    select.replaceChildren();
    items.forEach(function (item) {
      var option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.label;
      select.appendChild(option);
    });
    navSeries.replaceChildren();
    items.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#/series/" + item.id;
      a.textContent = item.label;
      a.dataset.seriesNav = item.id;
      li.appendChild(a);
      navSeries.appendChild(li);
    });
  }

  function applySeries(id) {
    var item = items.find(function (entry) { return entry.id === id; }) || items[0];
    if (!item) return;
    catalog.applySeries(preview, item.className);
    select.value = item.id;
    document.querySelectorAll("[data-scene]").forEach(function (el) {
      el.hidden = el.getAttribute("data-scene") !== item.id;
    });
    document.querySelectorAll("[data-series-nav]").forEach(function (a) {
      if (a.dataset.seriesNav === item.id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    var brief = (copy.briefs && copy.briefs[item.id]) || {};
    var meta = (copy.meta && copy.meta[item.id]) || {};
    text("series-trait", brief.trait || "");
    text("series-use", brief.use || "");
    text("series-motion", brief.motion || "");
    text("series-character", meta.character || "");
    text("series-official", meta.official || "");
    text("series-interpretation", meta.interpretation || "");
    text("series-source", (meta.sourceKind || "") + (meta.verification ? " / " + meta.verification : ""));
    text("series-source-note", meta.sourceNote || "");
    text("series-duration-note", meta.duration || "");
    var classHelp = document.getElementById("series-class");
    if (classHelp) {
      classHelp.replaceChildren();
      var btn = document.createElement("code");
      btn.textContent = "andm-btn";
      if (item.className) {
        var code = document.createElement("code");
        code.textContent = item.className;
        classHelp.append("親に ", code, " を付けます。ボタンは ", btn, " のままです。");
      } else {
        classHelp.append("Baseline は追加クラスなし。ボタンは ", btn, " のままです。");
      }
    }
    var patterns = document.getElementById("series-patterns");
    patterns.replaceChildren();
    (meta.patterns || []).forEach(function (pattern) {
      var li = document.createElement("li");
      li.textContent = pattern.trigger + " → " + pattern.effect;
      patterns.appendChild(li);
    });
    paintLanguage();
    paintSeriesMotion();
  }

  function text(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function swatch(name) {
    var value = read(preview, name);
    if (!value) return null;
    var fig = document.createElement("figure");
    fig.className = "g-exp-swatch";
    var chip = document.createElement("div");
    chip.className = "g-exp-chip";
    var paint = catalog.paintValue(value);
    if (paint) chip.style.background = paint;
    var cap = document.createElement("figcaption");
    cap.textContent = name + " " + value;
    fig.append(chip, cap);
    return fig;
  }

  function paintLanguage() {
    var host = document.getElementById("series-visual");
    host.replaceChildren();
    ["--andm-color-primary", "--andm-color-surface", "--andm-color-on-surface", "--andm-color-outline"].forEach(function (name) {
      var node = swatch(name);
      if (node) host.appendChild(node);
    });
    var type = document.createElement("p");
    type.className = "g-exp-type";
    type.textContent = "あいうえお Ag";
    type.style.fontFamily = "var(--andm-font-family)";
    type.style.fontSize = "var(--andm-font-size-md)";
    type.style.fontWeight = "var(--andm-font-weight-medium)";
    type.style.lineHeight = "var(--andm-line-height-tight)";
    host.appendChild(type);
    ["--andm-space-2", "--andm-space-4", "--andm-space-8"].forEach(function (name) {
      var value = read(preview, name);
      if (!value) return;
      var row = document.createElement("div");
      row.className = "g-exp-space";
      var bar = document.createElement("span");
      bar.style.width = value;
      var label = document.createElement("span");
      label.textContent = name + " " + value;
      row.append(bar, label);
      host.appendChild(row);
    });
    ["--andm-radius-sm", "--andm-radius-md", "--andm-radius-lg", "--andm-radius-pill"].forEach(function (name) {
      var value = read(preview, name);
      if (!value) return;
      var box = document.createElement("div");
      box.className = "g-exp-shape";
      box.style.borderRadius = value;
      box.textContent = name.replace("--andm-radius-", "") + " " + value;
      host.appendChild(box);
    });
    ["--andm-shadow-1", "--andm-shadow-2"].forEach(function (name) {
      var value = read(preview, name);
      if (!value) return;
      var box = document.createElement("div");
      box.className = "g-exp-elev";
      box.style.boxShadow = value;
      box.textContent = name + " " + value;
      host.appendChild(box);
    });
  }

  function paintSeriesMotion() {
    var host = document.getElementById("series-motion-tokens");
    host.replaceChildren();
    decls.forEach(function (decl) {
      if (catalog.tokenCategory(decl.name) !== "motion" && decl.name !== "--andm-btn-press-scale") return;
      var value = read(preview, decl.name);
      if (!value) return;
      if (host.querySelector("[data-token='" + decl.name + "']")) return;
      var row = document.createElement("div");
      row.className = "g-exp-motion";
      row.dataset.token = decl.name;
      var label = document.createElement("p");
      label.textContent = decl.name + " " + value;
      row.appendChild(label);
      if (decl.name.indexOf("duration") !== -1) {
        var demo = document.createElement("button");
        demo.type = "button";
        demo.className = "g-motion-demo";
        demo.textContent = "触る";
        demo.style.transition = "background-color " + value + " " + resolvedEasing(decl.name);
        demo.addEventListener("pointerenter", function () {
          demo.classList.add("is-on");
        });
        demo.addEventListener("pointerleave", function () {
          demo.classList.remove("is-on");
        });
        row.appendChild(demo);
      }
      host.appendChild(row);
    });
  }

  function tokenCode(name) {
    var code = document.createElement("code");
    var parts = name.split("-");
    parts.forEach(function (part, index) {
      if (index) {
        code.appendChild(document.createTextNode("-"));
        code.appendChild(document.createElement("wbr"));
      }
      code.appendChild(document.createTextNode(part));
    });
    return code;
  }

  function scopeLabel(selector) {
    if (selector === ":root") return "Default";
    var match = selector.match(/\.andm-series--([A-Za-z0-9-]+)/);
    if (match) return (copy.labels && copy.labels[match[1]]) || match[1];
    return selector;
  }

  function scopeRank(selector) {
    if (selector === ":root") return "0";
    var match = selector.match(/\.andm-series--([A-Za-z0-9-]+)/);
    if (!match) return "2" + selector;
    var index = (copy.order || []).indexOf(match[1]);
    var n = index === -1 ? 99 : index;
    return "1" + (n < 10 ? "0" : "") + n;
  }

  function isPaletteColor(name) {
    return name === "--andm-color-white" || /^--andm-color-(?:[a-z0-9]+-)+\d+$/.test(name);
  }

  function collectTokens(category) {
    var seen = Object.create(null);
    var list = [];
    decls.forEach(function (decl) {
      if (catalog.tokenCategory(decl.name) !== category) return;
      if (decl.selector !== ":root") return;
      if (decl.name.indexOf("--andm-btn-") === 0) return;
      if (category === "color" && isPaletteColor(decl.name)) return;
      if (seen[decl.name]) return;
      seen[decl.name] = true;
      list.push({
        selector: decl.selector,
        name: decl.name,
        authored: decl.value,
        computed: catalog.computedValue(":root", decl.name) || decl.value,
      });
    });
    return list;
  }

  function groupsOf(list) {
    var map = Object.create(null);
    var keys = [];
    list.forEach(function (item) {
      var key = scopeLabel(item.selector);
      if (!map[key]) {
        map[key] = { label: key, rank: scopeRank(item.selector), items: [] };
        keys.push(key);
      }
      if (scopeRank(item.selector) < map[key].rank) map[key].rank = scopeRank(item.selector);
      map[key].items.push(item);
    });
    keys.sort(function (a, b) {
      if (map[a].rank < map[b].rank) return -1;
      if (map[a].rank > map[b].rank) return 1;
      return 0;
    });
    return keys.map(function (key) {
      return map[key];
    });
  }

  function selectorHint(selector) {
    return selector
      .replace(/:root/g, "")
      .replace(/\.andm-series--[A-Za-z0-9-]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  var inkProbe = null;

  function resolvedBackground(paint) {
    if (!inkProbe) {
      inkProbe = document.createElement("div");
      inkProbe.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;pointer-events:none;";
      document.body.appendChild(inkProbe);
    }
    inkProbe.style.backgroundColor = paint;
    return getComputedStyle(inkProbe).backgroundColor;
  }

  function channel(c) {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function hexByte(n) {
    var h = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return h.length === 1 ? "0" + h : h;
  }

  function toneFor(paint) {
    var bg = resolvedBackground(paint);
    var match = String(bg).match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i);
    if (!match) return { ink: "#1a1c1e", label: paint };
    var r = Number(match[1]);
    var g = Number(match[2]);
    var b = Number(match[3]);
    var a = match[4] === undefined ? 1 : Number(match[4]);
    var lum = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    return {
      ink: a < 0.45 || lum > 0.58 ? "#1a1c1e" : "#ffffff",
      label: a < 1 ? bg : "#" + hexByte(r) + hexByte(g) + hexByte(b),
    };
  }

  function colorMeta(name) {
    var body = name.replace(/^--andm-color-/, "");
    var numeric = body.match(/^(.*)-(\d+)$/);
    if (numeric) {
      return { key: numeric[1], label: numeric[2], numeric: true, rank: Number(numeric[2]) };
    }
    var base = body.replace(/^on-/, "").split("-")[0];
    var rank = 200;
    if (body === base) rank = 0;
    else if (body.indexOf("on-") === 0) rank = 400;
    return { key: base || body, label: body, numeric: false, rank: rank };
  }

  var familyOrder = ["blue", "neutral", "primary", "secondary", "surface", "outline", "line", "disabled", "white"];

  function colorFamilies(items) {
    var map = Object.create(null);
    var keys = [];
    items.forEach(function (item) {
      var meta = colorMeta(item.name);
      if (!map[meta.key]) {
        map[meta.key] = { key: meta.key, numeric: meta.numeric, items: [] };
        keys.push(meta.key);
      }
      if (meta.numeric) map[meta.key].numeric = true;
      map[meta.key].items.push(item);
    });
    keys.sort(function (a, b) {
      var ia = familyOrder.indexOf(a);
      var ib = familyOrder.indexOf(b);
      if (ia === -1) ia = 50;
      if (ib === -1) ib = 50;
      if (ia !== ib) return ia - ib;
      return a < b ? -1 : 1;
    });
    return keys.map(function (key) {
      var family = map[key];
      family.items.sort(function (a, b) {
        var ma = colorMeta(a.name);
        var mb = colorMeta(b.name);
        if (ma.rank !== mb.rank) return ma.rank - mb.rank;
        return a.name < b.name ? -1 : 1;
      });
      return family;
    });
  }

  function aliasLine(item) {
    if (!/^var\(--andm-/.test(item.authored)) return "";
    if (item.authored.replace(/\s+/g, "") === item.computed.replace(/\s+/g, "")) return "";
    return item.authored;
  }

  function colorSwatch(item) {
    var meta = colorMeta(item.name);
    var fig = document.createElement("figure");
    fig.className = "g-swatch";
    var paint = catalog.paintValue(item.computed) || catalog.paintValue(item.authored);
    var chip = document.createElement("div");
    chip.className = "g-swatch__chip";
    if (paint) {
      var tone = toneFor(paint);
      chip.style.background = paint;
      chip.style.color = tone.ink;
      var step = document.createElement("span");
      step.className = "g-swatch__step";
      step.textContent = meta.label;
      var hex = document.createElement("span");
      hex.className = "g-swatch__hex";
      hex.textContent = tone.label;
      chip.append(step, hex);
    } else {
      chip.classList.add("g-swatch__chip--plain");
      chip.textContent = item.computed;
    }
    var cap = document.createElement("figcaption");
    cap.appendChild(tokenCode(item.name));
    if (usage[item.name]) {
      var use = document.createElement("span");
      use.className = "g-swatch__use";
      use.textContent = usage[item.name];
      cap.appendChild(use);
    }
    var alias = aliasLine(item);
    if (alias) {
      var note = document.createElement("span");
      note.className = "g-swatch__alias";
      note.textContent = alias;
      cap.appendChild(note);
    }
    fig.append(chip, cap);
    return fig;
  }

  function renderColors(items) {
    var wrap = document.createElement("div");
    colorFamilies(items).forEach(function (family) {
      var block = document.createElement("div");
      block.className = "g-ramp";
      var heading = document.createElement("h4");
      heading.textContent = family.key;
      var row = document.createElement("div");
      row.className = family.numeric ? "g-ramp__strip" : "g-ramp__grid";
      family.items.forEach(function (item) {
        row.appendChild(colorSwatch(item));
      });
      block.append(heading, row);
      wrap.appendChild(block);
    });
    return wrap;
  }

  function lengthPx(value) {
    var text = String(value || "").trim();
    if (text === "0") return 0;
    var match = text.match(/^(-?[\d.]+)px$/);
    return match ? Number(match[1]) : null;
  }

  function motionDemo(item) {
    var demo = document.createElement("button");
    demo.type = "button";
    demo.className = "g-motion-demo";
    demo.textContent = "触る";
    var duration = item.name.indexOf("duration") !== -1 ? item.computed : "100ms";
    var easing = item.name.indexOf("easing") !== -1 ? item.computed : resolvedEasing(item.name);
    demo.style.transition = "background-color " + duration + " " + easing;
    demo.addEventListener("pointerenter", function () { demo.classList.add("is-on"); });
    demo.addEventListener("pointerleave", function () { demo.classList.remove("is-on"); });
    return demo;
  }

  function renderScale(category, items) {
    var list = document.createElement("div");
    list.className = "g-token-lines";
    var sorted = items.slice();
    if (category === "spacing") {
      sorted.sort(function (a, b) {
        var na = lengthPx(a.computed);
        var nb = lengthPx(b.computed);
        if (na !== null && nb !== null && na !== nb) return na - nb;
        return a.name < b.name ? -1 : 1;
      });
    }
    sorted.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "g-token-line" + (category === "typography" ? " g-token-line--type" : "");
      var name = tokenCode(item.name);
      var preview = document.createElement("div");
      preview.className = "g-token-line__preview";
      var meta = document.createElement("div");
      meta.className = "g-token-line__meta";
      var value = document.createElement("strong");
      value.textContent = item.computed;
      meta.appendChild(value);
      if (category === "motion" && item.name.indexOf("duration") !== -1) {
        var ease = document.createElement("span");
        ease.textContent = easingName(item.name).replace("--andm-motion-easing-", "");
        meta.appendChild(ease);
      }
      if (usage[item.name]) {
        var use = document.createElement("span");
        use.textContent = usage[item.name];
        meta.appendChild(use);
      }
      var alias = aliasLine(item);
      if (alias) {
        var note = document.createElement("span");
        note.className = "g-swatch__alias";
        note.textContent = alias;
        meta.appendChild(note);
      }

      if (category === "typography") {
        var sample = document.createElement("p");
        sample.className = "g-token-line__sample";
        sample.textContent = item.name.indexOf("line-height") !== -1 ? "あいうえお Ag\nあいうえお Ag" : "あいうえお Ag";
        if (item.name.indexOf("font-family") !== -1) {
          sample.style.fontFamily = item.computed;
          sample.style.fontSize = "1.25rem";
        }
        if (item.name.indexOf("font-size") !== -1) sample.style.fontSize = item.computed;
        if (item.name.indexOf("font-weight") !== -1) {
          sample.style.fontWeight = item.computed;
          sample.style.fontSize = "1.25rem";
        }
        if (item.name.indexOf("line-height") !== -1) {
          sample.style.lineHeight = item.computed;
          sample.style.whiteSpace = "pre-line";
        }
        if (item.name.indexOf("tracking") !== -1) {
          sample.style.letterSpacing = item.computed;
          sample.style.fontSize = "1.25rem";
        }
        preview.appendChild(sample);
        var spec = document.createElement("div");
        spec.className = "g-token-line__spec";
        spec.append(name, meta);
        row.append(preview, spec);
      } else if (category === "spacing") {
        var bar = document.createElement("span");
        bar.className = "g-meter__bar";
        var px = lengthPx(item.computed);
        bar.style.width = px === null ? item.computed : px + "px";
        preview.appendChild(bar);
        row.append(name, preview, meta);
      } else if (category === "motion") {
        preview.appendChild(motionDemo(item));
        row.append(name, preview, meta);
      } else if (category === "interaction") {
        var paint = catalog.paintValue(item.computed);
        if (paint) {
          var tone = toneFor(paint);
          var chip = document.createElement("span");
          chip.className = "g-inline-swatch";
          chip.style.background = paint;
          chip.style.color = tone.ink;
          chip.textContent = tone.label;
          preview.appendChild(chip);
        } else if (item.name.indexOf("opacity") !== -1) {
          var tint = document.createElement("span");
          tint.className = "g-meter__bar";
          tint.style.width = (Number(item.computed) * 100 || 0) + "%";
          tint.style.opacity = item.computed;
          preview.appendChild(tint);
        } else {
          var mark = document.createElement("span");
          mark.className = "g-meter__bar";
          var len = lengthPx(item.computed);
          mark.style.width = len === null ? "1rem" : Math.max(len, 1) + "px";
          preview.appendChild(mark);
        }
        row.append(name, preview, meta);
      } else {
        row.append(name, preview, meta);
      }
      list.appendChild(row);
    });
    return list;
  }

  function renderBoxes(category, items) {
    var row = document.createElement("div");
    row.className = "g-box-row";
    var order = ["--andm-radius-sm", "--andm-radius-md", "--andm-radius-lg", "--andm-radius-pill", "--andm-shadow-1", "--andm-shadow-2"];
    var sorted = items.slice().sort(function (a, b) {
      var ia = order.indexOf(a.name);
      var ib = order.indexOf(b.name);
      if (ia === -1) ia = 20;
      if (ib === -1) ib = 20;
      if (ia !== ib) return ia - ib;
      if (a.name !== b.name) return a.name < b.name ? -1 : 1;
      return selectorHint(a.selector) < selectorHint(b.selector) ? -1 : 1;
    });
    sorted.forEach(function (item) {
      var fig = document.createElement("figure");
      fig.className = "g-box";
      var face = document.createElement("div");
      face.className = category === "elevation" ? "g-box__face g-box__face--elev" : "g-box__face";
      if (category === "shape") face.style.borderRadius = item.computed;
      if (category === "elevation") face.style.boxShadow = item.computed;
      var short = item.name.replace(/^--andm-(radius|shadow)-/, "");
      face.textContent = short;
      var cap = document.createElement("figcaption");
      cap.appendChild(tokenCode(item.name));
      var hintText = selectorHint(item.selector);
      if (hintText) {
        var hint = document.createElement("span");
        hint.className = "g-swatch__alias";
        hint.textContent = hintText;
        cap.appendChild(hint);
      }
      var value = document.createElement("span");
      value.className = "g-swatch__use";
      value.textContent = item.computed;
      cap.appendChild(value);
      if (usage[item.name]) {
        var use = document.createElement("span");
        use.className = "g-swatch__use";
        use.textContent = usage[item.name];
        cap.appendChild(use);
      }
      fig.append(face, cap);
      row.appendChild(fig);
    });
    return row;
  }

  function renderScope(category, group) {
    var section = document.createElement("section");
    section.className = "g-token-scope";
    if (category === "color") section.appendChild(renderColors(group.items));
    else if (category === "shape" || category === "elevation") section.appendChild(renderBoxes(category, group.items));
    else section.appendChild(renderScale(category, group.items));
    return section;
  }

  function showTokens(category) {
    tokenCards.replaceChildren();
    var cat = categories.find(function (item) { return item.id === category; });
    var title = document.getElementById("token-title");
    if (title) title.textContent = cat ? cat.label : "Tokens";
    document.querySelectorAll("[data-token-nav]").forEach(function (a) {
      if (a.dataset.tokenNav === category) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (category === "density") {
      tokenStatus.textContent = "Density の Global Token はありません。Design Space の軸だけです。Core には昇格させていません。";
      return;
    }
    var list = collectTokens(category);
    groupsOf(list).forEach(function (group) {
      tokenCards.appendChild(renderScope(category, group));
    });
    tokenStatus.textContent = list.length + " 件のセマンティックトークン。値は :root。Series の差し替えは Series のページで見ます。";
  }

  function render() {
    var route = parseRoute();
    var onTokens = route.view === "tokens";
    viewSeries.hidden = onTokens;
    viewTokens.hidden = !onTokens;
    if (planned) planned.hidden = onTokens;
    document.body.dataset.view = route.view;
    if (onTokens) {
      showTokens(route.id);
      return;
    }
    applySeries(route.id);
  }

  select.addEventListener("change", function () {
    go("#/series/" + select.value);
  });

  window.addEventListener("hashchange", render);

  cssReady = catalog.loadCss("../dist/style.css").then(function (css) {
    decls = catalog.parseDeclarations(css);
    items = catalog.seriesItems(css);
    fillSelect();
    render();
  }).catch(function () {
    tokenStatus.textContent = "dist/style.css を読めません。build したあと、再読み込みしてください。";
  });
})();
