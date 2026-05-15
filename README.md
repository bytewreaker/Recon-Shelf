# 🛠️ Recon Shelf

A fast, searchable reference of bug bounty and penetration testing tools — 
built for hunters who need the right tool the moment they identify a tech.

No logins. No installs. Just open and find.

🔗 **Live site:** `https://yourusername.github.io/recon-shelf`

---

## ✨ Features

- 🔍 Live search across tool name, description, and tags
- 🏷️ One-click tag filtering (`#recon`, `#jwt`, `#ssrf`, and more)
- ➕ Easy to contribute — just add an entry to `tools.json`
- 📱 Fully responsive
- 🌑 Dark theme, zero distractions

---

## 🚀 Usage

Open the site, identify your target tech, click the tag or search — done.

| You found... | Filter by... |
|---|---|
| A JWT endpoint | `#jwt` |
| An S3 bucket | `#recon` |
| A NoSQL database | `#nosql` |
| A file upload | `#file-upload` |
| A WAF | `#burp-plugin` |

---

## ➕ Adding a Tool

Edit `tools.json` and add an entry:

```json
{
  "name": "toolname",
  "description": "What it does in one line.",
  "website": "https://github.com/author/tool",
  "tags": ["tag1", "tag2"]
}
```

Then open a PR. That's it.

---

## 🤝 Contributing

PRs are welcome. If you know a tool that belongs here, add it.
Please keep descriptions short and tags consistent with existing ones.

---

## 📄 License

MIT
