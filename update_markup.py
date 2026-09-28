import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Section 1 (Operational Understanding) -> Light theme + Editorial split layout
sec1_start = '<!-- ================= 02. OPERATIONAL UNDERSTANDING (BUILT FOR THE WAY YOU WORK) ================= -->'
sec1_end = '<!-- ================= 03. BUSINESS SOLUTIONS ================= -->'

sec1_replacement = """<!-- ================= 02. OPERATIONAL UNDERSTANDING (BUILT FOR THE WAY YOU WORK) ================= -->
    <section class="section-spacing section-light editorial-understanding-section" id="built-for-work">
      <div class="container">
        
        <div class="editorial-understanding-grid">
          
          <!-- Left Editorial Column: Consulting Positioning & Storytelling Diagram -->
          <div class="understanding-left-col reveal-on-scroll">
            <div class="editorial-divider">
              <span class="divider-line"></span>
              <span class="divider-text" data-i18n="problems.tag">OPERATIONAL UNDERSTANDING</span>
            </div>
            
            <h2 class="section-heading understanding-heading" data-i18n="problems.title">Understand the Business Before Building the Solution</h2>
            
            <p class="section-sub understanding-sub" data-i18n="problems.subtitle">Every business has its own workflows, people, and operational challenges. We start by understanding how work actually happens before defining what technology should do.</p>
            
            <div class="understanding-anchor-callout">
              <div class="callout-symbol-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <p class="callout-text" data-i18n="problems.banner">We understand where work gets stuck, then build around what needs to improve.</p>
            </div>

            <!-- Business Process Diagram (Req #7: Business-Based Visuals) -->
            <div class="business-diagnostic-flow" aria-label="SOLVEXA Operational Diagnostic Sequence">
              <div class="diag-step">
                <span class="diag-num">01</span>
                <span class="diag-label">Real Workflow</span>
              </div>
              <div class="diag-connector">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg>
              </div>
              <div class="diag-step">
                <span class="diag-num">02</span>
                <span class="diag-label">Friction Diagnosis</span>
              </div>
              <div class="diag-connector">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg>
              </div>
              <div class="diag-step active">
                <span class="diag-num">03</span>
                <span class="diag-label">Built Around Business</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Numbered Operational Challenges Stack -->
          <div class="understanding-right-col reveal-on-scroll">
            <div class="editorial-problems-stack">
              
              <div class="editorial-problem-card">
                <div class="problem-card-top">
                  <span class="problem-num">01</span>
                  <span class="problem-badge-icon">⏱️</span>
                </div>
                <div class="problem-card-body">
                  <h3 class="problem-title" data-i18n="problems.card1_title">Manual Work</h3>
                  <p class="problem-desc" data-i18n="problems.card1_desc">Repetitive tasks consume time and create avoidable operational effort.</p>
                </div>
              </div>

              <div class="editorial-problem-card">
                <div class="problem-card-top">
                  <span class="problem-num">02</span>
                  <span class="problem-badge-icon">📂</span>
                </div>
                <div class="problem-card-body">
                  <h3 class="problem-title" data-i18n="problems.card2_title">Disconnected Information</h3>
                  <p class="problem-desc" data-i18n="problems.card2_desc">Critical information is often spread across spreadsheets, tools, messages, and separate systems.</p>
                </div>
              </div>

              <div class="editorial-problem-card">
                <div class="problem-card-top">
                  <span class="problem-num">03</span>
                  <span class="problem-badge-icon">🔄</span>
                </div>
                <div class="problem-card-body">
                  <h3 class="problem-title" data-i18n="problems.card3_title">Inconsistent Processes</h3>
                  <p class="problem-desc" data-i18n="problems.card3_desc">The same workflow can be handled differently across teams, making operations harder to control.</p>
                </div>
              </div>

              <div class="editorial-problem-card">
                <div class="problem-card-top">
                  <span class="problem-num">04</span>
                  <span class="problem-badge-icon">📊</span>
                </div>
                <div class="problem-card-body">
                  <h3 class="problem-title" data-i18n="problems.card4_title">Limited Visibility</h3>
                  <p class="problem-desc" data-i18n="problems.card4_desc">Decision-makers may lack timely visibility into what is happening across the operation.</p>
                </div>
              </div>

              <div class="editorial-problem-card">
                <div class="problem-card-top">
                  <span class="problem-num">05</span>
                  <span class="problem-badge-icon">📈</span>
                </div>
                <div class="problem-card-body">
                  <h3 class="problem-title" data-i18n="problems.card5_title">Growing Complexity</h3>
                  <p class="problem-desc" data-i18n="problems.card5_desc">As the business grows, processes become harder to coordinate and manage manually.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    """

