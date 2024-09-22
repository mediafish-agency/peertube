const i = (t) => typeof t.id == "string" && typeof t.from == "number" && typeof t.to == "number" && typeof t.text == "string", I = (t) => !t || /^\s*$/.test(t), o = {
  ID: "ID",
  TIME_LINE: "TIME_LINE",
  TEXT: "TEXT",
  MULTI_LINE_TEXT: "MULTI_LINE_TEXT",
  FIN_ENTRY: "FIN_ENTRY",
  FINISH: "FINISH"
}, N = (t) => {
  let n = t.split(":"), e, r, E;
  return n.length === 2 ? [r, E] = n : [e, r, E] = n, parseInt(E.replace(",", ""), 10) + parseInt(r, 10) * 60 * 1e3 + (e ? parseInt(e, 10) : 0) * 60 * 60 * 1e3;
}, c = () => ({
  start(t) {
    let n = o.ID, e = {
      tokens: t.split(/\n/),
      pos: 0,
      result: [],
      current: {}
    };
    for (; n !== o.FINISH; ) {
      const r = this[n](e);
      e = r.params, n = r.next;
    }
    return e.result;
  },
  [o.ID](t) {
    const { tokens: n, pos: e, current: r } = t;
    if (n.length <= e)
      return { next: o.FINISH, params: t };
    if (I(n[e]))
      return { next: o.ID, params: { ...t, pos: e + 1 } };
    const E = n[e].includes("-->");
    return r.id = E ? "" : n[e], {
      next: o.TIME_LINE,
      params: {
        ...t,
        current: r,
        tokens: n,
        pos: E ? e : e + 1
      }
    };
  },
  [o.TIME_LINE](t) {
    const { tokens: n, pos: e, current: r } = t, E = n[e], [T, _] = E.split("-->");
    return r.from = N(T), r.to = N(_), { next: o.TEXT, params: { ...t, current: r, pos: e + 1 } };
  },
  [o.TEXT](t) {
    const { tokens: n, pos: e, current: r } = t;
    return n.length <= e ? { next: o.FINISH, params: t } : (r.text = n[e], { next: o.MULTI_LINE_TEXT, params: { ...t, current: r, pos: e + 1 } });
  },
  [o.MULTI_LINE_TEXT](t) {
    const { tokens: n, pos: e, current: r } = t;
    return n.length <= e || I(n[e]) ? { next: o.FIN_ENTRY, params: t } : (r.text = `${r.text}
${n[e]}`, { next: o.MULTI_LINE_TEXT, params: { ...t, current: r, pos: e + 1 } });
  },
  [o.FIN_ENTRY](t) {
    const { pos: n, current: e, result: r } = t;
    if (i(e))
      r.push(e);
    else
      throw new Error(`Parsing error current not complete ${JSON.stringify(e)}`);
    return { next: o.ID, params: { ...t, current: {}, pos: n + 1 } };
  },
  [o.FINISH](t) {
    return {
      next: o.FINISH,
      params: t
    };
  }
}), p = (t) => ({
  entries: c().start(t)
}), s = {
  HEADER: "HEADER",
  ID: "ID",
  TIME_LINE: "TIME_LINE",
  ID_OR_NOTE_OR_STYLE_OR_REGION: "ID_OR_NOTE_OR_STYLE_OR_REGION",
  STYLE: "STYLE",
  NOTE: "NOTE",
  REGION: "REGION",
  LEGACY_HEADER: "LEGACY_HEADER",
  TEXT: "TEXT",
  MULTI_LINE_TEXT: "MULTI_LINE_TEXT",
  FIN_ENTRY: "FIN_ENTRY",
  FINISH: "FINISH"
}, u = (t) => {
  let n = t.split(":"), e, r, E;
  return n.length === 2 ? [r, E] = n : [e, r, E] = n, parseInt(E.replace(".", ""), 10) + parseInt(r, 10) * 60 * 1e3 + (e ? parseInt(e, 10) : 0) * 60 * 60 * 1e3;
}, R = () => ({
  start(t) {
    let n = s.HEADER, e = {
      tokens: t.split(/\n/),
      pos: 0,
      result: [],
      current: {}
    };
    for (; n !== s.FINISH; ) {
      const r = this[n](e);
      e = r.params, n = r.next;
    }
    return e.result;
  },
  [s.HEADER](t) {
    return { next: s.LEGACY_HEADER, params: { ...t, pos: t.pos + 1 } };
  },
  [s.LEGACY_HEADER](t) {
    const { tokens: n, pos: e } = t;
    return n.length <= e ? { next: s.FINISH, params: t } : n[e].includes(":") && !n[e].includes("-->") ? { next: s.LEGACY_HEADER, params: { ...t, pos: e + 1 } } : { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: t };
  },
  [s.ID_OR_NOTE_OR_STYLE_OR_REGION](t) {
    const { tokens: n, pos: e } = t;
    return n.length <= e ? { next: s.FINISH, params: t } : I(n[e]) ? { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: { ...t, pos: e + 1 } } : n[e].toUpperCase().includes("NOTE") ? { next: s.NOTE, params: t } : n[e].toUpperCase().includes("STYLE") ? { next: s.STYLE, params: t } : n[e].toUpperCase().includes("REGION") ? { next: s.REGION, params: t } : { next: s.ID, params: t };
  },
  [s.STYLE](t) {
    const { tokens: n, pos: e } = t;
    return I(n[e]) ? { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: { ...t, pos: e + 1 } } : { next: s.STYLE, params: { ...t, pos: e + 1 } };
  },
  [s.NOTE](t) {
    const { tokens: n, pos: e } = t;
    return I(n[e]) ? { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: { ...t, pos: e + 1 } } : { next: s.STYLE, params: { ...t, pos: e + 1 } };
  },
  [s.REGION](t) {
    const { tokens: n, pos: e } = t;
    return I(n[e]) ? { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: { ...t, pos: e + 1 } } : { next: s.REGION, params: { ...t, pos: e + 1 } };
  },
  [s.ID](t) {
    const { tokens: n, pos: e, current: r } = t;
    if (n.length <= e)
      return { next: s.FINISH, params: t };
    if (I(n[e]))
      return { next: s.ID, params: { ...t, pos: e + 1 } };
    const E = n[e].includes("-->");
    return r.id = E ? "" : n[e], {
      next: s.TIME_LINE,
      params: {
        ...t,
        current: r,
        tokens: n,
        pos: E ? e : e + 1
      }
    };
  },
  [s.TIME_LINE](t) {
    const { tokens: n, pos: e, current: r } = t, E = n[e], [T, _] = E.split("-->");
    return r.from = u(T), r.to = u(_), { next: s.TEXT, params: { ...t, current: r, pos: e + 1 } };
  },
  [s.TEXT](t) {
    const { tokens: n, pos: e, current: r } = t;
    return n.length <= e ? { next: s.FINISH, params: t } : (r.text = n[e], { next: s.MULTI_LINE_TEXT, params: { ...t, current: r, pos: e + 1 } });
  },
  [s.MULTI_LINE_TEXT](t) {
    const { tokens: n, pos: e, current: r } = t;
    return n.length <= e || I(n[e]) ? { next: s.FIN_ENTRY, params: t } : (r.text = `${r.text}
${n[e]}`, { next: s.MULTI_LINE_TEXT, params: { ...t, current: r, pos: e + 1 } });
  },
  [s.FIN_ENTRY](t) {
    const { pos: n, current: e, result: r } = t;
    if (i(e))
      r.push(e);
    else
      throw new Error(`Parsing error current not complete ${JSON.stringify(e)}`);
    return { next: s.ID_OR_NOTE_OR_STYLE_OR_REGION, params: { ...t, current: {}, pos: n + 1 } };
  },
  [s.FINISH](t) {
    return {
      next: s.FINISH,
      params: t
    };
  }
}), l = (t) => ({
  entries: R().start(t)
}), O = (t) => t.startsWith("WEBVTT") ? l(t) : p(t);
export {
  O as parse
};
