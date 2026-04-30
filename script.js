// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("mobile");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("mobile", "active");
  });
});



// ─── EMAILJS CONFIGURATION ───
// To receive form submissions via email, follow these steps:
// 1. Sign up at https://www.emailjs.com/ (free tier available)
// 2. Add an email service (e.g., Gmail, Outlook) from the dashboard
// 3. Create an email template with the following variables:
//    - ${from_name}      → Sender's name
//    - ${from_email}     → Sender's email
//    - ${from_phone}     → Sender's phone (optional)
//    - ${teacher}        → Selected teacher
//    - ${message}        → Message content
//    - ${to_email}       → Your inbox (edu.motionphysics@gmail.com)
//    - ${reply_to}       → Reply-to address (sender's email)
// 4. Copy your User ID (Public Key), Service ID, and Template ID
// 5. Replace the placeholder values below with your actual credentials
const EMAILJS_USER_ID = "Sjo5sp_PIP2hrxR7j";
const EMAILJS_SERVICE_ID = "service_fahim";
const EMAILJS_TEMPLATE_ID = "template_dih5ulg";

// Initialize EmailJS with your user ID
emailjs.init(EMAILJS_USER_ID);

function handleSubmit() {
  const fnameInput = document.getElementById("fname");
  const fphoneInput = document.getElementById("fphone");
  const femailInput = document.getElementById("femail");
  const fteacherSelect = document.getElementById("fteacher");
  const fmessageInput = document.getElementById("fmessage");
  const successMsg = document.getElementById("successMsg");

  const name = fnameInput.value.trim();
  const phone = fphoneInput.value.trim();
  const email = femailInput.value.trim();
  const teacher = fteacherSelect.value;
  const message = fmessageInput.value.trim();

  if (!name || !email || !teacher || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // EmailJS template parameters
  const emailParams = {
    from_name: name,
    from_email: email,
    from_phone: phone || "Not provided",
    teacher: teacher,
    message: message,
    to_email: "edu.motionphysics@gmail.com",
    reply_to: email
  };

  // Show loading state
  const submitBtn = document.querySelector(".btn-submit");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email via EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
    .then((response) => {
      console.log('Email sent successfully:', response);

      // Show success message
      successMsg.style.display = "block";

      // Clear form
      fnameInput.value = "";
      fphoneInput.value = "";
      femailInput.value = "";
      fteacherSelect.value = "";
      fmessageInput.value = "";

      // Reset button
      setTimeout(() => {
        successMsg.style.display = "none";
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 5000);

    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      alert("Failed to send message. Please try again or contact us directly.");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// ─── OUR SUCCESS CAROUSEL ───
// ════════════════════════════════════════════════════════════════════════
//  ছবি যোগ / পরিবর্তন করতে নিচের SUCCESS_PHOTOS array edit করুন।
//
//  প্রতিটি entry-তে তিনটি জিনিস:
//    src     → ছবির URL। সহজ উপায়গুলো:
//               ১. ImgBB (https://imgbb.com) — ফ্রিতে upload করুন,
//                  "Direct link" কপি করুন, সেটি এখানে বসান।
//               ২. নিজের images/ ফোল্ডার → "./images/photo1.jpg"
//               ৩. Google Photos → Share → "Anyone with link" → link
//    caption → ছবির নিচে যে টেক্সট দেখাবে
//    label   → ছবির উপরে ছোট রঙিন badge (যেমন "Result", "Event")
//
//  নতুন ছবি যোগ: নিচে {} দিয়ে নতুন object যোগ করুন।
//  ছবি সরাতে: সেই object টি delete করুন।
// ════════════════════════════════════════════════════════════════════════
const SUCCESS_PHOTOS = [
  {
    src: "https://placehold.co/800x600/0d1422/00d4ff?text=Add+Your+Photo",
    caption: "আপনার প্রথম ছবির ক্যাপশন এখানে লিখুন।",
    label: "Result"
  },
  {
    src: "https://placehold.co/800x600/111929/ff6b2b?text=Add+Your+Photo",
    caption: "দ্বিতীয় ছবির ক্যাপশন — যেমন: 'SSC 2024 Batch Farewell'",
    label: "Event"
  },
  {
    src: "https://placehold.co/800x600/0d1422/f5c842?text=Add+Your+Photo",
    caption: "তৃতীয় ছবির ক্যাপশন — যেমন: 'Mock Test Top Performers'",
    label: "Achievement"
  },
  {
    src: "https://placehold.co/800x600/111929/00d4ff?text=Add+Your+Photo",
    caption: "চতুর্থ ছবির ক্যাপশন — যেমন: 'Annual Prize Giving Ceremony'",
    label: "Ceremony"
  },
  {
    src: "https://placehold.co/800x600/0d1422/ff6b2b?text=Add+Your+Photo",
    caption: "পঞ্চম ছবির ক্যাপশন — যেমন: 'Special Physics Lab Session'",
    label: "Session"
  },
  {
    src: "https://placehold.co/800x600/111929/f5c842?text=Add+Your+Photo",
    caption: "ষষ্ঠ ছবির ক্যাপশন — যেমন: 'JSC Batch 2024 Success Story'",
    label: "Success"
  }
];

// ── Carousel কতটি slide একসাথে দেখাবে সেটি screen size অনুযায়ী নির্ধারণ ──
function getSlidesPerView() {
  if (window.innerWidth <= 560) return 1;   // Mobile: ১টি
  if (window.innerWidth <= 900) return 2;   // Tablet: ২টি
  return 3;                                  // Desktop: ৩টি
}

// ── Carousel build করা ──
function buildCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  if (!track || !dotsContainer) return;

  // Slides তৈরি
  track.innerHTML = SUCCESS_PHOTOS.map((photo, i) => `
    <div class="carousel-slide" data-index="${i}">
      <div class="slide-img-wrap">
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
        <span class="slide-label">${photo.label}</span>
      </div>
      <div class="slide-caption">
        <p>${photo.caption}</p>
      </div>
    </div>
  `).join("");

  // Dots তৈরি — total groups of slides
  const slidesPerView = getSlidesPerView();
  const totalGroups = Math.ceil(SUCCESS_PHOTOS.length / slidesPerView);
  dotsContainer.innerHTML = Array.from({ length: totalGroups }, (_, i) =>
    `<span class="carousel-dot ${i === 0 ? "active" : ""}" data-dot="${i}"></span>`
  ).join("");

  // Dot click listener
  dotsContainer.querySelectorAll(".carousel-dot").forEach(dot => {
    dot.addEventListener("click", () => goToGroup(parseInt(dot.dataset.dot)));
  });
}

let currentGroup = 0;

function goToGroup(groupIndex) {
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  const slidesPerView = getSlidesPerView();
  const totalGroups = Math.ceil(SUCCESS_PHOTOS.length / slidesPerView);

  // Clamp index
  currentGroup = Math.max(0, Math.min(groupIndex, totalGroups - 1));

  // Slide width + gap হিসাব করে translate
  const slideEl = track.querySelector(".carousel-slide");
  if (!slideEl) return;
  const gap = 24; // 1.5rem = 24px (CSS এর gap এর সাথে মেলাতে হবে)
  const slideWidth = slideEl.offsetWidth + gap;
  track.style.transform = `translateX(-${currentGroup * slidesPerView * slideWidth}px)`;

  // Dots update
  dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentGroup);
  });

  // Buttons disabled state
  document.getElementById("carouselPrev").disabled = currentGroup === 0;
  document.getElementById("carouselNext").disabled = currentGroup >= totalGroups - 1;
}

// Arrow button listeners
document.getElementById("carouselPrev").addEventListener("click", () => {
  goToGroup(currentGroup - 1);
});
document.getElementById("carouselNext").addEventListener("click", () => {
  goToGroup(currentGroup + 1);
});

// Touch/swipe support for mobile
(function setupSwipe() {
  const container = document.querySelector(".carousel-track-container");
  if (!container) return;
  let startX = 0;
  container.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  container.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToGroup(currentGroup + 1) : goToGroup(currentGroup - 1);
    }
  }, { passive: true });
})();

