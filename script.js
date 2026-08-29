// =========================================
// 1. THEME TOGGLE LOGIC
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check local storage for user's preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// =========================================
// 2. VIEW NAVIGATION & SELECTION (HOME -> MTU)
// =========================================
const viewHome = document.getElementById('view-home');
const viewMtu = document.getElementById('view-mtu');
const mtuCardBtn = document.getElementById('mtu-card-btn');
const backToHomeBtn = document.getElementById('back-to-home');

// Switch to MTU Dashboard
mtuCardBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    viewHome.classList.remove('active-view');
    viewHome.classList.add('hidden-view');
    
    viewMtu.classList.remove('hidden-view');
    viewMtu.classList.add('active-view');
});

// Switch back to Home
backToHomeBtn.addEventListener('click', () => {
    viewMtu.classList.remove('active-view');
    viewMtu.classList.add('hidden-view');
    
    viewHome.classList.remove('hidden-view');
    viewHome.classList.add('active-view');
});

// =========================================
// 3. MTU DASHBOARD SELECTION LOGIC
// =========================================
const allDeptBtns = document.querySelectorAll('.department-grid .glass-btn');
const allSemBtns = document.querySelectorAll('.semester-grid .glass-btn');
const continueBtn = document.getElementById('continue-docs');

let selectedDept = null;
let selectedSem = null;

// Disabled by default
continueBtn.disabled = true;

function checkSelections() {
    if (selectedDept === "Electrical" && selectedSem === "3rd Sem") {
        continueBtn.disabled = false;
    } else {
        continueBtn.disabled = true;
    }
}

// Handle Department Selection with Toggle
allDeptBtns.forEach(btn => {
    if (!btn.classList.contains('locked-btn')) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                selectedDept = null;
            } else {
                allDeptBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedDept = btn.textContent.trim();
            }
            checkSelections();
        });
    }
});

// Handle Semester Selection with Toggle
allSemBtns.forEach(btn => {
    if (!btn.classList.contains('locked-btn')) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                selectedSem = null;
            } else {
                allSemBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSem = btn.textContent.trim();
            }
            checkSelections();
        });
    }
});

// =========================================
// 4. DOCUMENT CART LOGIC & ACCORDIONS (MTU -> DOCUMENTS)
// =========================================
const viewDocuments = document.getElementById('view-documents');
const backToMtuBtn = document.getElementById('back-to-mtu');
const dynamicSubtitle = document.getElementById('dynamic-subtitle');
const proceedCheckoutBtn = document.getElementById('proceed-checkout');
const allDocCheckboxes = document.querySelectorAll('.doc-item input[type="checkbox"]');

// Transition: MTU Dashboard -> Documents
continueBtn.addEventListener('click', () => {
    if (!continueBtn.disabled) {
        viewMtu.classList.remove('active-view');
        viewMtu.classList.add('hidden-view');
        
        viewDocuments.classList.remove('hidden-view');
        viewDocuments.classList.add('active-view');

        // Update the subtitle dynamically based on their Step 1 choices
        dynamicSubtitle.textContent = `${selectedDept} | ${selectedSem}`;
    }
});

// Transition: Documents -> MTU Dashboard
backToMtuBtn.addEventListener('click', () => {
    viewDocuments.classList.remove('active-view');
    viewDocuments.classList.add('hidden-view');
    
    viewMtu.classList.remove('hidden-view');
    viewMtu.classList.add('active-view');
});

// Accordion Slide Logic
const accordionBtns = document.querySelectorAll('.acc-main-btn, .acc-sub-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('open');
        
        const wrapper = this.nextElementSibling;
        if (wrapper && wrapper.classList.contains('acc-wrapper')) {
            wrapper.classList.toggle('open');
        }
    });
});

// Real-time Cart Counter (Handles all nested checks)
allDocCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedCount = document.querySelectorAll('.doc-item input[type="checkbox"]:checked').length;
        
        if (selectedCount > 0) {
            proceedCheckoutBtn.disabled = false;
            proceedCheckoutBtn.textContent = `Proceed to Checkout (${selectedCount})`;
        } else {
            proceedCheckoutBtn.disabled = true;
            proceedCheckoutBtn.textContent = `Proceed to Checkout (0)`;
        }
    });
});

