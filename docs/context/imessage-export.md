# iMessage Export — How It Works

## Tool

**imessage-exporter** — open-source CLI for exporting macOS Messages data.

- GitHub: https://github.com/reagentx/imessage-exporter
- Install: `brew install imessage-exporter`
- Version used: 3.3.2

## Prerequisites

- **Full Disk Access** must be granted to the app running the command (VS Code, Terminal, iTerm, etc.)
- System Settings → Privacy & Security → Full Disk Access → add your terminal app → restart app
- Without this, the tool cannot read `~/Library/Messages/chat.db`

## How the Export Was Done

```bash
# Export 1:1 conversation with Bo Carter by phone number
imessage-exporter -f txt -o /tmp/bo-carter-export -t "7064103604" -m "Mike"

# This also exported group chats that include Bo:
# - Soul Miners Chat (group)
# - A 6-person group chat (small)
```

### Key Flags

| Flag | Purpose |
|------|---------|
| `-f txt` | Export format (txt or html) |
| `-o <path>` | Output directory |
| `-t <filter>` | Filter by phone number, email, or contact name |
| `-m "Mike"` | Label for the database owner's messages (instead of "Me") |
| `-s YYYY-MM-DD` | Start date filter (optional) |
| `-e YYYY-MM-DD` | End date filter (optional) |

### Gotchas

- **Contact name matching is exact.** `"Bo Carter"` didn't match — had to use the raw phone number `7064103604` (no +1, no dashes).
- **Partial names match broadly.** `"Bo"` matched 36 chatrooms across all contacts with "Bo" in the name.
- **Phone number is most reliable** for filtering to a specific person.

## Files in This Repo

| File | Source | Lines | Content |
|------|--------|-------|---------|
| `docs/bo-carter-messages.txt` | 1:1 with Bo (+17064103604) | ~6,818 | Full message history |
| `docs/soul-miners-chat-messages.txt` | Soul Miners group chat | ~4,818 | Group chat history |

## Refreshing the Export

To re-export with updated messages:

```bash
# Full re-export
rm -rf /tmp/bo-carter-export
imessage-exporter -f txt -o /tmp/bo-carter-export -t "7064103604" -m "Mike"
cp /tmp/bo-carter-export/+17064103604.txt /Users/mikeusry/CODING/Soul-Miners-Eden/docs/bo-carter-messages.txt
cp /tmp/bo-carter-export/"Soul Miners Chat - 4818.txt" /Users/mikeusry/CODING/Soul-Miners-Eden/docs/soul-miners-chat-messages.txt

# Export only recent messages (e.g., last 30 days)
imessage-exporter -f txt -o /tmp/bo-recent -t "7064103604" -m "Mike" -s 2026-02-10
```

## Diagnostics

```bash
# Check database stats, handle counts, attachment sizes
imessage-exporter -d
```

Database stats (as of 2026-03-10):
- Total handles: 5,083
- Total messages: 167,866
- Total attachments: 14,843 (34 GB referenced, 26 GB on disk)
- Database size: 289 MB