p1 = html.find(sec1_start)
p2 = html.find(sec1_end)
if p1 != -1 and p2 != -1:
    html = html[:p1] + sec1_replacement + html[p2:]
    print("Section 1 updated")
else:
    print("Section 1 not found")

# 2. Section 2: Business Solutions -> section-dark
html = html.replace('<section class="section-spacing" id="solutions">', '<section class="section-spacing section-dark" id="solutions">')

# 3. Section 3: Our Approach -> section-dark with directional flow indicators
old_approach_header = '<section class="section-spacing" id="our-approach">'
new_approach_header = '<section class="section-spacing section-dark approach-section-directional" id="our-approach">'
html = html.replace(old_approach_header, new_approach_header)

# Enhance the 5-step grid with directional connectors between cards
old_approach_grid_start = '<div class="approach-steps-grid reveal-on-scroll">'
new_approach_grid_start = '<div class="approach-steps-grid directional-flow-grid reveal-on-scroll">'
html = html.replace(old_approach_grid_start, new_approach_grid_start)

# 4. Section 4: Why Choose Us -> section-light
html = html.replace('<section class="section-spacing" id="why-us">', '<section class="section-spacing section-light why-us-light-section" id="why-us">')

# 5. Section 5: Selected Work -> section-light-neutral
html = html.replace('<section class="section-spacing" id="selected-work">', '<section class="section-spacing section-light-neutral selected-work-light-section" id="selected-work">')

# 6. Section 6: About Us -> section-dark brand-symbol-section (already has brand-symbol-section)
html = html.replace('<section class="section-spacing brand-symbol-section" id="about-us">', '<section class="section-spacing section-dark brand-symbol-section" id="about-us">')

# 7. Section 7: Discovery Form -> section-dark brand-symbol-section + updated supporting idea
html = html.replace('<section class="section-spacing brand-symbol-section" id="discovery-form">', '<section class="section-spacing section-dark brand-symbol-section" id="discovery-form">')

# Update form subtitle with supporting idea requirement:
# "Let's understand how your business works and what could work better."
old_form_sub = '<p class="section-sub" data-i18n="form.subtitle">Share a few details about your current operations and what you\'re looking to improve. We will review your details and contact you to arrange an initial meeting.</p>'
new_form_sub = '<p class="section-sub" data-i18n="form.supporting_idea">Let\'s understand how your business works and what could work better.</p>'
html = html.replace(old_form_sub, new_form_sub)