// =========================================
// 5. HYPRLAND TIMETABLE LOGIC
// =========================================
const timetableModal = document.getElementById('timetable-modal');
const btnTimetable = document.getElementById('btn-timetable');
const closeTimetable = document.getElementById('close-timetable');
const hyprTabs = document.querySelectorAll('.hypr-tab');
const timetableOutput = document.getElementById('timetable-output');

const scheduleData = {
    1: [ // Monday
        { time: "9:00 AM - 10:00 AM", subject: "Foundation of Physics", room: "Rm 301" },
        { time: "10:00 AM - 11:00 AM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "11:00 AM - 12:00 PM", subject: "Linear Alg / ODEMC", room: "Rm 204/307" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Prof Laws, Ethics & Values", room: "Rm 101" },
        { time: "3:00 PM - 5:00 PM", subject: "Numerical Methods Lab", room: "EE Comp Lab" }
    ],
    2: [ // Tuesday
        { time: "9:00 AM - 10:00 AM", subject: "Linear Algebra", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Foundation of Physics", room: "Rm 301" },
        { time: "11:00 AM - 12:00 PM", subject: "Innovation & Creativity", room: "Rm 101" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 4:00 PM", subject: "Solid State Devices Lab", room: "EE Conf Hall" },
        { time: "4:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ],
    3: [ // Wednesday
        { time: "9:00 AM - 10:00 AM", subject: "Linear Algebra", room: "Rm 204" },
        { time: "10:00 AM - 12:00 PM", subject: "Measurements & Comm Lab", room: "Measurement Lab" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Numerical Methods Lab (T)", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Smart Materials", room: "Rm 307" },
        { time: "3:00 PM - 4:00 PM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "4:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ],
    4: [ // Thursday
        { time: "9:00 AM - 10:00 AM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "11:00 AM - 12:00 PM", subject: "Linear Algebra", room: "Rm 204" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Found. Physics / ODEMC", room: "Rm 301/307" },
        { time: "2:00 PM - 3:00 PM", subject: "Numerical Methods (L)", room: "Rm 307" },
        { time: "3:00 PM - 5:00 PM", subject: "Circuit Simulation Lab", room: "EE Comp Lab" }
    ],
    5: [ // Friday
        { time: "9:00 AM - 10:00 AM", subject: "Smart Materials", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Linear Alg / ODEMC", room: "Rm 204/307" },
        { time: "11:00 AM - 12:00 PM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "3:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ]
};
const dayNames = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };

function renderTree(dayInt) {
    const classes = scheduleData[dayInt];
    let output = `.\n└── ${dayNames[dayInt]}\n`;
    
    classes.forEach((c, index) => {
        const isLast = index === classes.length - 1;
        const branch = isLast ? "    └──" : "    ├──";
        const subBranch = isLast ? "        └──" : "    │   └──";
        
        output += `${branch} [${c.time}]\n`;
        if (c.subject === "RECESS") {
            output += `${subBranch} RECESS\n`;
        } else {
            output += `${subBranch} ${c.subject} (${c.room})\n`;
        }
    });
    
    timetableOutput.textContent = output;
}

if (btnTimetable) {
    btnTimetable.addEventListener('click', () => {
        timetableModal.classList.add('active'); // No more hidden-view!
        
        let currentDay = new Date().getDay();
        if (currentDay === 0 || currentDay === 6) currentDay = 1;
        
        hyprTabs.forEach(tab => {
            tab.classList.remove('active');
            if (parseInt(tab.dataset.day) === currentDay) tab.classList.add('active');
        });
        renderTree(currentDay);
    });
}

closeTimetable.addEventListener('click', () => timetableModal.classList.remove('active'));
timetableModal.addEventListener('click', (e) => {
    if (e.target === timetableModal) timetableModal.classList.remove('active');
});

hyprTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        hyprTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderTree(parseInt(e.target.dataset.day));
    });
});

// =========================================
// 6. DEADLINES LOGIC (Google Sheets Integration)
// =========================================
const deadlineModal = document.getElementById('deadline-modal');
const btnDeadline = document.getElementById('btn-deadline'); // Fixed selector
const closeDeadline = document.getElementById('close-deadline');
const deadlineOutput = document.getElementById('deadline-output');

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPPZ3OGBai93O4ILNEf-ic2QLy68v-2zmHaFqbrze15ugPfO2iiDRMphphyvarNDKlHovBV6qZflp-/pubhtml"

async function fetchAndRenderDeadlines() {
    deadlineOutput.textContent = "[~] ESTABLISHING SECURE CONNECTION...\n[~] FETCHING URGENT TASKS FROM MAINFRAME...\n";
    
    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.split('\t'));
        rows.shift(); 
        
        let output = `\n[!] FETCH COMPLETE.\n\n`;
        let hasTasks = false;

        rows.forEach(row => {
            if (row.length >= 3 && row[0].trim() !== "") {
                hasTasks = true;
                output += `[*] [${row[0].trim()}]\n`;
                output += `    ├── Subject: ${row[1].trim()}\n`;
                output += `    └── Task:    ${row[2].trim()}\n\n`;
            }
        });

        if (!hasTasks) output += `    No pending deadlines. System idle.\n`;
        deadlineOutput.textContent = output;
        
    } catch (error) {
        deadlineOutput.textContent = `\n[ERR] CONNECTION FAILED.\nCheck network or verify the Sheet URL.\n`;
        console.error(error);
    }
}

