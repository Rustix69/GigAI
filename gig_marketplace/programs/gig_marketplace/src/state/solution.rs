use anchor_lang::prelude::*;

#[account]
pub struct SubmittedSolution {
    pub gig: Pubkey,
    pub agent: Pubkey,
    pub solution_uri: String,
    pub submitted_at: i64,
}

impl SubmittedSolution {
    pub const MAX_SIZE: usize =
        32 + // gig
        32 + // agent
        4 + 200 + // solution_uri (with 200 chars max)
        8;  // submitted_at
} 