// Window resize হলে carousel rebuild করুন
window.addEventListener("resize", () => {
  buildCarousel();
  currentGroup = 0;
  goToGroup(0);
});

// Auto-play: প্রতি ৪ সেকেন্ডে automatically পরের slide এ যাবে
// বন্ধ করতে চাইলে নিচের সম্পূর্ণ setInterval block টি delete করুন
let autoPlayInterval = setInterval(() => {
  const slidesPerView = getSlidesPerView();
  const totalGroups = Math.ceil(SUCCESS_PHOTOS.length / slidesPerView);
  goToGroup(currentGroup >= totalGroups - 1 ? 0 : currentGroup + 1);
}, 4000);

// Mouse hover এ auto-play থামবে, চলে গেলে resume হবে
const carouselWrapper = document.querySelector(".carousel-wrapper");
if (carouselWrapper) {
  carouselWrapper.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
  carouselWrapper.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(() => {
      const slidesPerView = getSlidesPerView();
      const totalGroups = Math.ceil(SUCCESS_PHOTOS.length / slidesPerView);
      goToGroup(currentGroup >= totalGroups - 1 ? 0 : currentGroup + 1);
    }, 4000);
  });
}

// Carousel initialize
buildCarousel();
goToGroup(0);


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

   document
     .querySelectorAll(
       ".teacher-card, .about-box, .contact-form, .address-card, .carousel-slide",
     )
     .forEach((el) => {
       el.style.opacity = "0";
       el.style.transform = "translateY(30px)";
       el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
       observer.observe(el);
     });



