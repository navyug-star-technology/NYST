import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  Eye,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { apiRequest } from "../src/lib/api.js";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "visitor", label: "Visitors", icon: Users },
  { id: "question", label: "Questions", icon: MessageCircle },
  { id: "project", label: "Project enquiries", icon: FileText },
  { id: "content", label: "Website content", icon: Globe },
];
const sectionTitles = {
  visitor: "Visitor information",
  question: "Questions",
  project: "Project enquiries",
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getValueAtPath(object, path) {
  return path.reduce((value, key) => value?.[key], object);
}

function replaceAtPath(object, path, nextValue) {
  if (!path.length) return nextValue;
  const [key, ...remaining] = path;
  const copy = Array.isArray(object) ? [...object] : { ...object };
  copy[key] = replaceAtPath(object[key], remaining, nextValue);
  return copy;
}

function emptyLike(value) {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, emptyLike(child)]));
  }
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function ContentInputs({ value, path, onChange }) {
  if (Array.isArray(value)) {
    return (
      <div className="admin-content-array">
        {value.map((item, index) => (
          <div className="admin-content-array-item" key={`${path.join(".")}-${index}`}>
            <div className="admin-content-array-heading">
              <strong>{`${path.at(-1)} #${index + 1}`}</strong>
              <button
                type="button"
                className="admin-text-button admin-danger-text"
                onClick={() =>
                  onChange(
                    path,
                    value.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                Remove
              </button>
            </div>
            <ContentInputs value={item} path={[...path, index]} onChange={onChange} />
          </div>
        ))}
        <button
          type="button"
          className="admin-secondary-button"
          onClick={() => onChange(path, [...value, emptyLike(value[0] ?? {})])}
        >
          Add item
        </button>
      </div>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="admin-content-fields">
        {Object.entries(value).map(([key, child]) => (
          <div className="admin-field" key={[...path, key].join(".")}>
            <span>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}
            </span>
            <ContentInputs value={child} path={[...path, key]} onChange={onChange} />
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "string") {
    const multiline = value.length > 100 || path.at(-1)?.toLowerCase().includes("description");
    const Input = multiline ? "textarea" : "input";
    return (
      <Input
        aria-label={path.join(" ")}
        value={value}
        rows={multiline ? 3 : undefined}
        onChange={(event) => onChange(path, event.target.value)}
      />
    );
  }
  return <p className="admin-muted">This content type is not editable here.</p>;
}

function Login({ onLogin, initialError = "" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiRequest("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onLogin();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <form className="admin-login-card" onSubmit={submit}>
        <span className="admin-brand-mark">NY</span>
        <p className="admin-eyebrow">NAVYUG STAR TECHNOLOGY</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Sign in to manage enquiries and website content.</p>
        <label className="admin-field">
          <span>Email address</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        <button className="admin-primary-button" type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function SubmissionTable({ kind, items, onStatusChange, onDelete, search, busyId }) {
  useEffect(() => {
    const closeDetailsOnOutsideClick = (event) => {
      document.querySelectorAll(".admin-row-details[open]").forEach((details) => {
        if (!details.contains(event.target)) details.removeAttribute("open");
      });
    };
    document.addEventListener("mousedown", closeDetailsOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeDetailsOnOutsideClick);
  }, []);
  const visibleItems = items.filter((item) =>
    [item.name, item.email, item.contact, item.business, item.topic, item.service]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  if (!visibleItems.length) {
    return <div className="admin-empty">No submissions found.</div>;
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>
              {kind === "visitor" ? "Email" : kind === "question" ? "Topic" : "Contact / service"}
            </th>
            <th>Received</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item) => (
            <tr key={item.id}>
              <td>
                <strong className="admin-submission-name">
                  {item.status === "new" && (
                    <span className="admin-unread-dot" aria-label="Unread" title="Unread" />
                  )}
                  {item.name}
                </strong>
                {item.business && <small>{item.business}</small>}
              </td>
              <td>
                {kind === "question"
                  ? item.topic
                  : kind === "project"
                    ? `${item.contact} · ${item.service || "No service selected"}`
                    : item.email}
              </td>
              <td>{formatDate(item.createdAt)}</td>
              <td>
                <select
                  className={`admin-status admin-status-${item.status}`}
                  aria-label={`Status for ${item.name}`}
                  value={item.status}
                  disabled={busyId === item.id}
                  onChange={(event) => onStatusChange(kind, item.id, event.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
              <td>
                <div className="admin-row-actions">
                  <details className="admin-row-details">
                    <summary
                      aria-label={`Show details for ${item.name}`}
                      onClick={() => {
                        if (item.status === "new") onStatusChange(kind, item.id, "contacted");
                      }}
                    >
                      <Eye size={17} />
                    </summary>
                    <div>
                      <button
                        type="button"
                        className="admin-details-close"
                        aria-label="Close submission details"
                        onClick={(event) =>
                          event.currentTarget.closest("details")?.removeAttribute("open")
                        }
                      >
                        ×
                      </button>
                      {Object.entries(item)
                        .filter(
                          ([key]) =>
                            !["id", "status", "createdAt", "updatedAt", "source"].includes(key),
                        )
                        .map(([key, value]) => (
                          <p key={key}>
                            <strong>{key}:</strong> {String(value || "—")}
                          </p>
                        ))}
                      <p>
                        <strong>Source:</strong> {item.source}
                      </p>
                    </div>
                  </details>
                  <button
                    type="button"
                    className="admin-delete-button"
                    aria-label={`Delete ${item.name}`}
                    title="Delete submission"
                    onClick={() => onDelete(kind, item)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WebsiteContentEditor() {
  const [content, setContent] = useState(null);
  const [section, setSection] = useState("global");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiRequest("/admin/content")
      .then(setContent)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const update = useCallback((path, value) => {
    setContent((current) => replaceAtPath(current, path, value));
  }, []);

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await apiRequest("/admin/content", { method: "PUT", body: JSON.stringify(content) });
      setNotice("Website content saved. Refresh the public site to see the changes.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (!content) return <div className="admin-empty">{error || "Loading website content..."}</div>;
  const sectionValue = getValueAtPath(content, [section]);
  return (
    <form className="admin-content-editor" onSubmit={save}>
      <p className="admin-muted">
        Edit contact details, navigation, page copy, services, process steps, and FAQs. Refresh the
        public site to see saved changes.
      </p>
      <div className="admin-content-tabs" role="tablist" aria-label="Website content sections">
        {Object.keys(content).map((key) => (
          <button
            type="button"
            role="tab"
            aria-selected={section === key}
            className={section === key ? "is-active" : ""}
            key={key}
            onClick={() => setSection(key)}
          >
            {key.replace(/^./, (letter) => letter.toUpperCase())}
          </button>
        ))}
      </div>
      <div className="admin-content-panel">
        <h2>{section.replace(/^./, (letter) => letter.toUpperCase())}</h2>
        <ContentInputs value={sectionValue} path={[section]} onChange={update} />
      </div>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="admin-success" role="status">
          {notice}
        </p>
      )}
      <button className="admin-primary-button" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save and publish"}
      </button>
    </form>
  );
}

function AdminDashboard({ onLogout }) {
  const [section, setSection] = useState("visitor");
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [emailConfigured, setEmailConfigured] = useState(true);

  const loadSection = useCallback(async (selected, selectedPage = 0) => {
    setError("");
    if (!["visitor", "question", "project"].includes(selected)) {
      setItems([]);
      return;
    }
    try {
      const result = await apiRequest(
        `/admin/submissions?type=${selected}&limit=25&skip=${selectedPage * 25}`,
      );
      setItems(result.items);
      setCounts((current) => ({ ...current, [selected]: result }));
      setEmailConfigured(result.notificationEmailConfigured);
    } catch (requestError) {
      setError(requestError.message);
    }
  }, []);

  useEffect(() => {
    if (sectionTitles[section]) {
      loadSection(section, page);
      const timer = window.setInterval(() => loadSection(section, page), 30_000);
      return () => window.clearInterval(timer);
    }
    if (section === "overview") {
      const refreshCounts = () =>
        Promise.all(
          ["visitor", "question", "project"].map((kind) =>
            apiRequest(`/admin/submissions?type=${kind}&limit=1`).then((result) => {
              setCounts((current) => ({ ...current, [kind]: result }));
              setEmailConfigured(result.notificationEmailConfigured);
            }),
          ),
        ).catch((requestError) => setError(requestError.message));
      refreshCounts();
      const timer = window.setInterval(refreshCounts, 30_000);
      return () => window.clearInterval(timer);
    }
  }, [section, page, loadSection]);

  async function updateStatus(kind, id, status) {
    setBusyId(id);
    setError("");
    try {
      await apiRequest(`/admin/submissions/${kind}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadSection(kind, page);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  }

  async function deleteSubmission(kind, item) {
    setDeleteTarget({ kind, item });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const { kind, item } = deleteTarget;
    setDeleteTarget(null);
    setBusyId(item.id);
    setError("");
    try {
      await apiRequest(`/admin/submissions/${kind}/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "__delete__" }),
      });
      await loadSection(kind, page);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  }

  const unreadTotal = useMemo(
    () => Object.values(counts).reduce((total, result) => total + (result?.newCount || 0), 0),
    [counts],
  );
  const heading =
    section === "overview"
      ? "Overview"
      : section === "content"
        ? "Website content"
        : sectionTitles[section];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/">
          <span className="admin-brand-mark">NY</span>
          <span>
            <strong>NavYug Star</strong>
            <small>ADMIN PANEL</small>
          </span>
        </a>
        <nav className="admin-side-nav" aria-label="Admin sections">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={section === id ? "is-active" : ""}
              onClick={() => {
                setSection(id);
                setSearch("");
                setPage(0);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id !== "overview" && id !== "content" && counts[id]?.newCount > 0 && (
                <b>{counts[id].newCount}</b>
              )}
            </button>
          ))}
        </nav>
        <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">
          <Globe size={17} /> View website
        </a>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">ADMINISTRATION</p>
            <h1>{heading}</h1>
          </div>
          <div className="admin-user-actions">
            <span className="admin-new-count">
              <Bell size={17} /> {unreadTotal} new
            </span>
            <span
              className={emailConfigured ? "admin-email-state" : "admin-email-state is-off"}
              title={
                emailConfigured
                  ? "Email notifications are configured"
                  : "Configure SMTP settings in backend environment"
              }
            >
              <Bell size={17} /> {emailConfigured ? "Email alerts on" : "Email alerts off"}
            </span>
            <button className="admin-logout-button" type="button" onClick={onLogout}>
              <LogOut size={17} /> Sign out
            </button>
          </div>
        </header>
        {!emailConfigured && (
          <div className="admin-warning" role="status">
            Submissions are saved, but email alerts are not configured. Add SMTP settings to the
            backend environment.
          </div>
        )}
        {error && (
          <div className="admin-error admin-banner" role="alert">
            {error}
          </div>
        )}
        {section === "overview" && (
          <>
            <div className="admin-stat-grid">
              {["visitor", "question", "project"].map((kind) => (
                <button
                  className="admin-stat-card"
                  type="button"
                  key={kind}
                  onClick={() => {
                    setSection(kind);
                    setPage(0);
                  }}
                >
                  <span>{sectionTitles[kind]}</span>
                  <strong>{counts[kind]?.total ?? "—"}</strong>
                  <small>{counts[kind]?.newCount ?? 0} new</small>
                </button>
              ))}
            </div>
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-eyebrow">INBOX</p>
                  <h2>Latest activity</h2>
                </div>
                <Bell size={19} />
              </div>
              <p className="admin-muted">
                Use the Visitors, Questions, and Project enquiries pages to review and update
                submissions.
              </p>
            </section>
          </>
        )}
        {section === "content" && (
          <section className="admin-panel">
            <WebsiteContentEditor />
          </section>
        )}
        {sectionTitles[section] && (
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">INBOX · {counts[section]?.total ?? 0} TOTAL</p>
                <h2>{sectionTitles[section]}</h2>
              </div>
              <label className="admin-search">
                <Search size={16} />
                <input
                  placeholder="Search submissions on this page"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>
            <SubmissionTable
              kind={section}
              items={items}
              search={search}
              onStatusChange={updateStatus}
              onDelete={deleteSubmission}
              busyId={busyId}
            />
            <div className="admin-pagination">
              <span>
                Page {page + 1} · {counts[section]?.total ?? 0} submissions
              </span>
              <div>
                <button
                  type="button"
                  className="admin-secondary-button"
                  disabled={page === 0}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="admin-secondary-button"
                  disabled={(page + 1) * 25 >= (counts[section]?.total ?? 0)}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      {deleteTarget && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && setDeleteTarget(null)}
        >
          <section
            className="admin-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <div className="admin-confirm-icon">
              <Trash2 size={22} />
            </div>
            <p className="admin-eyebrow">DELETE SUBMISSION</p>
            <h2 id="delete-dialog-title">Delete this submission?</h2>
            <p>
              Are you sure you want to delete the submission from{" "}
              <strong>{deleteTarget.item.name}</strong>?
            </p>
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button type="button" className="admin-danger-button" onClick={confirmDelete}>
                Delete submission
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [connectionError, setConnectionError] = useState("");
  useEffect(() => {
    apiRequest("/admin/session")
      .then((result) => setAuthenticated(result.authenticated))
      .catch((error) => {
        console.error("Could not check the admin session:", error);
        setConnectionError(`Backend connection failed: ${error.message}`);
        setAuthenticated(false);
      })
      .finally(() => setChecking(false));
  }, []);

  async function logout() {
    try {
      await apiRequest("/admin/logout", { method: "POST", body: "{}" });
      setAuthenticated(false);
    } catch (error) {
      console.error("Could not sign out:", error);
    }
  }

  if (checking)
    return (
      <main className="admin-login-shell">
        <p className="admin-muted">Connecting to the admin backend...</p>
      </main>
    );
  return authenticated ? (
    <AdminDashboard onLogout={logout} />
  ) : (
    <Login
      onLogin={() => {
        setConnectionError("");
        setAuthenticated(true);
      }}
      initialError={connectionError}
    />
  );
}
