# SoulFast

> **"It's not about the timer. It's about who you let down."**

SoulFast is an open-source, mobile-first fasting companion that validates an emotional behavior-constraint mechanism. Unlike traditional fasting trackers that rely on gamification, charts, or notifications, SoulFast creates a psychological commitment through a virtual companion.

The core philosophy is grounded in **loss aversion**: disrupting the fast feels like disappointing a friend, not just stopping a clock.

## V0.1: Emotional Validation

This initial release (V0.1) is a minimalist Proof of Concept focusing entirely on the emotional feedback loop.

### Features
- **Distraction-Free Timer**: A clean 16:8 fasting timer that fades into the background.
- **Virtual Companion**: An omnipresent entity whose emotional state reflects your discipline.
- **Emotional Interruption**: Ending a fast early triggers a "guilt mechanism"—a deliberate friction point where the companion expresses disappointment, requiring you to actively confirm the breach of trust.
- **Local-Only**: No accounts, no cloud, no data tracking. Your journey is personal.

## Technology Stack

- **Framework**: Expo (Managed Workflow)
- **Core**: React Native + TypeScript
- **State Management**: Zustand (v4 for Web Compatibility)
- **Design System**: Custom minimalist theme with Phosphor Icons

## Web Compatibility Note
If running on Web (`npm run web`), ensure you use `npm install --legacy-peer-deps` to handle dependency resolutions correctly. We use `babel-preset-expo` to ensure cross-platform compatibility.


## Project Structure

- `src/app`: Navigation and Screen assembly.
- `src/features`: Independent functional modules.
  - `companion`: Companion emotional states and UI.
  - `timer`: Fasting logic and countdown.
  - `emotion`: Helper logic for emotional states.
- `src/shared`: Reusable theme tokens and UI atoms.

## Future Evolution

SoulFast evolves from a tool into a presence.

1.  **Phase 1 (Single Player)**: Deepening the bond. The companion "grows" and remembers past failures/successes, building a history that feels alive.
2.  **Phase 2 (Community)**: "Pacts". Linking your companion with others. If you break your fast, your friend's companion reacts.
3.  **Phase 3 (Ecosystem)**: Hardware integration (e.g., status on a physical desk ornament) and Web3 validation (proof-of-fast).

## Contributing

We welcome thoughtful contributors who align with the philosophy of "calm technology" and "emotional design". Please read the code of conduct before submitting PRs.