if (btnDeadline) {
    btnDeadline.addEventListener('click', () => {
        deadlineModal.classList.add('active'); // No more hidden-view!
        fetchAndRenderDeadlines();
    });
}

closeDeadline.addEventListener('click', () => deadlineModal.classList.remove('active'));
deadlineModal.addEventListener('click', (e) => {
    if (e.target === deadlineModal) deadlineModal.classList.remove('active');
});

// =========================================
// 7. LIVE DOCUMENT & SUBJECT SEARCH
// =========================================
const searchInput = document.getElementById('doc-search-input');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Grab all sub-accordion groups (individual subjects like "Circuit Simulation Lab")
    const subAccGroups = document.querySelectorAll('.sub-acc-group');
    
    subAccGroups.forEach(group => {
        const subBtn = group.querySelector('.acc-sub-btn');
        const subjectText = subBtn.textContent.toLowerCase();
        const wrapper = group.querySelector('.acc-wrapper');
        
        if (subjectText.includes(query)) {
            // Show the subject group
            group.style.display = 'block';
            
            // If the user typed something, auto-open the dropdown to reveal options
            if (query.length > 0) {
                subBtn.classList.add('open');
                if (wrapper) wrapper.classList.add('open');
            } else {
                // Collapse back if search is cleared
                subBtn.classList.remove('open');
                if (wrapper) wrapper.classList.remove('open');
            }
        } else {
            // Hide non-matching subjects
            group.style.display = 'none';
        }
    });

    // Also handle main category wrappers (Laboratory / Theory headers)
    const mainAccordionGroups = document.querySelectorAll('.accordion-group');
    mainAccordionGroups.forEach(mainGroup => {
        const visibleSubGroups = mainGroup.querySelectorAll('.sub-acc-group[style*="display: block"], .sub-acc-group:not([style*="display: none"])');
        const mainBtn = mainGroup.querySelector('.acc-main-btn');
        const mainWrapper = mainGroup.querySelector('.acc-wrapper');

        if (query.length > 0) {
            if (visibleSubGroups.length > 0) {
                mainGroup.style.display = 'block';
                mainBtn.classList.add('open');
                if (mainWrapper) mainWrapper.classList.add('open');
            } else {
                mainGroup.style.display = 'none';
            }
        } else {
            // Reset when search is empty
            mainGroup.style.display = 'block';
            mainBtn.classList.remove('open');
            if (mainWrapper) mainWrapper.classList.remove('open');
        }
    });
});

// =========================================
// 8. CUSTOM PRINT REQUEST LOGIC
// =========================================
const customText = document.getElementById('custom-instructions');
const customFile = document.getElementById('custom-file-upload');

