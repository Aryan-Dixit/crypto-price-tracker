# 🚀 Real-Time Crypto Trading UI

A high-performance real-time crypto trading frontend built using React, TypeScript, and WebSockets.

---

## 📦 Setup Instructions

### 1. Start Mock Server

```bash
cd socket-test
bun install
bun start
```

Server runs on:

* WebSocket → `ws://localhost:8080`
* HTTP API → `http://localhost:3000`

---

### 2. Start Frontend

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🧠 Approach

The application is designed with **performance, scalability, and real-time data handling** in mind.

### Architecture

* **Socket Manager**

  * Centralized WebSocket handling
  * Manages subscriptions and reconnections
  * Prevents duplicate connections

* **Custom Hooks**

  * `useTicker`, `useTrades`, `useOrderBook`
  * Encapsulate real-time data logic
  * Clean separation of concerns

* **Component Design**

  * Presentational components (OrderBook, Trades, Market)
  * Reusable and modular

---

## ⚡ Performance Optimizations

To handle high-frequency updates:

* Throttling using `requestAnimationFrame`
* Limiting DOM nodes:

  * Trades → 10-15 rows
  * Orderbook → top 5-10 levels
* Memoization (`React.memo`) for row components
* Efficient WebSocket subscription handling
* Avoid unnecessary re-renders

---

## 🔌 WebSocket Lifecycle

* Automatic connection handling
* Safe subscribe/unsubscribe
* Reconnection with state recovery
* Connection status indicator in UI

---

## 🎨 Features

### Core

* Real-time ticker updates
* Orderbook with depth visualization
* Recent trades stream
* Search & filtering
* Favorites support

### Bonus

* 📈 Candlestick chart (historical data)
* ⚡ Stress test mode (Slow / Normal / Fast / Extreme)
* 🌙 Friendly for a mobile view to an extent
* 🔄 Reconnection handling with fallback UI

---

## 🧪 Stress Test Mode

Users can simulate different data frequencies:

* Slow → Debug-friendly
* Normal → Default
* Fast → High frequency
* Extreme → Stress mode

Even under extreme load, the UI remains responsive due to optimizations.

---

## ⚠️ Notes

* No external APIs used (mock server only)
* Designed to handle high-frequency updates gracefully

---

## 🚀 What I Would Improve

Given more time:

* Add virtualization for very large datasets
* Improve chart with real-time candle updates
* Add unit tests for hooks (e.g., useTicker)
* Enhance responsive/mobile layout
* Persist user preferences (theme, favorites)

---

## 👨‍💻 Tech Stack

* React + TypeScript
* Zustand (state management)
* WebSocket API
* Chart.js (candlestick chart)

---

## 🎯 Summary

This project focuses on building a **real-time, high-performance frontend system** with clean architecture and production-ready patterns.

---
