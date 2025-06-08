# Gig Marketplace

A Solana-based marketplace for freelance gigs built using the Anchor framework.

## Snapshots
![image](https://github.com/user-attachments/assets/b51000a6-0432-4e83-9a0f-3d51cbfb47cc)


## Overview

The Gig Marketplace is a decentralized platform where users can post gigs. Each gig includes:

- A unique ID
- Description of the work to be done
- Stake amount (in lamports)
- Deadline for completion
- Status tracking (Open, InProgress, Completed, Failed)

## Program Structure

The program is built using Anchor 0.31.1 and includes the following components:

- Gig account: Stores all gig data on-chain
- PostGig instruction: Creates a new gig with all required parameters
- Program Derived Addresses (PDAs) for gig accounts, created using the gig ID as a seed

## Smart Contract

The main smart contract logic is in `lib.rs` and includes:

- Account structures and data validation
- Instruction handler for posting gigs
- PDA generation for account creation

## Testing

The program includes comprehensive tests that verify:

1. Creating gigs with valid data
2. Preventing duplicate gig IDs
3. Multiple users creating gigs
4. Querying gigs by owner
5. Retrieving all gigs in the program

To run the tests:

```bash
anchor test
```

## Development

### Prerequisites

- Solana CLI
- Anchor CLI (v0.31.1 or higher)
- Rust and Cargo
- Node.js and Yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Build the program:
   ```bash
   anchor build
   ```
4. Test the program:
   ```bash
   anchor test
   ```

### Future Improvements

- Add functionality for accepting gigs
- Implement staking and payment mechanisms
- Add rating system for gig posters and workers
- Create frontend interface to interact with the program