// Function to check if ANY document is selected OR if a custom request exists
function updateCheckoutState() {
    const checkedCount = document.querySelectorAll('.doc-item input[type="checkbox"]:checked').length;
    const hasCustomText = customText.value.trim().length > 0;
    const hasCustomFile = customFile.files.length > 0;

    if (checkedCount > 0 || hasCustomText || hasCustomFile) {
        proceedCheckoutBtn.disabled = false;
        proceedCheckoutBtn.textContent = `Proceed to Checkout (${checkedCount + (hasCustomText || hasCustomFile ? 1 : 0)})`;
    } else {
        proceedCheckoutBtn.disabled = true;
        proceedCheckoutBtn.textContent = `Proceed to Checkout (0)`;
    }
}

// Add listeners to custom inputs and document checkboxes globally
customText.addEventListener('input', updateCheckoutState);
customFile.addEventListener('change', updateCheckoutState);
document.addEventListener('change', (e) => {
    if (e.target.matches('.doc-item input[type="checkbox"]')) {
        updateCheckoutState();
    }
});


// =========================================
// 9. CHECKOUT TRANSITIONS & SUMMARY
// =========================================
proceedCheckoutBtn.addEventListener('click', () => {
    if (!proceedCheckoutBtn.disabled) {
        document.getElementById('view-documents').classList.remove('active-view');
        document.getElementById('view-documents').classList.add('hidden-view');
        
        viewCheckout.classList.remove('hidden-view');
        viewCheckout.classList.add('active-view');

        buildOrderSummary();
        checkLockout();
    }
});

backToDocsBtn.addEventListener('click', () => {
    viewCheckout.classList.remove('active-view');
    viewCheckout.classList.add('hidden-view');
    
    document.getElementById('view-documents').classList.remove('hidden-view');
    document.getElementById('view-documents').classList.add('active-view');
    
    checkoutForm.reset();
    authMessage.textContent = "";
});

// Dynamically generate the order summary
function buildOrderSummary() {
    orderSummaryList.innerHTML = '';
    const checkedBoxes = document.querySelectorAll('.doc-item input[type="checkbox"]:checked');
    
    checkedBoxes.forEach(box => {
        const docItemParent = box.closest('.doc-item');
        let docName = docItemParent.querySelector('.doc-name').textContent.trim();
        
        const complexParent = box.closest('.complex-doc-item');
        if (complexParent) {
            const selectVal = complexParent.querySelector('select').value;
            docName += ` - ${selectVal}`;
        }

        let subjectName = "General";
        const subAccGroup = box.closest('.sub-acc-group');
        if (subAccGroup) {
            subjectName = subAccGroup.querySelector('.acc-sub-btn').textContent.replace('▼', '').trim();
        }

        const summaryCard = document.createElement('div');
        summaryCard.className = 'glass-card-small';
        summaryCard.style.cursor = 'default';
        summaryCard.innerHTML = `
            <span class="doc-icon">✓</span>
            <div class="summary-item-text">
                <span class="summary-subject">${subjectName}</span>
                <span class="doc-name" style="font-size: 0.95rem;">${docName}</span>
            </div>
        `;
        orderSummaryList.appendChild(summaryCard);
    });

    // Visually add the custom request to the summary page if it exists
    if (customText.value.trim().length > 0 || customFile.files.length > 0) {
        const customSummaryCard = document.createElement('div');
        customSummaryCard.className = 'glass-card-small';
        customSummaryCard.style.cursor = 'default';
        customSummaryCard.innerHTML = `
            <span class="doc-icon">✨</span>
            <div class="summary-item-text">
                <span class="summary-subject">Custom Print Job</span>
                <span class="doc-name" style="font-size: 0.95rem;">Specific instructions or files attached</span>
            </div>
        `;
        orderSummaryList.appendChild(customSummaryCard);
    }
}

// =========================================
// 10. SECURE FORM SUBMISSION (Web3Forms)
// =========================================
const STUDENT_DB_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSkaJyPRiuO5JBklhppbSfnNhnxCvLoWXf2boqJd8X-DqEhhfLqj9m7HHYENCkEl8oaXderROsTa_gt/pub?output=tsv";

let failedAttempts = parseInt(sessionStorage.getItem('failed_auth_attempts') || '0');
let lockoutTimer = parseInt(sessionStorage.getItem('auth_lockout_time') || '0');

