import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GigMarketplace } from "../target/types/gig_marketplace";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import assert from "assert";
import {
  logSuccess,
  logError,
  logSection,
} from "../utils/logger"; // ✅ Adjust path if necessary

describe("gig_marketplace", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider() as anchor.AnchorProvider;
  const program = anchor.workspace.GigMarketplace as Program<GigMarketplace>;

  const gigId = "web-dev-001";
  const gigDescription = "Build a landing page using Next.js";
  const stakeAmount = new anchor.BN(1_000_000_000);
  const deadline = new anchor.BN(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const secondUser = Keypair.generate();
  const gigSeed = Buffer.from("gig");
  let gigPda: PublicKey;

  before(async () => {
    const airdropTx = await provider.connection.requestAirdrop(
      secondUser.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx);
    logSuccess("Second user funded with 2 SOL for tests");
  });

  it("Initializes and posts a gig with correct data", async () => {
    logSection("Posting Initial Gig");

    [gigPda] = await PublicKey.findProgramAddressSync(
      [gigSeed, Buffer.from(gigId)],
      program.programId
    );

    await program.methods
      .postGig(gigId, gigDescription, stakeAmount, deadline)
      .accounts({
        poster: provider.wallet.publicKey,
        gig: gigPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();

    const gigAccount = await program.account.gig.fetch(gigPda);

    assert.strictEqual(gigAccount.id, gigId);
    assert.strictEqual(gigAccount.description, gigDescription);
    assert.strictEqual(gigAccount.poster.toBase58(), provider.wallet.publicKey.toBase58());
    assert.ok(gigAccount.stakeAmount.eq(stakeAmount));
    assert.ok(gigAccount.deadline.eq(deadline));
    assert.strictEqual(gigAccount.status.open !== undefined, true);

    logSuccess("Gig posted successfully", gigAccount);
  });

  it("Cannot create a gig with the same ID", async () => {
    logSection("Duplicate Gig Creation");

    try {
      await program.methods
        .postGig(
          gigId,
          "This is a duplicate gig",
          new anchor.BN(500_000_000),
          new anchor.BN(Date.now() + 14 * 24 * 60 * 60 * 1000)
        )
        .accounts({
          poster: provider.wallet.publicKey,
          gig: gigPda,
          systemProgram: SystemProgram.programId,
        } as any)
        .rpc();

      assert.fail("Should have failed with duplicate gig ID");
    } catch (error) {
      assert.ok(error.toString().includes("Error"));
      logError("Duplicate gig creation blocked as expected", error);
    }
  });

  it("Can create a different gig with a new ID", async () => {
    logSection("Creating Second Gig");

    const newGigId = "mobile-app-001";
    const newDescription = "Develop a React Native mobile app";
    const [newGigPda] = await PublicKey.findProgramAddressSync(
      [gigSeed, Buffer.from(newGigId)],
      program.programId
    );

    await program.methods
      .postGig(
        newGigId,
        newDescription,
        new anchor.BN(2_000_000_000),
        new anchor.BN(Date.now() + 14 * 24 * 60 * 60 * 1000)
      )
      .accounts({
        poster: provider.wallet.publicKey,
        gig: newGigPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();

    const newGigAccount = await program.account.gig.fetch(newGigPda);

    assert.strictEqual(newGigAccount.id, newGigId);
    assert.strictEqual(newGigAccount.description, newDescription);

    logSuccess("Second gig created successfully", newGigAccount);
  });

  it("Different user can create a gig", async () => {
    logSection("Second User Posting");

    const userGigId = "graphic-design-001";
    const userDescription = "Design a logo for my startup";
    const [userGigPda] = await PublicKey.findProgramAddressSync(
      [gigSeed, Buffer.from(userGigId)],
      program.programId
    );

    await program.methods
      .postGig(
        userGigId,
        userDescription,
        new anchor.BN(1_500_000_000),
        new anchor.BN(Date.now() + 5 * 24 * 60 * 60 * 1000)
      )
      .accounts({
        poster: secondUser.publicKey,
        gig: userGigPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([secondUser])
      .rpc();

    const userGigAccount = await program.account.gig.fetch(userGigPda);

    assert.strictEqual(userGigAccount.id, userGigId);
    assert.strictEqual(userGigAccount.description, userDescription);
    assert.strictEqual(userGigAccount.poster.toBase58(), secondUser.publicKey.toBase58());

    logSuccess("Second user created a gig successfully", userGigAccount);
  });

  it("Can fetch all gigs in the program", async () => {
    logSection("Fetching All Gigs");

    const allGigs = await program.account.gig.all();
    assert.ok(allGigs.length >= 3);

    logSuccess(`Found ${allGigs.length} gigs in total`);

    const originalGig = allGigs.find(g => g.account.id === gigId);
    assert.ok(originalGig);
    assert.strictEqual(originalGig.account.description, gigDescription);

    logSuccess("Original gig verified in global fetch");
  });

  it("Can fetch gigs by owner using client-side filtering", async () => {
    logSection("Filtering Gigs by Owner");

    const allGigs = await program.account.gig.all();

    const mainUserGigs = allGigs.filter(
      gig => gig.account.poster.toBase58() === provider.wallet.publicKey.toBase58()
    );
    const secondUserGigs = allGigs.filter(
      gig => gig.account.poster.toBase58() === secondUser.publicKey.toBase58()
    );

    logSuccess(`Main user has ${mainUserGigs.length} gigs`);
    logSuccess(`Second user has ${secondUserGigs.length} gigs`);

    assert.ok(mainUserGigs.length >= 2);
    assert.ok(secondUserGigs.length >= 1);
    assert.ok(mainUserGigs.some(g => g.account.id === gigId));
    assert.ok(mainUserGigs.some(g => g.account.id === "mobile-app-001"));
    assert.ok(secondUserGigs.some(g => g.account.id === "graphic-design-001"));

    logSuccess("Ownership verification completed successfully");
  });
});
