export function getNetGains(gains) {
  const stcgNet = gains.stcg.profits - gains.stcg.losses
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses
  return {
    stcgNet,
    ltcgNet,
    total: stcgNet + ltcgNet,
  }
}

// Selected holdings are applied on top of the original gains API result.
export function computeAfterGains(base, holdings, selectedIds) {
  if (!base) return null

  let stcgProfits = base.stcg.profits
  let stcgLosses = base.stcg.losses
  let ltcgProfits = base.ltcg.profits
  let ltcgLosses = base.ltcg.losses

  for (const holding of holdings) {
    if (!selectedIds.has(holding.id)) continue

    if (holding.stcg.gain >= 0) {
      stcgProfits += holding.stcg.gain
    } else {
      stcgLosses += Math.abs(holding.stcg.gain)
    }

    if (holding.ltcg.gain >= 0) {
      ltcgProfits += holding.ltcg.gain
    } else {
      ltcgLosses += Math.abs(holding.ltcg.gain)
    }
  }

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
  }
}