function checkLockout() {
    const now = Date.now();
    if (lockoutTimer > now) {
        const remainingSecs = Math.ceil((lockoutTimer - now) / 1000);
        placeOrderBtn.disabled = true;
        authMessage.className = "auth-msg error";
        authMessage.textContent = `Too many failed attempts. Locked out for ${remainingSecs}s.`;
        return true;
    } else if (failedAttempts >= 3) {
        failedAttempts = 0;
        sessionStorage.setItem('failed_auth_attempts', '0');
        placeOrderBtn.disabled = false;
    }
    return false;
}

checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (checkLockout()) return;

    const nameInput = document.getElementById('student-name').value.trim();
    const regInput = document.getElementById('student-reg').value.trim();
    const phoneInput = document.getElementById('student-phone').value.trim();
    const emailInput = document.getElementById('student-email').value.trim();

    authMessage.className = "auth-msg";
    authMessage.textContent = "Verifying with student mainframe...";
    placeOrderBtn.disabled = true;

    try {
        const response = await fetch(STUDENT_DB_URL);
        if (!response.ok) throw new Error("Database connection failed");
        const tsvData = await response.text();
        
        const rows = tsvData.split('\n').map(row => row.split('\t'));
        rows.shift(); 

        let isAuthenticated = false;
        rows.forEach(row => {
            if (row.length >= 2) {
                const sheetReg = row[0].trim();
                const sheetName = row[1].trim();
                
                if (sheetReg === regInput && sheetName.toLowerCase() === nameInput.toLowerCase()) {
                    isAuthenticated = true;
                }
            }
        });

        if (isAuthenticated) {
            failedAttempts = 0;
            sessionStorage.setItem('failed_auth_attempts', '0');

            authMessage.className = "auth-msg success";
            authMessage.textContent = "Authentication Successful! Dispatching order...";

            const orderedItems = [];
            document.querySelectorAll('.doc-item input[type="checkbox"]:checked').forEach(box => {
                let name = box.closest('.doc-item').querySelector('.doc-name').textContent.trim();
                const complex = box.closest('.complex-doc-item');
                if (complex) name += ` (${complex.querySelector('select').value})`;
                orderedItems.push(name);
            });

            // Add Custom Input into the Email Payload
            const customInputText = customText.value.trim();
            const customInputFile = customFile.files.length > 0;
            
            if (customInputText) {
                orderedItems.push(`Custom Request: "${customInputText}"`);
            }
            if (customInputFile) {
                orderedItems.push(`[NOTE: User attached a file. Collect via WhatsApp]`);
            }

            const orderPayload = {
                access_key: "45d64ff3-cd79-4980-bff3-530e142a9760",
                subject: `New Print Order: ${nameInput} (2501EE${regInput})`,
                student_name: nameInput,
                registration_number: `2501EE${regInput}`,
                phone_number: phoneInput,
                mtu_email: emailInput || "Not provided",
                order_items: orderedItems.join(' | ')
            };

            const submitResponse = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            if (submitResponse.ok) {
                setTimeout(() => {
                    viewCheckout.classList.remove('active-view');
                    viewCheckout.classList.add('hidden-view');
                    
                    const viewSuccess = document.getElementById('view-success');
                    viewSuccess.classList.remove('hidden-view');
                    viewSuccess.classList.add('active-view');
                }, 800);
            } else {
                throw new Error("Serverless relay error");
            }

        } else {
            failedAttempts++;
            sessionStorage.setItem('failed_auth_attempts', failedAttempts.toString());

            if (failedAttempts >= 3) {
                const lockoutTime = Date.now() + 60000; 
                sessionStorage.setItem('auth_lockout_time', lockoutTime.toString());
                checkLockout();
            } else {
                placeOrderBtn.disabled = false;
                authMessage.className = "auth-msg error";
                authMessage.textContent = `Authentication Failed (${3 - failedAttempts} attempts remaining).`;
            }
        }

    } catch (err) {
        placeOrderBtn.disabled = false;
        authMessage.className = "auth-msg error";
        authMessage.textContent = "Network error. Check connection and try again.";
        console.error(err);
    }
});