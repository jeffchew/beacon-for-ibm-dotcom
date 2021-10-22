/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const constants = require('../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title: 'The Cookie Preferences link is included on the page.',
  failureTitle: 'The Cookie Preferences link is missing.',
  description:
    'The Cookie Preferences link is automatically included as part of `ibm-common.js`. You must include `ibm-common.js` in the page to ensure that the Cookie Preferences link is present.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains the `Cookie Preferences` link in the `footer` component.
 */
class LegalLinksAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'cookie-preferences-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckLegalLinks'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckLegalLinks.filter((link) => {
      return link.dataAutoid === 'dds--privacy-cp';
    });
    const hasCookiePreferences = loadMetrics.length !== 0;

    // binary scoring
    const score = hasCookiePreferences ? 1 : 0;

    return {
      rawValue: hasCookiePreferences,
      score: Number(score),
    };
  }
}

module.exports = LegalLinksAudit;
