/* research/library の Markdown を表示する。値は Token にしない。 */
(function (root) {
  var shelves = {
    "README.md": "",
    "academic.md": "academic",
    "standards.md": "standards",
    "design-systems.md": "design-systems",
    "books.md": "books",
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function linkHref(href, shelfId) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return { href: href, external: true };
    var hash = "";
    var path = href;
    var cut = href.indexOf("#");
    if (cut !== -1) {
      path = href.slice(0, cut);
      hash = href.slice(cut + 1);
    }
    if (path === "" && hash) {
      var here = shelfId && shelfId !== "index" ? "/" + shelfId : "";
      return { href: "#/library" + here + "/" + encodeURIComponent(hash), external: false };
    }
    if (Object.prototype.hasOwnProperty.call(shelves, path)) {
      var shelf = shelves[path];
      var route = "#/library" + (shelf ? "/" + shelf : "");
      if (hash) route += "/" + encodeURIComponent(hash);
      return { href: route, external: false };
    }
    if (path.indexOf("../analysis/") === 0) {
      var id = path.slice("../analysis/".length).replace(/\.md$/, "");
      return { href: "#/library/analysis-" + encodeURIComponent(id) + (hash ? "/" + encodeURIComponent(hash) : ""), external: false };
    }
    return { href: href, external: false };
  }

  function inline(text, shelfId) {
    var codes = [];
    var src = String(text).replace(/`([^`]+)`/g, function (_, code) {
      codes.push(code);
      return "\u0000C" + (codes.length - 1) + "\u0000";
    });
    src = escapeHtml(src);
    src = src.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    src = src.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
      var linked = linkHref(href, shelfId);
      var attrs = linked.external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return '<a href="' + escapeHtml(linked.href) + '"' + attrs + ">" + label + "</a>";
    });
    src = src.replace(/\u0000C(\d+)\u0000/g, function (_, index) {
      return "<code>" + escapeHtml(codes[Number(index)]) + "</code>";
    });
    return src;
  }

  function splitRow(line) {
    return line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map(function (cell) {
        return cell.trim();
      });
  }

  function isRule(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  }

  function renderTable(rows, shelfId) {
    var kept = rows.filter(function (row) {
      return !isRule(row);
    });
    if (!kept.length) return "";
    var html = '<div class="g-table-wrap"><table><thead><tr>';
    splitRow(kept[0]).forEach(function (cell) {
      html += "<th>" + inline(cell, shelfId) + "</th>";
    });
    html += "</tr></thead><tbody>";
    kept.slice(1).forEach(function (row) {
      html += "<tr>";
      splitRow(row).forEach(function (cell) {
        html += "<td>" + inline(cell, shelfId) + "</td>";
      });
      html += "</tr>";
    });
    html += "</tbody></table></div>";
    return html;
  }

  function renderMarkdown(markdown, shelfId) {
    var lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
    var html = [];
    var para = [];
    var i = 0;

    function flushPara() {
      if (!para.length) return;
      html.push("<p>" + inline(para.join(" "), shelfId) + "</p>");
      para = [];
    }

    while (i < lines.length) {
      var line = lines[i];
      var anchor = line.match(/^\s*<a id="([^"]+)"><\/a>\s*$/);
      if (anchor) {
        flushPara();
        html.push('<a id="' + escapeHtml(anchor[1]) + '"></a>');
        i += 1;
        continue;
      }
      if (/^```/.test(line)) {
        flushPara(); i += 1; var code = [];
        while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i += 1; }
        if (i < lines.length) i += 1;
        html.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>');
        continue;
      }
      if (/^\s*$/.test(line)) {
        flushPara();
        i += 1;
        continue;
      }
      var heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        flushPara();
        var level = heading[1].length;
        html.push("<h" + level + ">" + inline(heading[2], shelfId) + "</h" + level + ">");
        i += 1;
        continue;
      }
      if (/^\s*\|/.test(line)) {
        flushPara();
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          rows.push(lines[i]);
          i += 1;
        }
        html.push(renderTable(rows, shelfId));
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        flushPara();
        var items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
          i += 1;
        }
        html.push(
          "<ul>" +
            items
              .map(function (item) {
                return "<li>" + inline(item, shelfId) + "</li>";
              })
              .join("") +
            "</ul>",
        );
        continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        flushPara();
        var steps = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          steps.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
          i += 1;
        }
        html.push(
          "<ol>" +
            steps
              .map(function (item) {
                return "<li>" + inline(item, shelfId) + "</li>";
              })
              .join("") +
            "</ol>",
        );
        continue;
      }
      para.push(line.trim());
      i += 1;
    }
    flushPara();
    return html.join("\n");
  }

  function renderInto(el, markdown, shelfId) {
    el.innerHTML = renderMarkdown(markdown, shelfId);
  }

  root.ANDM_LIBRARY = {
    renderInto: renderInto,
    renderMarkdown: renderMarkdown,
    linkHref: linkHref,
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
