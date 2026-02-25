
/**
 * =================================================================================
 * NEW MODAL SPA: PHASE 2 - STATE & MOCK NAVIGATION
 * =================================================================================
 */

// --- 1. STATE & CONSTANTS ---
let COMPANY_NAME = ""; 
let currentPath = []; // Array to track drill-down e.g., [{code: "ISO 9001", label: "..."}, {code: "8", label: "..."}]
//let nm_NORM_DATA = {};
let nm_CLAUSES_DATA = {};
let markedClauses = {};

// DOM References
const navStackContainer = document.querySelector('.nm-nav-stack');
const optionsAreaContainer = document.querySelector('.nm-options-area');

// --- DATABASE HELPERS ---

/**
 * Asynchronously loads both JSON files simultaneously.
 */
async function loadModalData() {
    try {
        // Fetch both files at the same time for performance
        const [clausesRes] = await Promise.all([
            fetch('nm-clauses.json')
        ]);

        nm_CLAUSES_DATA = await clausesRes.json();
        
        console.log("Modal Data loaded successfully.");
        
        // Once data is ready, render the UI!
        updateModalUI();

    } catch (error) {
        console.error("Error loading modal data. Check file paths and server.", error);
        document.querySelector('.nm-options-area').innerHTML = 
            '<div class="nm-no-options" style="color:red;">Error cargando la base de datos.</div>';
    }
}

/**
 * Dynamically fetches immediate children based on the active item and standard.
 */
/**
 * Dynamically fetches immediate children based on the active item and standard.
 */
function getRealChildren(activeItem) {
    const children = [];

    // 1. Root Level
    if (activeItem.code === 'Company Name') {
        const stdNames = {
            'ISO 9001:2015': 'Sistema de Gestión de la Calidad',
            'ISO 14001:2015': 'Sistema de Gestión Ambiental',
            'ISO 45001:2018': 'Sistema de Gestión de Seguridad y Salud',
            'ISO 22000:2018': 'Sistema de Gestión de Inocuidad Alimentaria',
            'NTF 4073:2022': 'Sistema de Análisis de Peligros y Puntos Críticos de Control (HACCP)',
            'ISO 27001:2022': 'Sistema de Gestión de Seguridad de la Información'
        };
        
        Array.from(appState.Standards).forEach(std => {
            children.push({ code: std, label: stdNames[std] || 'Sistema de Gestión' });
        });
        return children;
    }

    const currentStandard = currentPath[0].code; 
    const stdData = nm_NORM_DATA[currentStandard] || {};

    // 2. Level 1 Clauses (e.g., "4", "5")
    if (activeItem.code === currentStandard) {
        for (let key in stdData) {
            if (!key.includes('.')) {
                let title = nm_CLAUSES_DATA[currentStandard]?.[key]?.title || ``;
                children.push({ code: key, label: title });
            }
        }
    } 
    // 3. Deeper Clauses (e.g., activeItem "4" -> children "4.1")
    else {
        const parentCode = activeItem.code;
        const targetLevel = parentCode.split('.').length + 1;

        for (let key in stdData) {
            if (key.startsWith(parentCode + '.') && key.split('.').length === targetLevel) {
                let title = nm_CLAUSES_DATA[currentStandard]?.[key]?.title || ``;
                children.push({ code: key, label: title });
            }
        }
    }

    return children.sort((a, b) => a.code.localeCompare(b.code, undefined, {numeric: true}));
}

/**
 * Recursive function to inject titles and parse {{keys}}
 */
function getExpandedContent(key, std, visited = new Set(), isRoot = true) {
    if (visited.has(key)) return "";
    visited.add(key);

    const data = nm_CLAUSES_DATA[std]?.[key];
    if (!data) return ""; 

    let content = data.content || "";
    let title = data.title || "";
    let explicit = data.explicit;

    // 1. Resolve children recursively
    content = content.replace(/\{\{([\w.]+)\}\}/g, (match, childKey) => {
        return getExpandedContent(childKey, std, new Set(visited), false);
    });

    // 2. Title and Number Logic
    if (title) {
        if (visited.size === 1) {
            content = `<h2 class="main-clause-title"><label>${key}</label>${title}</h2>` + content;
        } else {
            content = `<div class="injected-title"><label>${key}</label>${title}</div>` + content;
        }
    } else if (explicit) {
        let trimmedContent = content.trim();
        const numberSpan = `<strong class="explicit-number">${key}</strong>`;
        
        // This regex matches the entire opening tag, including attributes (e.g., <div class="...">)
        const tagMatch = trimmedContent.match(/^<([a-zA-Z0-9]+)\b[^>]*>/);

        if (tagMatch) {
            // Inject the number IMMEDIATELY after the opening tag
            content = trimmedContent.replace(tagMatch[0], tagMatch[0] + numberSpan);
        } else {
            // Fallback if it's plain text
            content = numberSpan + content;
        }
    }
    if (isRoot) {
        // This regex ensures we don't match 'debe' inside existing HTML tags/attributes
        content = content.replace(/(?<!<[^>]*)\b(debe)\b(?![^<]*>)/gi, '<span class="debe">$1</span>');
    }
    return content;
}

