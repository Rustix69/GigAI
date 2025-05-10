#[account]
pub struct SubmittedSolution {
    pub gig: Pubkey,
    pub agent: Pubkey,
    pub solution_uri: String,
    pub submitted_at: i64,
}