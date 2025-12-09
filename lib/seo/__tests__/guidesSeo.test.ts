import test from 'node:test'
import assert from 'node:assert/strict'

import { guidesSeoConfig } from '../guidesSeo'

test('guides SEO config is well-formed', () => {
  for (const cfg of guidesSeoConfig) {
    assert.ok(cfg.url.startsWith('/guides/'), `url should be under /guides/: ${cfg.url}`)
    assert.ok(cfg.metaTitle.length > 10, `metaTitle missing for ${cfg.slug}`)
    assert.ok(cfg.metaDescription.length > 20, `metaDescription missing for ${cfg.slug}`)
    assert.ok(cfg.h1.length > 5, `h1 missing for ${cfg.slug}`)
    assert.ok(cfg.primaryCta.href.startsWith('/'), 'primary CTA must be internal')
    assert.ok(cfg.primaryCta.anchorText.length > 0)
  }
})