/**
 * Takes the raw selections for a standard and returns an optimized/collapsed array.
 */
function getCollapsedClauses(std, set = markedClauses[std]) {
    if (!set || set.size === 0) return [];
    
    const state = set;
    const collapsed = [];
    const stdData = nm_NORM_DATA[std] || {};

    state.forEach(code => {
        const parent = stdData[code]?.parent;
        
        if (!parent || !state.has(parent)) {
            collapsed.push(code);
        }
    });

    return collapsed.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
}

/**
 * Helper to check if a clause belongs to the current standard.
 * Crucial for cases where a child (e.g., 4.2.c) belongs to 14001 but not 9001.
 */
function isValidForStd(code, std) {
    return nm_NORM_DATA[std] && nm_NORM_DATA[std][code] !== undefined;
}

/**
 * Because our marking functions now explicitly add all descendants to the set,
 * we no longer need a recursive loop to check ancestors. It's a simple O(1) lookup.
 */
function isClauseMarked(code, std) {
    if (!std || !markedClauses[std]) return false;
    return markedClauses[std].has(code);
}

// --- 2. CORE RENDER FUNCTIONS ---

function renderNavStack() {
    navStackContainer.innerHTML = ""; 

    // 1. Render Fixed Base (Company Name)
    const baseBox = createPill({
        label: COMPANY_NAME,
        isRoot: true,
        isActive: currentPath.length === 0, // Bug fixed!
        buttonState: 'none',
        pillTitle: "Ver Norma(s)",
        onPillClick: () => {
            if (currentPath.length > 0) {
                currentPath = [];
                updateModalUI();
            }
        }
    });
    navStackContainer.appendChild(baseBox);

    // 2. Loop through the current path
    currentPath.forEach((step, index) => {
        const isLast = index === currentPath.length - 1;
        const currentStandard = currentPath.length > 0 ? currentPath[0].code : null;
        const isMarked = isClauseMarked(step.code, currentStandard);
        const showButton = currentStandard !== null && currentStandard !== step.code;
        
        let buttonState = 'none';
        let buttonTitle = '';
        if (showButton) {
            buttonState = isMarked ? 'remove' : 'add';
            buttonTitle = isMarked ? 'Remover Cláusula' : 'Seleccionar Cláusula';
        }

        const stepBox = createPill({
            code: step.code,
            label: step.label,
            isActive: isLast,
            buttonState: buttonState,
            pillTitle: "Ver Cláusula",
            buttonTitle: buttonTitle,
            onPillClick: isLast ? null : () => popStack(index + 1),
            onButtonClick: () => {
                if (isMarked) unmarkClauseAndDescendants(step.code, currentStandard);
                else toggleMark(step.code, currentStandard);
            }
        });

        navStackContainer.appendChild(stepBox);
    });
}

function renderOptionsArea(activeItem) {
    const optionsAreaContainer = document.querySelector('.nm-options-area');
    optionsAreaContainer.innerHTML = ''; 

    const currentStandard = currentPath.length > 0 ? currentPath[0].code : null;
    const lastindex = currentPath.length>1 ? currentPath.length - 1 : 0;
    const realChildren = getRealChildren(activeItem);
    // if (currentPath[lastindex].code) {
        
    // }

    
    if (realChildren.length === 0) {
        optionsAreaContainer.innerHTML = '<div class="nm-no-options">No hay sub-cláusulas.</div>';
        return;
    };

    realChildren.forEach(child => {
        const isMarked = isClauseMarked(child.code, currentStandard);
        const showButton = currentStandard !== null && currentStandard !== child.code;

        let buttonState = 'none';
        let buttonTitle = '';
        if (showButton) {
            buttonState = isMarked ? 'remove' : 'add';
            buttonTitle = isMarked ? 'Remover Cláusula' : 'Seleccionar Cláusula';
        }

        const childBox = createPill({
            code: child.code,
            label: child.label,
            buttonState: buttonState,
            pillTitle: showButton ? "Ver Cláusula" : "Ver Norma",
            buttonTitle: buttonTitle,
            onPillClick: () => drillDown(child),
            onButtonClick: () => {
                if (isMarked) unmarkClauseAndDescendants(child.code, currentStandard);
                else toggleMark(child.code, currentStandard);
            }
        });

        optionsAreaContainer.appendChild(childBox);
    });
}

