# ViewChain Server

A robust Express server for verifying and generating zero-knowledge proofs of digital asset views using the Reclaim Protocol. This server is part of the ViewChain monorepo, which provides provenance for digital assets.

## Features

- 🔍 **ZK Proof Generation**: Create verifiable zero-knowledge proofs of asset view counts
- 📊 **View Count Verification**: Verify asset view counts via direct and ZK methods
- 📝 **Proof Persistence**: Store proofs in a PostgreSQL database
- 📈 **Statistics Tracking**: Record and expose proof generation statistics
- ⏱️ **Automated Proof Generation**: Scheduled cron jobs for generating proofs
- 🧩 **Modular Architecture**: Clean separation of concerns for maintenance and scaling
- 🛡️ **View Deduplication**: Prevent artificially inflating view counts through fingerprinting
- ⚡ **Real-time Updates**: View counts update automatically without page reloads

## Project Structure

```
server/
├── src/                    # Source code
│   ├── controllers/        # Request handlers
│   │   └── proofController.ts    # Controllers for proof generation and stats
│   ├── cron/               # Scheduled tasks
│   │   └── proofStatsCron.ts     # Auto-generation of proofs
│   ├── models/             # Data models
│   │   └── ProofStats.ts         # In-memory tracking of proof generation
│   ├── routes/             # API route definitions
│   │   └── proofRoutes.ts        # Routes for proof-related endpoints
│   ├── services/           # Business logic
│   │   └── proofService.ts       # Services for ZK proof generation and DB operations
│   └── index.ts            # Main application entry point
├── dist/                   # Compiled output
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## API Endpoints

- `GET /health` - Server health check
- `GET /api/stats` - Get proof generation statistics
- `POST /api/generateProof` - Generate proof for asset view count
- `POST /generateProof` - Legacy endpoint (redirects to /api/generateProof)

## Local Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Download the required ZK circuits:

    ```bash
    npm run download:zk-circuits
    ```

3. Create a `.env` file with the following variables:

   ```
   PORT=3001
   CLIENT_APP_URL=http://localhost:3000
   APP_ID=your_reclaim_app_id
   APP_SECRET=your_reclaim_app_secret
   ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. For production build:

   ```bash
   npm run build
   npm start
   ```

## How It Works

1. The server receives view count verification requests from clients
2. It attempts to generate ZK proofs using Reclaim Protocol by querying the asset's API endpoint
3. The proof is verified and transformed for on-chain use
4. If ZK proof generation fails, it falls back to direct verification
5. Successful proofs are saved to the database
6. A cron job periodically checks for new views and generates proofs

## View Count Protection

ViewChain implements several measures to ensure accurate and honest view counts:

1. **Client Fingerprinting**: Each viewer is identified by user ID (if logged in) or IP address
2. **Cooldown Periods**: Multiple views from the same client are deduplicated within a configurable timeframe
3. **Automatic Updates**: View counts are updated in real-time without requiring page reload
4. **ZK Verification**: View counts are cryptographically verified to prevent tampering

## Integration with ViewChain

This server is part of the ViewChain monorepo, which includes:

- `apps/client`: Next.js frontend for displaying and managing digital assets
- `packages/db`: Shared Prisma database library
- `apps/server`: This Express backend for proof generation

## Technical Details

- Built with Express.js and TypeScript
- Uses Prisma ORM to interact with PostgreSQL
- Integrates with Reclaim Protocol for zero-knowledge proofs
- Implements cron jobs using node-cron
- Structured for maintainability with proper separation of concerns
