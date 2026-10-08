/* dist/style.css から --andm-* とシリーズを読む。値の写しは持たない。 */
(function (root) {
  function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  function selectorAt(css, index) {
    var depth = 0;
    for (var i = index; i >= 0; i--) {
      var ch = css.charAt(i);
      if (ch === "}") depth += 1;
      else if (ch === "{") {
        if (depth === 0) {
          var j = i - 1;
          while (j >= 0 && css.charAt(j) !== "}" && css.charAt(j) !== "{") j -= 1;
          return css
            .slice(j + 1, i)
            .replace(/\s+/g, " ")
            .trim();
        }
        depth -= 1;
      }
    }
    return "";
  }

  function parseDeclarations(css) {
    var clean = stripComments(css);
    var decls = [];
    var re = /(--andm-[A-Za-z0-9-]+)\s*:/g;
    var match;
    while ((match = re.exec(clean))) {
      var name = match[1];
      var start = match.index + match[0].length;
      var value = "";
      var depth = 0;
      for (var i = start; i < clean.length; i++) {
        var ch = clean.charAt(i);
        if (ch === "(") depth += 1;
        else if (ch === ")" && depth > 0) depth -= 1;
        else if ((ch === ";" || ch === "}" || ch === "{") && depth === 0) break;
        value += ch;
      }
      decls.push({
        selector: selectorAt(clean, match.index),
        name: name,
        value: value.replace(/\s+/g, " ").trim(),
      });
    }
    return decls;
  }

  function seriesIds(css) {
    var clean = stripComments(css);
    var seen = Object.create(null);
    var ids = [];
    var re = /\.andm-series--([A-Za-z0-9-]+)/g;
    var match;
    while ((match = re.exec(clean))) {
      if (!seen[match[1]]) {
        seen[match[1]] = true;
        ids.push(match[1]);
      }
    }
    return ids;
  }

  function seriesItems(css) {
    var copy = root.ANDM_SERIES_COPY || { order: [], labels: {} };
    var found = seriesIds(css);
    var foundSet = Object.create(null);
    found.forEach(function (id) {
      foundSet[id] = true;
    });
    var ids = [];
    (copy.order || []).forEach(function (id) {
      if (id === "baseline" || foundSet[id]) ids.push(id);
    });
    if (ids.indexOf("baseline") === -1) ids.unshift("baseline");
    found.forEach(function (id) {
      if (ids.indexOf(id) === -1) ids.push(id);
    });
    return ids.map(function (id) {
      return {
        id: id,
        label: (copy.labels && copy.labels[id]) || id,
        className: id === "baseline" ? "" : "andm-series--" + id,
      };
    });
  }

  function renderSwitch(list, items, onChange) {
    list.replaceChildren();
    items.forEach(function (item) {
      var label = document.createElement("label");
      label.className = "g-switch__opt";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "series";
      input.value = item.id;
      var span = document.createElement("span");
      span.textContent = item.label;
      label.append(input, span);
      input.addEventListener("change", function () {
        if (input.checked) onChange(item);
      });
      list.appendChild(label);
    });
  }

  function selectSeries(list, id) {
    var picked = null;
    list.querySelectorAll('input[name="series"]').forEach(function (input) {
      var on = input.value === id;
      input.checked = on;
      if (on) picked = input;
    });
    return picked;
  }

  function applySeries(el, className) {
    Array.from(el.classList).forEach(function (name) {
      if (name.indexOf("andm-series--") === 0) el.classList.remove(name);
    });
    if (className) el.classList.add(className);
  }

  function canCompute(selector) {
    if (selector === ":root") return true;
    if (selector.indexOf(":") !== -1) return false;
    if (/[>+~,]/.test(selector)) return false;
    var parts = selector.split(/\s+/).filter(Boolean);
    if (!parts.length) return false;
    return parts.every(function (part) {
      return /^\.[A-Za-z_][A-Za-z0-9_-]*$/.test(part);
    });
  }

  function probeRoot() {
    var host = document.getElementById("andm-probes");
    if (!host) {
      host = document.createElement("div");
      host.id = "andm-probes";
      host.className = "g-probes";
      document.body.appendChild(host);
    }
    return host;
  }

  var probes = new Map();

  function probeFor(selector) {
    if (selector === ":root") return document.documentElement;
    if (probes.has(selector)) return probes.get(selector);
    var parent = probeRoot();
    var node = parent;
    selector.split(/\s+/).forEach(function (part) {
      var el = document.createElement("div");
      el.className = part.slice(1);
      parent.appendChild(el);
      parent = el;
      node = el;
    });
    probes.set(selector, node);
    return node;
  }

  function computedValue(selector, name) {
    if (!canCompute(selector)) return "";
    return getComputedStyle(probeFor(selector)).getPropertyValue(name).trim();
  }

  function computedOn(el, name) {
    return getComputedStyle(el).getPropertyValue(name).trim();
  }

  function isSingleColor(value) {
    var v = String(value || "").trim().toLowerCase();
    if (!v) return false;
    if (v === "transparent" || v === "currentcolor") return true;
    if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(v)) return true;
    return /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\(/.test(v);
  }

  function isColorToken(name, value) {
    return name.indexOf("color") !== -1 || isSingleColor(value);
  }

  function isTypeToken(name) {
    return /font|line-height|tracking|--andm-type-/.test(name);
  }

  function tokenCategory(name) {
    if (/layout|target-min|layer-/.test(name)) return "layout";
    if (/motion/.test(name)) return "motion";
    if (/state-|overlay|focus-ring/.test(name)) return "interaction";
    if (/color/.test(name)) return "color";
    if (/font|line-height|tracking|--andm-type-/.test(name)) return "typography";
    if (/space/.test(name)) return "spacing";
    if (/radius|shape/.test(name)) return "shape";
    if (/shadow/.test(name)) return "elevation";
    return "component";
  }

  function paintValue(value) {
    var v = String(value || "").trim();
    if (isSingleColor(v)) return v;
    if (/^\d{1,3}\s+\d{1,3}\s+\d{1,3}$/.test(v)) return "rgb(" + v + ")";
    return "";
  }

  async function loadCss(url) {
    var res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(String(res.status));
    return res.text();
  }

  root.ANDM_CATALOG = {
    parseDeclarations: parseDeclarations,
    seriesIds: seriesIds,
    seriesItems: seriesItems,
    renderSwitch: renderSwitch,
    selectSeries: selectSeries,
    applySeries: applySeries,
    canCompute: canCompute,
    computedValue: computedValue,
    computedOn: computedOn,
    isColorToken: isColorToken,
    isTypeToken: isTypeToken,
    tokenCategory: tokenCategory,
    isSingleColor: isSingleColor,
    paintValue: paintValue,
    loadCss: loadCss,
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