function renderRightColumn(activeItem) {
    const readingPane = document.querySelector('.nm-reading-pane');

    // If path is empty, we are at the Root level. No text to show yet.
    if (currentPath.length === 0) {
        readingPane.innerHTML = `<div class="nm-pane-placeholder"><p>Seleccione una norma para comenzar.</p></div>`;
        return;
    }

    const currentStandard = currentPath[0].code; // Always index 0

    const contentHtml = getExpandedContent(activeItem.code, currentStandard);

    if (contentHtml) {
        readingPane.innerHTML = contentHtml;
    } else {
        readingPane.innerHTML = `<div class="nm-pane-placeholder"><p>Contenido no disponible para ${activeItem.code}.</p></div>`;
    }
}

function updateRow3() {
    const bucketGrid = document.querySelector('.nm-bucket-grid');
    bucketGrid.innerHTML = ''; 

    for (const std of Object.keys(markedClauses)) {
        const collapsedArr = getCollapsedClauses(std);
        
        if (collapsedArr.length > 0) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'nm-bucket-group';
            
            groupDiv.innerHTML = `
                <div class="nm-bucket-group-title">
                    <span>${std}</span>
                    <span style="color:#888; font-weight:normal;">${collapsedArr.length} seleccionados</span>
                </div>
            `;
            
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'nm-bucket-items';

            collapsedArr.forEach(code => {
                // Generate a bucket pill
                const box = createPill({
                    code: code,
                    isBucket: true, // Applies specific bucket coloring
                    buttonState: 'remove', // Always the 'X' button
                    pillTitle: `Ver Cláusula`,
                    buttonTitle: `Remover Cláusula`,
                    onPillClick: () => jumpToClause(std, code),
                    onButtonClick: () => toggleMark(code, std)
                    //onButtonClick: () => unmarkClauseAndDescendants(code, std)
                });
                
                itemsContainer.appendChild(box);
            });

            groupDiv.appendChild(itemsContainer);
            bucketGrid.appendChild(groupDiv);
        }
    }
}

// --- 3. STATE MUTATIONS ---

/**
 * Pushes a new item to the stack and updates UI
 */
