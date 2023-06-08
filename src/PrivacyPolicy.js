import React from 'react';
import Popup from 'reactjs-popup';
import './cssFile.css';

function PrivacyPopup() {
  return (
      <div>
          <input type="checkbox" required="true" />
          <label className="fonts2">
              I agree with the
              <Popup
                trigger={(
                    <button type="button" className="privacy-policies-button">
                        privacy policies
                    </button>
          )}
                position="right center"
                modal
                closeOnDocumentClick
              >
                  <div className="fonts">
                      <h2>Privacy Policy</h2>
                      <p>
                          Introduction
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your personal data when you interact with our website and services.
                      </p>
                      <p>
                          Information We Collect
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We may collect various types of personal information from you, including but not limited to:
                          <br />
                          <ul>
                              <li>Name, email address, and contact details</li>
                              <li>Demographic information</li>
                              <li>Usage data and analytics</li>
                          </ul>
                      </p>
                      <p>
                          Use of Information
                          <br />
                          We use the collected information for the following purposes:
                          <br />
                          <ul>
                              <li>Providing and improving our products and services</li>
                              <li>Personalizing your experience</li>
                              <li>Communicating with you</li>
                              <li>Analyzing usage trends and patterns</li>
                          </ul>
                      </p>
                      <p>
                          Data Sharing and Disclosure
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We do not sell, trade, or rent your personal information to third parties without your explicit consent. However, we may share your information with trusted third-party service providers who assist us in operating our website and conducting our business.
                      </p>
                      <p>
                          Data Security
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
                      </p>
                      <p>
                          Cookies and Similar Technologies
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We may use cookies and similar technologies to enhance your browsing experience, gather usage information, and analyze trends. You can modify your browser settings to disable cookies, but this may affect certain features and functionality of our website.
                      </p>
                      <p>
                          Third-Party Links
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          Our website may contain links to third-party websites or services. We have no control over the content or practices of these websites and are not responsible for their privacy policies or practices. We encourage you to review the privacy policies of those third-party websites.
                      </p>
                      <p>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          Children's Privacy
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe that we may have inadvertently collected personal information from a child, please contact us immediately.
                      </p>
                      <p>
                          Your Rights
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          You have the right to access, update, correct, and delete your personal information. You may also have the right to restrict or object to certain processing activities. To exercise your rights, please contact us using the information provided at the end of this Privacy Policy.
                      </p>
                      <p>
                          Changes to this Privacy Policy
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will take effect immediately upon posting.
                      </p>
                      <p>
                          Contact Us
                          <br />
                          {/* eslint-disable-next-line max-len */}
                          If you have any questions or concerns regarding this Privacy Policy or our privacy practices, please contact us.
                      </p>
                  </div>
              </Popup>
          </label>
      </div>
  );
}

export default PrivacyPopup;