# 8. Site Footer -> section-dark site-footer with clean social area
old_footer_start = '<!-- ================= SITE FOOTER ================= -->\n  <footer class="site-footer">'
new_footer = """<!-- ================= SITE FOOTER ================= -->
  <footer class="site-footer section-dark">
    <div class="container footer-container">
      <div class="footer-left">
        <a href="index.html" class="brand-logo-lockup" style="margin-bottom: 0.75rem;">
          <svg class="brand-logo-icon" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="74" stroke="url(#solv-grad-footer)" stroke-width="14" stroke-linecap="round" />
            <line x1="48" y1="152" x2="154" y2="46" stroke="url(#solv-grad-footer)" stroke-width="14" stroke-linecap="round" />
            <path d="M125 35 L168 32 L165 75 Z" fill="url(#solv-grad-footer)" />
            <path d="M 132 78 C 130 64 118 58 100 58 C 82 58 68 66 68 80 C 68 112 134 94 134 122 C 134 138 118 144 100 144 C 80 144 66 136 64 120" stroke="url(#solv-grad-footer)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <defs>
              <linearGradient id="solv-grad-footer" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2563EB" />
                <stop offset="100%" stop-color="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div class="brand-logo-text-group">
            <span class="brand-wordmark-title" data-i18n="nav.brand_name">solvexa</span>
            <span class="brand-descriptor-tag" data-i18n="nav.descriptor">BUSINESS SOLUTIONS</span>
          </div>
        </a>
        <p class="footer-sub" data-i18n="footer.desc">A business-first technology company helping businesses understand, organize, and improve their operations through customized digital solutions.</p>
        
        <!-- Social Channels / Connect with SOLVEXA (Req #12 & #14) -->
        <div class="footer-social-section">
          <h4 class="footer-social-title" data-i18n="footer.connect">Connect with SOLVEXA</h4>
          <div class="footer-social-links" id="footer-social-links">
            <a href="https://www.facebook.com/people/Solvexa-Egy/pfbid02ou4kKAFJSu36mJUnUfdX2AKrX9n4kGCLoNG5GdoNKCB1XuJ4UKWMoZmbhfV1ug2Gl/" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="SOLVEXA on Facebook" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/solvexaegy/" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="SOLVEXA on Instagram" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/solvexa-egy-42702443b/" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="SOLVEXA on LinkedIn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="mailto:Solvexaegy@gmail.com" class="social-icon-btn" aria-label="Email SOLVEXA" title="Email: Solvexaegy@gmail.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="javascript:void(0)" class="social-icon-btn social-wa-soon" aria-label="WhatsApp (Connecting Soon)" title="WhatsApp (Connecting Soon)" data-channel="whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-links">
        <a href="#solutions" class="footer-link" data-i18n="nav.solutions">Solutions</a>
        <a href="#our-approach" class="footer-link" data-i18n="nav.how_we_work">How We Work</a>
        <a href="#why-us" class="footer-link" data-i18n="nav.why_us">Why Choose Us</a>
        <a href="#selected-work" class="footer-link" data-i18n="nav.our_work">Our Work</a>
        <a href="#about-us" class="footer-link" data-i18n="nav.about_us">About Us</a>
        <a href="#discovery-form" class="footer-link" data-i18n="nav.contact_btn">Contact Us</a>
      </div>
    </div>
    
    <div class="container footer-bottom-bar">
      <span class="footer-rights" data-i18n="footer.rights">SOLVEXA &copy; 2026. All rights reserved.</span>
      <span class="footer-slogan" data-i18n="footer.slogan">Business First. Technology Second.</span>
    </div>
  </footer>"""

footer_start_pos = html.find('<!-- ================= SITE FOOTER ================= -->')
main_end_pos = html.find('</main>')
if footer_start_pos != -1:
    footer_end_pos = html.find('</footer>', footer_start_pos) + len('</footer>')
    html = html[:footer_start_pos] + new_footer + html[footer_end_pos:]
    print("Footer updated")

# 9. Add Floating Mobile Contact Button before scripts
floating_btn_html = """
  <!-- ================= FLOATING MOBILE CONTACT BUTTON (Req #15) ================= -->
  <a href="#discovery-form" class="floating-contact-btn" id="floating-contact-btn" aria-label="Contact SOLVEXA">
    <span class="floating-contact-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </span>
    <span class="floating-contact-text" data-i18n="floating.contact">Contact Us</span>
  </a>

  <!-- Centralized Config -->
  <script src="js/config.js"></script>
"""

if '<script src="js/config.js"></script>' not in html:
    html = html.replace('<script src="js/translations.js"></script>', floating_btn_html + '  <script src="js/translations.js"></script>')
    print("Floating button and config script added")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html fully updated")
