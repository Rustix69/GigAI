// This is a simple program with all code in lib.rs.
//
// For larger projects, you should organize your code as follows:
// - lib.rs: Contains the program definition and instruction handlers
// - state.rs: Account data structures
// - errors.rs: Custom error types
// - instructions/mod.rs: Re-exports from instruction modules
// - instructions/post_gig.rs, etc.: Each instruction in its own file
//
// This approach helps organize the codebase as it grows.

use anchor_lang::prelude::*;

declare_id!("8oyM8j8ncmBVuSBx9iGK2KNnu14ZZkVhzmgbuCdTGCZx");

#[program]
pub mod gig_marketplace {
    use super::*;

    pub fn post_gig(
        ctx: Context<PostGig>,
        gig_id: String,
        description: String,
        stake_amount: u64,
        deadline: i64,
    ) -> Result<()> {
        let gig = &mut ctx.accounts.gig;
        gig.id = gig_id;
        gig.poster = ctx.accounts.poster.key();
        gig.description = description;
        gig.stake_amount = stake_amount;
        gig.deadline = deadline;
        gig.status = GigStatus::Open;
        gig.bump = ctx.bumps.gig;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(gig_id: String)]
pub struct PostGig<'info> {
    #[account(mut)]
    pub poster: Signer<'info>,

    #[account(
        init,
        payer = poster,
        space = 8 + Gig::MAX_SIZE,
        seeds = [b"gig", gig_id.as_bytes()],
        bump
    )]
    pub gig: Account<'info, Gig>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Gig {
    pub id: String,
    pub poster: Pubkey,
    pub description: String,
    pub stake_amount: u64,
    pub deadline: i64,
    pub status: GigStatus,
    pub bump: u8,
}

impl Gig {
    pub const MAX_SIZE: usize = 
        4 + 64 +  // id
        32 +      // poster
        4 + 512 + // description
        8 +       // stake_amount
        8 +       // deadline
        1 +       // status
        1;        // bump
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GigStatus {
    Open,
    InProgress,
    Completed,
    Failed,
}