// ─── NOTICE SECTION LOGIC ───
// Configuration - REPLACE WITH YOUR GOOGLE SHEET ID
// Your Google Sheet must be published to web as JSON:
// File > Share > Publish to web > Select sheet > Publish > Copy the sheet ID from the URL
const GOOGLE_SHEET_ID = "2PACX-1vTbg51YmInCvEwaelfo6qep8tmDZDy159YQKZy3yj6YkFmihTyB1WrtUckJ9uWvLoFOiMQvrwvQnZnC"; // REPLACE THIS!
const SHEET_NAME = "Notices"; // Optional: name of the tab/sheet

// Fetch notices from Google Sheets via opensheet or direct JSON API
// Using opensheet API: https://opensheet.elk.sh/{sheetId}/Notices
// Format: column headers must match: title | message | startDate | endDate
async function fetchNotices() {
  const url = `https://opensheet.elk.sh/1-0K6TNc4TEmjkq1zhpmRgntbxRHUIUFKTrOeIzIyeKw/1`;
  try {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch notices:', error);
    // Also try fallback JSON format from Google Sheets
    try {
      return await fetchNoticesJSONFallback();
    } catch (fallbackError) {
      console.error('Fallback fetch also failed:', fallbackError);
      // Ultimate fallback: use sample notice data
      return getSampleNotices();
    }
  }
}

// Fallback: Google Sheets JSON API (requires published sheet to web)
// Publish your sheet: File > Share > Publish to web > CSV format
// You can parse CSV or use JSON endpoint:
// https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:json
async function fetchNoticesJSONFallback() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTbg51YmInCvEwaelfo6qep8tmDZDy159YQKZy3yj6YkFmihTyB1WrtUckJ9uWvLoFOiMQvrwvQnZnC/pub?output=csv`;
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Fallback HTTP ${response.status}`);
    const text = await response.text();
    // Parse the JSONP-like response
    const jsonStr = text.replace(/^[^(]*\(|\);?$/g, '');
    const obj = JSON.parse(jsonStr);
    
    // Extract table data
    const table = obj.table;
    const cols = table.cols.map(c => c.label);
    const rows = table.rows.map(r => {
      const row = {};
      cols.forEach((col, idx) => {
        row[col] = r.c[idx] ? r.c[idx].v : '';
      });
      return row;
    });
    return rows;
  } catch (error) {
    console.error('Fallback fetch also failed:', error);
    return [];
  }
}

// Sample notice data for when Google Sheets API fails
function getSampleNotices() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return [
    {
      title: "Welcome to Motion Physics",
      message: "This is a sample notice. Your Google Sheets integration is not working yet. Please check your sheet ID and ensure the sheet is published to the web.\n\nTo set up notices:\n1. Create a Google Sheet with columns: title, message, startDate, endDate\n2. Publish the sheet to web (File > Share > Publish to web)\n3. Copy the sheet ID from the URL and update GOOGLE_SHEET_ID in the code",
      startDate: today.toISOString().split('T')[0],
      endDate: nextWeek.toISOString().split('T')[0]
    },
    {
      title: "Physics Lab Schedule",
      message: "Physics lab sessions are held every Tuesday and Thursday from 2-4 PM in Room 101. Please arrive on time and bring your lab notebook.",
      startDate: today.toISOString().split('T')[0],
      endDate: nextWeek.toISOString().split('T')[0]
    }
  ];
}

