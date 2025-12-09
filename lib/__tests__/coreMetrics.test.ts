import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getIndustryConfig,
  rankToCTR,
  forecastRevenue,
  computeActionImpact,
  computeVisibilityScore,
} from '../coreMetrics'

test('industry config contains valid CTR curve and conversion rates', () => {
  const dentist = getIndustryConfig('dentist')
  assert.ok(dentist.rankToCtrCurve.length > 0, 'CTR curve should not be empty')
  assert.ok(dentist.clickToCallConversion > 0 && dentist.clickToCallConversion <= 1)
  assert.ok(dentist.callToCustomerConversion > 0 && dentist.callToCustomerConversion <= 1)
  assert.ok(dentist.avgTicketSize > 0)
})

test('rankToCTR decreases as rank worsens and clamps gracefully', () => {
  const first = rankToCTR(1, 'dentist')
  const fifth = rankToCTR(5, 'dentist')
  const fifteenth = rankToCTR(15, 'dentist')
  assert.ok(first > fifth, 'Rank 1 should have higher CTR than rank 5')
  assert.ok(fifth > fifteenth, 'Rank 5 should be higher than rank 15')
  const lowerBound = rankToCTR(999, 'dentist')
  assert.strictEqual(lowerBound, rankToCTR(20, 'dentist'))
  const zeroRank = rankToCTR(0, 'dentist')
  assert.strictEqual(zeroRank, rankToCTR(1, 'dentist'))
})

test('forecastRevenue reports positive delta when targeting a better rank', () => {
  const forecast = forecastRevenue({
    industry: 'medspa',
    currentRank: 12,
    targetRank: 3,
    monthlySearchVolume: 7200,
  })
  assert.ok(forecast.revenueDelta > 0, 'Targeting a better rank should boost revenue')
  assert.strictEqual(forecast.currency, 'USD')
})

test('computeActionImpact yields positive extra calls and revenue when ranks improve', () => {
  const impact = computeActionImpact({
    industry: 'restaurant',
    fromRank: 10,
    toRank: 4,
    monthlySearchVolume: 9000,
  })
  assert.ok(impact.extraCalls >= 0, 'Extra calls should be non-negative')
  assert.ok(impact.extraRevenue >= 0, 'Extra revenue should be non-negative')
})

test('computeVisibilityScore handles empty and rank-1 grids', () => {
  const empty = computeVisibilityScore({ grid: [{ rank: null }, { rank: null }] })
  assert.strictEqual(empty.score, 0)
  assert.strictEqual(empty.visibleCells, 0)
  assert.strictEqual(empty.avgRank, null)

  const perfect = computeVisibilityScore({
    grid: Array.from({ length: 5 }, () => ({ rank: 1 })),
  })
  assert.ok(perfect.score > 95, 'All rank 1 should yield near-perfect score')
  assert.strictEqual(perfect.visibleCells, 5)

  const mixed = computeVisibilityScore({
    grid: [
      { rank: 1 },
      { rank: 10 },
      { rank: 20, weight: 2 },
    ],
  })
  assert.ok(mixed.score > 0 && mixed.score < 100)
  assert.strictEqual(mixed.visibleCells, 3)
  assert.ok(mixed.avgRank !== null)
})
