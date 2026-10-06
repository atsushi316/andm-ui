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

  var partViews = {
    controls: true,
    marks: true,
    containers: true,
    feedback: true,
    overlays: true,
    navigation: true,
  };

  var partDefaults = {
    controls: "button",
    marks: "divider",
    containers: "card",
    feedback: "alert",
    overlays: "dialog",
    navigation: "tabs",
  };

  var legacyParts = {
    button: "button",
    "text-field": "text-field",
    checkbox: "checkbox",
    radio: "radio",
    switch: "switch",
    select: "select",
    slider: "slider",
    chip: "chip",
    fab: "fab",
    divider: "divider",
    badge: "badge",
    card: "card",
    alert: "alert",
    toast: "toast",
    dialog: "dialog",
    tooltip: "tooltip",
    drawer: "drawer",
    popover: "popover",
    tabs: "tabs",
    breadcrumb: "breadcrumb",
    pagination: "pagination",
    menu: "menu",
  };

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
    if (partViews[parts[0]]) {
      return {
        view: parts[0],
        id: parts[1] || partDefaults[parts[0]] || "",
      };
    }
    if (parts.length === 1 && legacyParts[parts[0]]) {
      return { view: "part", id: legacyParts[parts[0]] };
    }
    if (parts.length === 1 && items.some(function (item) { return item.id === parts[0]; })) {
      return { view: "series", id: parts[0] };
    }
    return { view: "series", id: "baseline" };
  }

  function seriesIdFor(route) {
    if (route.view === "series") return route.id;
    if (select && select.value) return select.value;
    return "baseline";
  }

  function showPart(route) {
    var onSeries = route.view === "series";
    var part = onSeries ? "series" : route.id;
    var shown = null;
    document.querySelectorAll("[data-part]").forEach(function (el) {
      var match = el.getAttribute("data-part") === part;
      el.hidden = !match;
      if (match && !shown) shown = el;
    });
    document.querySelectorAll("[data-part-nav]").forEach(function (a) {
      if (!onSeries && route.view !== "tokens" && a.dataset.partNav === part) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
    // Hash は #/overlays/drawer 形式で要素 id と一致しない。部品を表示したら先頭へスクロールする。
    if (shown && !onSeries) {
      shown.scrollIntoView({ block: "start", behavior: "auto" });
    }
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
      if (item.className) {
        var code = document.createElement("code");
        code.textContent = item.className;
        classHelp.append("親に ", code, " を付けます。部品のクラスはどのシリーズでも同じです。");
      } else {
        classHelp.append("Baseline は追加クラスなし。部品のクラスはどのシリーズでも同じです。");
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

  function previewFor(category, name, value) {
    var node = document.createElement("div");
    node.className = "g-exp-preview";
    if (category === "color") {
      var paint = catalog.paintValue(value);
      if (paint) node.style.background = paint;
      node.textContent = paint ? "" : value;
    } else if (category === "typography") {
      node.textContent = "あいうえお Ag";
      if (name.indexOf("font-family") !== -1) node.style.fontFamily = value;
      if (name.indexOf("font-size") !== -1) node.style.fontSize = value;
      if (name.indexOf("font-weight") !== -1) node.style.fontWeight = value;
      if (name.indexOf("line-height") !== -1) node.style.lineHeight = value;
      if (name.indexOf("tracking") !== -1) node.style.letterSpacing = value;
    } else if (category === "spacing") {
      var bar = document.createElement("span");
      bar.className = "g-exp-bar";
      bar.style.width = value;
      node.appendChild(bar);
    } else if (category === "shape") {
      node.className = "g-exp-shape";
      node.style.borderRadius = value;
    } else if (category === "elevation") {
      node.className = "g-exp-elev";
      node.style.boxShadow = value;
    } else if (category === "motion" && name.indexOf("duration") !== -1) {
      var demo = document.createElement("button");
      demo.type = "button";
      demo.className = "g-motion-demo";
      demo.textContent = "触る";
      demo.style.transition = "background-color " + value + " " + resolvedEasing(name);
      demo.addEventListener("pointerenter", function () { demo.classList.add("is-on"); });
      demo.addEventListener("pointerleave", function () { demo.classList.remove("is-on"); });
      return demo;
    } else if (category === "interaction") {
      node.textContent = value;
    }
    return node;
  }

  function showTokens(category) {
    tokenCards.replaceChildren();
    document.querySelectorAll("[data-token-nav]").forEach(function (a) {
      if (a.dataset.tokenNav === category) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (category === "density") {
      tokenStatus.textContent = "Density の Global Token はありません。Design Space の軸だけです。Core には昇格させていません。";
      return;
    }
    var seen = Object.create(null);
    var count = 0;
    decls.forEach(function (decl) {
      if (catalog.tokenCategory(decl.name) !== category) return;
      var key = decl.selector + " " + decl.name;
      if (seen[key]) return;
      seen[key] = true;
      var computed = catalog.computedValue(decl.selector, decl.name) || decl.value;
      count += 1;
      var card = document.createElement("article");
      card.className = "g-token-card";
      var title = document.createElement("h3");
      title.textContent = decl.name;
      var value = document.createElement("p");
      value.className = "g-token-card__value";
      value.textContent = computed;
      var where = document.createElement("p");
      where.className = "g-token-card__where";
      where.textContent = decl.selector;
      var defined = document.createElement("p");
      defined.className = "g-token-card__where";
      defined.textContent = decl.value;
      card.append(title, value, previewFor(category, decl.name, computed), where, defined);
      if (usage[decl.name]) {
        var use = document.createElement("p");
        use.textContent = usage[decl.name];
        card.appendChild(use);
      }
      tokenCards.appendChild(card);
    });
    tokenStatus.textContent = count + " 件。dist/style.css と computed style。";
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
      document.querySelectorAll("[data-part-nav]").forEach(function (a) {
        a.removeAttribute("aria-current");
      });
      return;
    }
    applySeries(seriesIdFor(route));
    showPart(route);
  }

  function initParts() {
    document.querySelectorAll("[data-tabs]").forEach(function (root) {
      var tabs = root.querySelectorAll('[role="tab"]');
      var panels = root.querySelectorAll('[role="tabpanel"]');
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var id = tab.getAttribute("aria-controls");
          tabs.forEach(function (item) {
            var on = item === tab;
            item.setAttribute("aria-selected", on ? "true" : "false");
            item.tabIndex = on ? 0 : -1;
          });
          panels.forEach(function (panel) {
            panel.hidden = panel.id !== id;
          });
        });
      });
    });

    document.querySelectorAll("[data-dialog-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        var dialog = document.getElementById(button.getAttribute("data-dialog-open"));
        if (dialog && dialog.showModal) dialog.showModal();
      });
    });

    document.querySelectorAll("[data-dialog-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        var dialog = button.closest("dialog");
        if (dialog && dialog.close) dialog.close();
      });
    });

    document.querySelectorAll("dialog.andm-dialog").forEach(function (dialog) {
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
      });
    });

    document.querySelectorAll(".andm-slider__input").forEach(function (input) {
      function syncSlider() {
        var min = Number(input.min || 0);
        var max = Number(input.max || 100);
        var value = Number(input.value);
        var span = max === min ? 0 : ((value - min) / (max - min)) * 100;
        input.style.setProperty("--andm-slider-fill", span + "%");
        var output = input.parentElement && input.parentElement.querySelector(".andm-slider__value");
        if (output) output.textContent = input.value;
      }
      input.addEventListener("input", syncSlider);
      syncSlider();
    });

    document.querySelectorAll("[data-toast-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        var toast = document.getElementById(button.getAttribute("data-toast-open"));
        if (!toast) return;
        if (!toast.hidden && !toast.classList.contains("is-dismissed")) return;
        toast.hidden = false;
        toast.classList.add("is-dismissed");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            toast.classList.remove("is-dismissed");
          });
        });
      });
    });

    document.querySelectorAll("[data-toast-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        var toast = button.closest(".andm-toast");
        if (!toast) return;
        toast.classList.add("is-dismissed");
        function hide(event) {
          if (event.propertyName !== "opacity") return;
          toast.hidden = true;
          toast.removeEventListener("transitionend", hide);
        }
        toast.addEventListener("transitionend", hide);
      });
    });

    document.querySelectorAll("[data-pagination]").forEach(function (nav) {
      var pages = nav.querySelectorAll(".andm-pagination__page");
      var prev = nav.querySelector("[data-page-prev]");
      var next = nav.querySelector("[data-page-next]");
      function selectPage(page) {
        var index = Array.prototype.indexOf.call(pages, page);
        pages.forEach(function (button) {
          if (button === page) button.setAttribute("aria-current", "page");
          else button.removeAttribute("aria-current");
        });
        if (prev) prev.disabled = index <= 0;
        if (next) next.disabled = index >= pages.length - 1;
      }
      pages.forEach(function (button) {
        button.addEventListener("click", function () {
          selectPage(button);
        });
      });
      if (prev) {
        prev.addEventListener("click", function () {
          var current = nav.querySelector('[aria-current="page"]');
          var index = Array.prototype.indexOf.call(pages, current);
          if (index > 0) selectPage(pages[index - 1]);
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          var current = nav.querySelector('[aria-current="page"]');
          var index = Array.prototype.indexOf.call(pages, current);
          if (index >= 0 && index < pages.length - 1) selectPage(pages[index + 1]);
        });
      }
    });

    function setExpanded(root, selector, open) {
      var trigger = root.querySelector(selector);
      if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function openPanel(root, panel, selector) {
      if (!panel) return;
      if (!panel.hidden && !panel.classList.contains("is-closed")) {
        setExpanded(root, selector, true);
        return;
      }
      panel.hidden = false;
      panel.classList.add("is-closed");
      setExpanded(root, selector, true);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (panel.hidden) return;
          panel.classList.remove("is-closed");
        });
      });
    }

    function closePanel(root, panel, selector) {
      if (!panel) return;
      if (panel.hidden || panel.classList.contains("is-closed")) {
        panel.hidden = true;
        setExpanded(root, selector, false);
        return;
      }
      panel.classList.add("is-closed");
      setExpanded(root, selector, false);
      function hide(event) {
        if (event.propertyName !== "opacity") return;
        panel.removeEventListener("transitionend", hide);
        if (!panel.classList.contains("is-closed")) return;
        panel.hidden = true;
      }
      panel.addEventListener("transitionend", hide);
    }

    document.querySelectorAll("[data-menu]").forEach(function (menu) {
      var panel = menu.querySelector(".andm-menu__panel");
      var trigger = menu.querySelector("[data-menu-open]");
      if (trigger) {
        trigger.addEventListener("click", function () {
          if (panel && !panel.hidden && !panel.classList.contains("is-closed")) {
            closePanel(menu, panel, "[data-menu-open]");
          } else {
            openPanel(menu, panel, "[data-menu-open]");
          }
        });
      }
      menu.querySelectorAll(".andm-menu__item").forEach(function (item) {
        item.addEventListener("click", function () {
          if (item.disabled) return;
          menu.querySelectorAll(".andm-menu__item").forEach(function (other) {
            if (other === item) other.setAttribute("aria-current", "page");
            else other.removeAttribute("aria-current");
          });
          closePanel(menu, panel, "[data-menu-open]");
        });
      });
    });

    document.querySelectorAll("[data-popover]").forEach(function (popover) {
      var panel = popover.querySelector(".andm-popover__panel");
      var trigger = popover.querySelector("[data-popover-open]");
      if (trigger) {
        trigger.addEventListener("click", function () {
          if (panel && !panel.hidden && !panel.classList.contains("is-closed")) {
            closePanel(popover, panel, "[data-popover-open]");
          } else {
            openPanel(popover, panel, "[data-popover-open]");
          }
        });
      }
      popover.querySelectorAll("[data-popover-close]").forEach(function (button) {
        button.addEventListener("click", function () {
          closePanel(popover, panel, "[data-popover-open]");
        });
      });
    });

    document.addEventListener("click", function (event) {
      document.querySelectorAll("[data-menu]").forEach(function (menu) {
        if (menu.contains(event.target)) return;
        closePanel(menu, menu.querySelector(".andm-menu__panel"), "[data-menu-open]");
      });
      document.querySelectorAll("[data-popover]").forEach(function (popover) {
        if (popover.contains(event.target)) return;
        closePanel(popover, popover.querySelector(".andm-popover__panel"), "[data-popover-open]");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      document.querySelectorAll("[data-menu]").forEach(function (menu) {
        closePanel(menu, menu.querySelector(".andm-menu__panel"), "[data-menu-open]");
      });
      document.querySelectorAll("[data-popover]").forEach(function (popover) {
        closePanel(popover, popover.querySelector(".andm-popover__panel"), "[data-popover-open]");
      });
    });

    function closeDrawer(drawer) {
      if (!drawer || !drawer.open || drawer.classList.contains("is-closing")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        drawer.close();
        return;
      }
      drawer.classList.add("is-closing");
      var finished = false;
      function finish() {
        if (finished) return;
        finished = true;
        drawer.classList.remove("is-closing");
        drawer.removeEventListener("transitionend", onEnd);
        if (drawer.open) drawer.close();
      }
      function onEnd(event) {
        if (event.target !== drawer || event.propertyName !== "transform") return;
        finish();
      }
      drawer.addEventListener("transitionend", onEnd);
      window.setTimeout(finish, 400);
    }

    document.querySelectorAll("[data-drawer-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        var drawer = document.getElementById(button.getAttribute("data-drawer-open"));
        if (!drawer || !drawer.showModal) return;
        drawer.classList.remove("is-closing");
        if (!drawer.open) drawer.showModal();
      });
    });

    document.querySelectorAll("[data-drawer-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeDrawer(button.closest("dialog"));
      });
    });

    document.querySelectorAll("dialog.andm-drawer").forEach(function (drawer) {
      drawer.addEventListener("click", function (event) {
        if (event.target === drawer) closeDrawer(drawer);
      });
      drawer.addEventListener("cancel", function (event) {
        event.preventDefault();
        closeDrawer(drawer);
      });
    });
  }

  select.addEventListener("change", function () {
    var route = parseRoute();
    if (route.view !== "series" && route.view !== "tokens") {
      applySeries(select.value);
      return;
    }
    go("#/series/" + select.value);
  });

  initParts();
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
