<div align="center">

# ⛽ dgeg-client

**A modern, lightweight TypeScript client for the official Portuguese DGEG Fuel Prices API.**

Fetch up-to-date gas station prices, geographic locations, brands, and fuel types across Portugal with a clean, fully-typed API.

[![NPM Version](https://img.shields.io/npm/v/dgeg-client?style=flat-square&color=007acc)](https://www.npmjs.com/package/dgeg-client)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen.svg?style=flat-square)](#)
[![Tests Passing](https://img.shields.io/badge/Tests-82%20passed-brightgreen?style=flat-square)](#)

[Features](#features-) • [Installation](#installation-) • [Quick Start](#quick-start-) • [API Reference](#api-reference-) • [Caching](#caching-strategy-) • [Types](#typescript-support-) • [License](#license-)

</div>

---

## Features ✨

- 🚀 **Zero Dependencies** — Built on native `fetch` with no bloated HTTP libraries or runtime dependencies.
- 🔷 **100% TypeScript** — Comprehensive type definitions, strict null checks, and complete autocompletion.
- 🧹 **Clean Domain Model** — Translates Portuguese DGEG API schemas into ergonomic, idiomatic objects.
- ⚡ **Built-in Smart In-Memory Caching** — Automatically memoizes static reference data to avoid redundant network requests.
- 🔍 **Rich Query Filters** — Filter stations by district, municipality IDs, brand, station type, and fuel types.
- 📦 **Dual ESM & CommonJS** — Compatible with Node.js (>= 18), modern bundlers (Vite, Next.js, Rollup, webpack), and CJS environments.

---

## Installation 📦

Install with your preferred package manager:

```bash
# npm
npm install dgeg-client

# pnpm
pnpm add dgeg-client

# yarn
yarn add dgeg-client

# bun
bun add dgeg-client
```

> **Note**: Requires Node.js `>= 18.0.0` (with native `fetch` support) or any modern browser / edge runtime.

---

## Quick Start 🚀

```typescript
import { DGEGClient } from 'dgeg-client';

const client = new DGEGClient();

// Fetch stations with real-time fuel prices in a specific municipality
const stations = await client.getStations({
  municipalityIds: [107], // e.g., Castro Marim
});

for (const station of stations) {
  console.log(`\n📍 ${station.name} (${station.brand})`);
  console.log(`   Address: ${station.address}, ${station.postalCode} ${station.town}`);

  for (const fuel of station.fuels) {
    console.log(`   ⛽ ${fuel.name}: ${fuel.price}€ / ${fuel.measurementUnit} (Updated: ${fuel.updatedAt})`);
  }
}
```

---

## API Reference 📖

### Initializing the Client

```typescript
import { DGEGClient } from 'dgeg-client';

const client = new DGEGClient();
```

---

### Fuel Stations & Prices

#### `client.getStations(filters?)`

Fetches fuel stations matching the specified criteria, along with their available fuels, current prices, and update timestamps. Fuel data is grouped automatically per station.

##### Filter Options (`StationFilters`):

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `districtId` | `number` | Filter by district ID. |
| `municipalityIds` | `number[]` | Filter by one or more municipality IDs. |
| `brandId` | `number` | Filter by fuel brand ID (e.g., Galp, Repsol, BP, Prio). |
| `fuelTypeIds` | `number[]` | Filter by one or more fuel type IDs (e.g., Gasóleo Simples, Gasolina 95). |
| `stationTypeId` | `number` | Filter by station type (e.g., Highway, Low Cost). |

##### Example:

```typescript
const stations = await client.getStations({
  districtId: 8,              // Faro district
  fuelTypeIds: [2101, 3201],  // Filter for specific fuels
  brandId: 1,                 // Filter by brand
});
```

##### Station Object Structure:

```json
{
  "id": 10423,
  "name": "POSTO REPSOL CASTRO MARIM",
  "brand": "REPSOL",
  "district": "Faro",
  "municipality": "Castro Marim",
  "address": "EN 122 KM 38,2",
  "town": "Castro Marim",
  "postalCode": "8950-138",
  "latitude": 37.21852,
  "longitude": -7.44281,
  "fuels": [
    {
      "id": 2101,
      "name": "Gasóleo simples",
      "price": "1,629",
      "measurementUnit": "€/litro",
      "updatedAt": "2026-09-26 00:00:00"
    }
  ]
}
```

---

### Reference Data

The Portuguese DGEG API relies on numeric IDs for locations, brands, fuels, and station types. The client provides methods to query this reference catalog.

#### `client.getDistricts(options?)`

Fetches all administrative districts in Portugal.

```typescript
const districts = await client.getDistricts();
// [{ id: 8, name: "Faro" }, { id: 11, name: "Lisboa" }, ...]
```

#### `client.getMunicipalities(filters?, options?)`

Fetches municipalities (*concelhos*). Can be optionally filtered by district ID.

```typescript
// Fetch all municipalities in Portugal
const allMunicipalities = await client.getMunicipalities();

// Fetch municipalities in Faro district (districtId: 8)
const faroMunicipalities = await client.getMunicipalities({ districtId: 8 });
// [{ id: 107, idDistrict: 8, name: "Castro Marim" }, ...]
```

#### `client.getBrands(options?)`

Fetches all registered fuel brands.

```typescript
const brands = await client.getBrands();
// [{ id: 1, name: "REPSOL" }, { id: 2, name: "GALP" }, { id: 3, name: "BP" }, ...]
```

#### `client.getFuels(options?)`

Fetches all fuel categories and their respective measurement units.

```typescript
const fuels = await client.getFuels();
// [{ id: 2101, name: "Gasóleo simples", measurementUnit: "€/litro" }, ...]
```

#### `client.getStationTypes(options?)`

Fetches all station types (e.g., Highway service areas, supermarkets, standard stations).

```typescript
const stationTypes = await client.getStationTypes();
// [{ id: 1, name: "Posto de Abastecimento" }, ...]
```

---

## Caching Strategy ⚡

Reference data (districts, municipalities, brands, station types, and fuels) changes infrequently. To guarantee optimal performance and respect DGEG's public servers:

- **Automatic Memoization**: Responses for reference data are cached in memory upon the first request.
- **Concurrent Request Deduplication**: If multiple calls are made concurrently before a response arrives, they share the same in-flight Promise.
- **Graceful Failures**: If an API request fails, the failed Promise is automatically evicted from cache so subsequent calls can retry cleanly.

### Bypassing Cache (`forceRefresh`)

All reference data methods accept `{ forceRefresh: true }` in `FetchOptions`:

```typescript
// Force a network request and update the cache
const freshDistricts = await client.getDistricts({ forceRefresh: true });
```

### Manual Cache Invalidation

You can clear cached data at any time using `clearCache`:

```typescript
// Clear all cached reference data
client.clearCache();

// Or selectively clear a specific resource:
client.clearCache('municipalities');
client.clearCache('districts');
client.clearCache('brands');
client.clearCache('fuels');
client.clearCache('stationTypes');
```

---

## TypeScript Support 🏷

All types are exported and can be imported directly:

```typescript
import type {
  Brand,
  District,
  FetchOptions,
  Fuel,
  Municipality,
  MunicipalityFilters,
  Station,
  StationFilters,
  StationFuel,
  StationType,
  CacheResource,
} from 'dgeg-client';
```

### Core Type Signatures

```typescript
export interface Station {
  id: number;
  name: string;
  brand: string;
  district: string;
  municipality: string;
  address: string;
  town: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  fuels: StationFuel[];
}

export interface StationFuel {
  id: number;
  name: string;
  price: string;
  measurementUnit: string;
  updatedAt: string;
}

export interface StationFilters {
  districtId?: number;
  municipalityIds?: number[];
  brandId?: number;
  fuelTypeIds?: number[];
  stationTypeId?: number;
}
```

---

## Disclaimer ⚖️

This is an **unofficial** library. It is neither affiliated with nor endorsed by the **Direção-Geral de Energia e Geologia (DGEG)** or the Portuguese Government.

Fuel and station data is retrieved from DGEG's public fuel price observatory service ([precoscombustiveis.dgeg.gov.pt](https://precoscombustiveis.dgeg.gov.pt)).

---

## License 📄

This project is licensed under the [MIT License](LICENSE).
