# ViewChain Client Application

A modern, responsive web application for content creators to manage digital assets with verifiable view tracking using zero-knowledge proofs and blockchain technology.

## Key Features

- 🎨 **Creator Dashboard**: Intuitive interface for managing digital assets and tracking performance
- 🏪 **Digital Asset Marketplace**: Showcase and share content with verifiable viewership metrics
- 👤 **User Onboarding**: Streamlined creator registration with social account verification
- 📊 **Analytics**: Real-time view tracking with cryptographic proof verification
- 👛 **Wallet Integration**: Secure Solana wallet connection for blockchain transactions
- 🖼️ **Asset Management**: Create, organize, and monitor digital asset collections
- 🔍 **Proof Verification**: Real-time verification of view counts with zero-knowledge proofs

## Technology Stack

- **Framework**: Next.js 15.3.0 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks and Server Components
- **Animation**: Framer Motion
- **Interaction**: DND Kit for drag-and-drop
- **Web3**: Solana wallet adapter and web3.js
- **Auth**: NextAuth.js for authentication

## Project Structure

```
client/
├── actions/            # Server actions for data mutations
├── app/                # Next.js App Router pages and layouts
│   ├── api/           # API routes
│   ├── marketplace/   # Marketplace pages
│   ├── onboarding/    # User onboarding flow
│   └── share/         # Content sharing features
├── components/         # Reusable React components
│   ├── ui/           # UI primitives and shared components
│   └── landing/      # Landing page components
├── config/             # Application configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and types
└── public/             # Static assets
```

## Key Workflows

### Creator Onboarding
1. Connect wallet and verify ownership
2. Select creator type (YouTuber, Musician, etc.)
3. Connect social accounts for verification
4. Complete profile with experience level

### Asset Management
1. Create new collections by category
2. Upload digital assets with metadata
3. Organize assets with drag-and-drop interface
4. Monitor viewership metrics in real-time

### View Verification
1. Audience views are fingerprinted and recorded
2. Views are deduplicated to prevent inflation
3. Zero-knowledge proofs verify authentic views
4. View counts update in real-time with proof

## Integration with ViewChain

This client application connects with:

- **ViewChain Server**: For zero-knowledge proof generation
- **Shared DB Package**: For database operations
- **Solana Blockchain**: For wallet connection and transactions

## Development Guidelines

- Use Server Components when possible for improved performance
- Limit client components to UI interactions that require state
- Follow TypeScript conventions for type safety
- Use shadcn/ui components for consistent design
- Leverage Next.js App Router features for routing and layouts