// Check if a notice is active (today is between startDate and endDate)
function isNoticeActive(notice) {
  if (!notice.startDate || !notice.endDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(notice.startDate);
  const end = new Date(notice.endDate);
  end.setHours(23, 59, 59, 999);
  return today >= start && today <= end;
}

// Check if notice is "NEW" (created within last 7 days based on startDate)
function isNoticeNew(notice) {
  if (!notice.startDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(notice.startDate);
  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 7;
}

// Format date to YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to check and apply scrolling animation
function checkTextOverflow() {
  const titleElement = document.getElementById('notice-title');
  if (titleElement) {
    // Remove existing class first
    titleElement.classList.remove('scrolling');
    // Force reflow to get accurate measurements
    titleElement.offsetHeight;
    // Check if text overflows
    if (titleElement.scrollWidth > titleElement.clientWidth + 10) { // +10 for some tolerance
      titleElement.classList.add('scrolling');
    }
  }
}

// Main render function
async function renderNotice() {
  const section = document.getElementById('notice-section');
  if (!section) return;

  const notices = await fetchNotices();

  // Filter active notices only
  const activeNotices = notices.filter(isNoticeActive);

  // Hide section if no active notices
  if (!activeNotices || activeNotices.length === 0) {
    section.style.display = 'none';
    return;
  }

  // Prioritize NEW notices first, then by startDate (newest first)
  activeNotices.sort((a, b) => {
    const aIsNew = isNoticeNew(a);
    const bIsNew = isNoticeNew(b);

    // If one is new and the other isn't, prioritize the new one
    if (aIsNew && !bIsNew) return -1;
    if (!aIsNew && bIsNew) return 1;

    // If both are new or both are not new, sort by startDate (newest first)
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });

  const latestNotice = activeNotices[0];

  // Populate notice content
  document.getElementById('notice-title').textContent = latestNotice.title || 'Important Notice';
  document.getElementById('notice-message').textContent = latestNotice.message || '';

  // Check for text overflow and add scrolling animation
  setTimeout(checkTextOverflow, 100);

  // NEW badge logic
  const badge = document.getElementById('notice-badge');
  if (isNoticeNew(latestNotice)) {
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }

  // Show section
  section.style.display = 'block';
}

// Close notice handler
const closeBtn = document.getElementById('notice-close');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const section = document.getElementById('notice-section');
    if (section) {
      section.style.display = 'none';
      // Store in localStorage so it stays closed across browser sessions
      localStorage.setItem('noticeClosed', 'true');
    }
  });

  // Add touch support for mobile
  closeBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    closeBtn.click();
  });
}

// Initialize
// Don't show if user already closed it permanently
if (localStorage.getItem('noticeClosed') !== 'true') {
  renderNotice();
}

// Also re-run render if needed after page interactions
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && localStorage.getItem('noticeClosed') !== 'true') {
    renderNotice();
  }
});

// Handle window resize to recheck text overflow
window.addEventListener('resize', () => {
  setTimeout(checkTextOverflow, 100);
});

// ─── MODAL FUNCTIONALITY ───
const noticesModal = document.getElementById('notices-modal');
const noticesLink = document.getElementById('notices-link');
const modalClose = document.getElementById('modal-close');

// Open modal
noticesLink.addEventListener('click', (e) => {
  e.preventDefault();
  openNoticesModal();
});

// Close modal
modalClose.addEventListener('click', closeNoticesModal);

// Close on overlay click
noticesModal.addEventListener('click', (e) => {
  if (e.target === noticesModal) {
    closeNoticesModal();
  }
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && noticesModal.style.display !== 'none') {
    closeNoticesModal();
  }
});

// Prevent body scroll when modal is open
function openNoticesModal() {
  noticesModal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  loadAllNotices();

  // Focus management for accessibility
  modalClose.focus();
}

function closeNoticesModal() {
  noticesModal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling

  // Return focus to trigger element
  noticesLink.focus();
}

async function loadAllNotices() {
  const noticesList = document.getElementById('notices-list');
  noticesList.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--muted);">Loading notices...</div>';

  try {
    const notices = await fetchNotices();

    if (!notices || notices.length === 0) {
      noticesList.innerHTML = '<div class="no-notices">No notices available at the moment.</div>';
      return;
    }

    // Prioritize NEW notices first, then by startDate (newest first)
    notices.sort((a, b) => {
      const aIsNew = isNoticeNew(a);
      const bIsNew = isNoticeNew(b);

      // If one is new and the other isn't, prioritize the new one
      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;

      // If both are new or both are not new, sort by startDate (newest first)
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);
      return dateB - dateA;
    });

    let html = '';
    notices.forEach(notice => {
      const title = notice.title || 'Notice';
      const message = notice.message || '';
      const startDate = formatDate(notice.startDate);
      const endDate = formatDate(notice.endDate);
      const isActive = isNoticeActive(notice);
      const isNew = isNoticeNew(notice);

      html += `
        <div class="notice-modal-card ${!isActive ? 'inactive' : ''}">
          <div class="notice-modal-header">
            ${isNew ? '<span class="notice-modal-badge">NEW</span>' : ''}
            <div class="notice-modal-title">${title}</div>
            <div class="notice-modal-date">${startDate} ${endDate ? ' - ' + endDate : ''}</div>
          </div>
          <div class="notice-modal-message">${message.replace(/\n/g, '<br>')}</div>
        </div>
      `;
    });

    noticesList.innerHTML = html;
  } catch (error) {
    console.error('Failed to load notices:', error);
    noticesList.innerHTML = '<div class="no-notices">Failed to load notices. Please try again later.</div>';
  }
}