function drillDown(item) {
    currentPath.push(item);
    updateModalUI();
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * Pops the stack back to a specific index.
 * Example: if path is ['ISO', '8', '8.3'] and user clicks 'X' on '8' (index 1), 
 * we slice the array to keep only ['ISO'] (length 1).
 */
function popStack(index) {
    currentPath = currentPath.slice(0, index);
    updateModalUI();
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * Automatically builds the navigation path to jump directly to a selected clause
 */
function jumpToClause(std, code) {
    const newPath = [];
    
    // 1. First item is always the Standard
    newPath.push({ code: std, label: std });

    // 2. Trace and add ancestors from top to bottom
    const stdData = nm_NORM_DATA[std] || {};
    if (stdData[code] && stdData[code].ancestors) {
        // Our ancestors array is bottom-up (parent, grandparent), so we reverse it
        const ancestors = [...stdData[code].ancestors].reverse();
        
        ancestors.forEach(anc => {
            let title = nm_CLAUSES_DATA[std]?.[anc]?.title || `Cláusula ${anc}`;
            newPath.push({ code: anc, label: title });
        });
    }

    // 3. Add the item itself at the end of the path
    let itemTitle = nm_CLAUSES_DATA[std]?.[code]?.title || `Cláusula ${code}`;
    newPath.push({ code: code, label: itemTitle });

    // 4. Set the path and re-render
    currentPath = newPath;
    updateModalUI();
    
    // UX Touch for Mobile: Auto-scroll down to the reading pane
    if (window.innerWidth <= 768) {
        document.querySelector('.nm-right-col').scrollIntoView({ behavior: 'smooth' });
    }
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * Master toggle switch. Routes to explicit mark or unmark logic.
 */
function toggleMark(clauseCode, std) {
    if (!markedClauses[std]) markedClauses[std] = new Set();

    if (isClauseMarked(clauseCode, std)) {
        unmarkClauseAndDescendants(clauseCode, std);
    } else {
        markClauseAndAscendants(clauseCode, std);
    }
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * NEW HELPER: Marks the clause, cascades down to all descendants, 
 * and cascades up to automatically mark parents if all children are checked.
 */
function markClauseAndAscendants(clauseCode, std) {
    const stdData = nm_NORM_DATA[std] || {};
    if (!markedClauses[std]) markedClauses[std] = new Set();
    const state = markedClauses[std];

    // 1. Mark the target clause
    state.add(clauseCode);

    // 2. Cascade DOWN: Mark all valid descendants
    const descendants = stdData[clauseCode]?.descendants || [];
    descendants.forEach(desc => {
        if (isValidForStd(desc, std)) {
            state.add(desc);
        }
    });

    // 3. Cascade UP: Check ancestors to see if they should now be collapsed (auto-marked)
    const ancestors = stdData[clauseCode]?.ancestors || [];
    ancestors.forEach(anc => {
        if (isValidForStd(anc, std)) {
            const children = stdData[anc].children || [];
            
            // Check if ALL valid children for this specific standard are marked
            const allChildrenMarked = children
                .filter(child => isValidForStd(child, std))
                .every(child => state.has(child));

            if (allChildrenMarked) {
                state.add(anc);
            }
        }
    });

    updateRow3();
    updateModalUI();
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * Unmarks the clause, cascades down to unmark all descendants, 
 * and cascades up to unmark ancestors (breaking the collapse).
 */
function unmarkClauseAndDescendants(clauseCode, std) {
    const stdData = nm_NORM_DATA[std] || {};
    if (!markedClauses[std]) return;
    const state = markedClauses[std];
    // 1. Unmark the target clause
    state.delete(clauseCode);
    
    // 2. Cascade DOWN: Unmark all descendants
    const descendants = stdData[clauseCode]?.descendants || [];
    descendants.forEach(desc => {
        state.delete(desc);
    });

    // 3. Cascade UP: Unmark all ancestors
    // If a descendant is missing, the ancestor can no longer be fully marked/collapsed.
    const ancestors = stdData[clauseCode]?.ancestors || [];
    ancestors.forEach(anc => {
        state.delete(anc);
    });

    updateRow3();
    updateModalUI();
    if (typeof autoSaveModalState === 'function') autoSaveModalState();
}

/**
 * Factory function to generate a unified Pill component.
 */
/**
 * Factory function to generate a unified Pill component with split-hover zones.
 */
function createPill({ 
    code = '', 
    label = '', 
    isRoot = false, 
    isActive = false, 
    isBucket = false, 
    buttonState = 'none', // 'add', 'remove', or 'none'
    pillTitle = '', 
    buttonTitle = '', 
    onPillClick = null, 
    onButtonClick = null 
}) {
    // 1. Create Wrapper
    const pill = document.createElement('div');
    pill.className = 'nm-pill';
    
    // Apply state modifiers to wrapper
    if (isRoot) pill.classList.add('nm-pill--root');
    if (isActive) pill.classList.add('nm-pill--active');
    if (isBucket) pill.classList.add('nm-pill--bucket');

    // 2. Build the Left Side (.nm-pill-content)
    const pillContent = document.createElement('div');
    pillContent.className = 'nm-pill-content';
    if (buttonState === 'none') pillContent.classList.add('nm-pill-content--full');
    if (pillTitle) {
        if (isActive) {
            pillContent.title = "Visualización actual";
        } else {
            pillContent.title = pillTitle
        }
    };

    let contentHTML = '';
    if (code) contentHTML += `<span class="nm-pill-code">${code}</span>`;
    if (label) contentHTML += `<span class="nm-pill-label">${label}</span>`;
    pillContent.innerHTML = contentHTML;

    // Attach pill click directly to the left side
    if (onPillClick) {
        pillContent.onclick = onPillClick;
    }
    
    pill.appendChild(pillContent);

    // 3. Build the Right Side (.nm-pill-btn)
    if (buttonState !== 'none') {
        const isRemove = buttonState === 'remove';
        const btnClass = isRemove ? 'nm-pill-btn nm-pill-btn--remove' : 'nm-pill-btn';
        const btnIcon = isRemove ? '&times;' : '+';
        
        const btn = document.createElement('button');
        btn.className = btnClass;
        btn.title = buttonTitle;
        btn.innerHTML = btnIcon;

        // Attach button click
        if (onButtonClick) {
            btn.onclick = (e) => {
                e.stopPropagation();
                onButtonClick(e);
            };
        }
        pill.appendChild(btn);
    }

    return pill;
}

/**
 * Master UI updater for the Modal
 */
function updateModalUI() {
    const activeItem = currentPath.length > 0 
            ? currentPath[currentPath.length - 1] 
            : { code: 'Company Name', label: COMPANY_NAME };
    renderNavStack();
    renderOptionsArea(activeItem);
    renderRightColumn(activeItem);
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    loadModalData();
    updateModalUI();
});

// Add this inside your initialization or DOMContentLoaded block
const readingPan = document.querySelector('.nm-reading-pane');
readingPan.addEventListener('contextmenu', (e) => {e.preventDefault();});
readingPan.addEventListener('copy', (e) => {e.preventDefault();});
readingPan.addEventListener('dragstart', (e) => {e.preventDefault();}, false);